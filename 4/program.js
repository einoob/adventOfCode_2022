const { input, testInput } = require("./input");

const getAmountOfOverlapping = (input) => {
  const rangePairs = input.split("\n");

  let overlappings = { fully: 0, all: 0 };
  rangePairs.forEach((rangePair) => {
    let [range_1, range_2] = rangePair.split(",");
    range_1 = range_1.split("-");
    range_2 = range_2.split("-");
    if (+range_1[0] >= +range_2[0] && +range_1[1] <= +range_2[1]) {
      overlappings.fully++;
    } else if (+range_2[0] >= +range_1[0] && +range_2[1] <= +range_1[1]) {
      overlappings.fully++;
    }
    if (
      (+range_1[0] >= +range_2[0] && +range_1[0] <= +range_2[1]) ||
      (+range_1[1] <= +range_2[1] && +range_1[1] >= +range_2[0])
    ) {
      overlappings.all++;
    } else if (
      (+range_2[0] >= +range_1[0] && +range_2[0] <= +range_1[1]) ||
      (+range_2[1] <= +range_1[1] && +range_2[1] >= +range_1[0])
    ) {
      overlappings.all++;
    }
  });

  return overlappings;
};

console.log("test input:", getAmountOfOverlapping(testInput));
console.log("actual input:", getAmountOfOverlapping(input));
