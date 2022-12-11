const { input, testInput } = require("./input");

const drawPixel = (currentRow, drawnRows, cycle, signalStrength) => {
  if (Math.abs(signalStrength - ((cycle - 1) % 40)) < 2) {
    currentRow += "#"
  } else {
    currentRow += " "
  }
  if (cycle % 40 === 0) {
    drawnRows.push(currentRow);
    currentRow = "";
  }
  return currentRow;
}

const runCommands = (commands) => {
  let signalStrength = 1;
  let listOfSignalStrengths = [];
  let cycle = 1;
  let drawnRows = [];
  let currentRow = "";

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i].split(" ");
    if (command[0] === "noop") {
      currentRow = drawPixel(currentRow, drawnRows, cycle, signalStrength);
      cycle++;
      if (cycle === 20 || (cycle - 20) % 40 === 0) {
        listOfSignalStrengths.push(signalStrength * cycle);
      }
    } else {
      for (let j = 0; j < 2; j++) {
        currentRow = drawPixel(currentRow, drawnRows, cycle, signalStrength);
        cycle++;
        if (cycle === 20 || (cycle - 20) % 40 === 0) {
          j === 0
            ? listOfSignalStrengths.push(signalStrength * cycle)
            : listOfSignalStrengths.push((signalStrength + +command[1]) * cycle);
        }
      }
      signalStrength += +command[1];
    }
  }
  return [listOfSignalStrengths, drawnRows];
};

const getSignalStrength = (input) => {
  const commands = input.split("\n");

  const [listOfSignalStrengths, drawnImage] = runCommands(commands);
  return [listOfSignalStrengths.reduce((a, b) => a + b, 0), drawnImage];
};

console.log("test input:", getSignalStrength(testInput));
console.log("actual input:", getSignalStrength(input));
