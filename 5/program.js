const { input, testInput } = require("./input");

const parseStacks = (lines) => {
  const numberOfStacks = (lines[0].length + 1) / 4;
  let stacks = Array.from({ length: numberOfStacks }, (e) => []);

  for (let y = 0; y < lines.length; y++) {
    for (let i = 0; i < lines[y].length; i++) {
      if (lines[y][i].toLowerCase() !== lines[y][i].toUpperCase()) {
        const index = (i - 1) / 4;
        stacks[index].push(lines[y][i]);
      }
    }
  }
  return stacks;
};

const parseInstruction = (instructionString) => {
  let [amount, stacks] = instructionString.split(" from ");
  amount = amount.split(" ")[1];
  stacks = stacks.split(" to ");

  return [+amount, +stacks[0] - 1, +stacks[1] - 1];
};

const arrangeStacks = (input) => {
  let [stacksString, moves] = input.split("\n\n");

  let stacks_1 = parseStacks(stacksString.split("\n"));
  let stacks_2 = JSON.parse(JSON.stringify(stacks_1));
  moves = moves.split("\n");

  for (let i = 0; i < moves.length; i++) {
    let [amount, from, to] = parseInstruction(moves[i]);
    for (let j = 0; j < amount; j++) {
      stacks_1[to].unshift(stacks_1[from][0]);
      stacks_1[from].splice(0, 1);
    }
  }
  
  for (let i = 0; i < moves.length; i++) {
    let [tmpAmount, from, to] = parseInstruction(moves[i]);
    let amount = tmpAmount;
    tmpAmount = tmpAmount - 1;
    for (tmpAmount; tmpAmount > -1; tmpAmount--) {
      stacks_2[to].unshift(stacks_2[from][tmpAmount]);
    }
    stacks_2[from].splice(0, amount);
  }

  const part_1 = stacks_1
    .map((stack) => stack[0])
    .toString()
    .replaceAll(",", "");
  const part_2 = stacks_2
    .map((stack) => stack[0])
    .toString()
    .replaceAll(",", "");
  return { part_1, part_2 };
};

console.log("test input:", arrangeStacks(testInput));
console.log("actual input:", arrangeStacks(input));
