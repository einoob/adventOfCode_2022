const { input, testInput } = require("./input");

const areAllCharactersDifferent = (input, i, length) => {
  const subString = input.substring(i, (i + length));
  return (new Set(subString).size === subString.length);
};

const getPositionOfTheSequence = (input) => {
  let startOfPacketMarker = 4;
  let startOfMessageMarker = 13;

  for (let i = 3; i < input.length; i++) {
    if (areAllCharactersDifferent(input, i, 4)) {
      startOfPacketMarker = i + 1;
      break ;
    }
  }
  for (let i = 0; i < input.length; i++) {
    if (areAllCharactersDifferent(input, i, 14)) {
      startOfMessageMarker = i + 14;
      break ;
    }
  }
  return { part_1: startOfPacketMarker, part_2: startOfMessageMarker };
};

console.log("test input:", getPositionOfTheSequence(testInput));
console.log("actual input:", getPositionOfTheSequence(input));
