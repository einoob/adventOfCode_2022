const { input, testInput } = require("./input");

const getBiggestSum = (input) => {
  const splittedInput = input.split("\n\n");

  let calorySums = [];
  for (let i = 0; i < splittedInput.length; i++) {
    const numbers = splittedInput[i].split("\n");
    const sum = numbers.reduce((a, b) => +a + +b, 0);
    calorySums.push(sum);
  }
  calorySums.sort((a, b) => b - a);

  return {
    part_1: calorySums[0],
    part_2: calorySums[0] + calorySums[1] + calorySums[2],
  };
};

console.log("test input:\n", getBiggestSum(testInput));
console.log("actual input:\n", getBiggestSum(input));
