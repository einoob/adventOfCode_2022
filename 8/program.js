const { input, testInput } = require("./input");

const treeIsOnTheEdge = (linesOfTrees, y, x) => {
  return x === 0 || x + 1 === linesOfTrees[y].length;
};

const visibleFromRight = (linesOfTrees, y, x) => {
  const heightOfCurrentTree = +linesOfTrees[y][x];

  for (let i = x + 1; i < linesOfTrees[y].length; i++) {
    if (+linesOfTrees[y][i] >= heightOfCurrentTree) {
      return false;
    }
  }
  return true;
};

const visibleFromLeft = (linesOfTrees, y, x) => {
  const heightOfCurrentTree = +linesOfTrees[y][x];

  for (let i = x - 1; i > -1; i--) {
    if (+linesOfTrees[y][i] >= heightOfCurrentTree) {
      return false;
    }
  }
  return true;
};

const visibleFromTop = (linesOfTrees, y, x) => {
  const heightOfCurrentTree = +linesOfTrees[y][x];

  for (let i = y - 1; i > -1; i--) {
    if (+linesOfTrees[i][x] >= heightOfCurrentTree) {
      return false;
    }
  }
  return true;
};

const visibleFromBottom = (linesOfTrees, y, x) => {
  const heightOfCurrentTree = +linesOfTrees[y][x];

  for (let i = y + 1; i < linesOfTrees.length; i++) {
    if (+linesOfTrees[i][x] >= heightOfCurrentTree) {
      return false;
    }
  }
  return true;
};

const getScenicScoreRight = (linesOfTrees, y, x) => {
  const heightOfCurrentTree = +linesOfTrees[y][x];
  let scenicScore = 1;

  for (let i = x + 1; i < linesOfTrees[y].length; i++) {
    if (heightOfCurrentTree <= +linesOfTrees[y][i]) return scenicScore;
    scenicScore++;
  }
  return scenicScore;
};

const getScenicScoreLeft = (linesOfTrees, y, x) => {
  const heightOfCurrentTree = +linesOfTrees[y][x];
  let scenicScore = 1;

  for (let i = x - 1; i > 0; i--) {
    if (heightOfCurrentTree <= +linesOfTrees[y][i]) return scenicScore;
    scenicScore++;
  }
  return scenicScore;
};

const getScenicScoreDown = (linesOfTrees, y, x) => {
  const heightOfCurrentTree = +linesOfTrees[y][x];
  let scenicScore = 1;

  for (let i = y + 1; i < linesOfTrees.length - 1; i++) {
    if (heightOfCurrentTree <= +linesOfTrees[i][x]) return scenicScore;
    scenicScore++;
  }
  return scenicScore;
};

const getScenicScoreUp = (linesOfTrees, y, x) => {
  const heightOfCurrentTree = +linesOfTrees[y][x];
  let scenicScore = 1;

  for (let i = y - 1; i > 0; i--) {
    if (heightOfCurrentTree <= +linesOfTrees[i][x]) return scenicScore;
    scenicScore++;
  }
  return scenicScore;
};

const getScenicScore = (linesOfTrees, y, x) => {
  const scenicScores = [];

  scenicScores.push(getScenicScoreUp(linesOfTrees, y, x));
  scenicScores.push(getScenicScoreLeft(linesOfTrees, y, x));
  scenicScores.push(getScenicScoreDown(linesOfTrees, y, x));
  scenicScores.push(getScenicScoreRight(linesOfTrees, y, x));

  return scenicScores.reduce((a, b) => a * b);
};

const countVisibleTrees = (input) => {
  const linesOfTrees = input.split("\n");

  let numberOfVisibleTrees = linesOfTrees[0].length * 2;
  let bestScenicScore = 0;
  for (let y = 1; y < linesOfTrees.length - 1; y++) {
    for (let x = 0; x < linesOfTrees[y].length; x++) {
      if (
        treeIsOnTheEdge(linesOfTrees, y, x) ||
        visibleFromRight(linesOfTrees, y, x) ||
        visibleFromLeft(linesOfTrees, y, x) ||
        visibleFromTop(linesOfTrees, y, x) ||
        visibleFromBottom(linesOfTrees, y, x)
      ) {
        numberOfVisibleTrees++;
      }
      if (!treeIsOnTheEdge(linesOfTrees, y, x)) {
        const scenicScore = getScenicScore(linesOfTrees, y, x);
        if (scenicScore > bestScenicScore) {
          bestScenicScore = scenicScore;
        }
      }
    }
  }
  return { numberOfVisibleTrees, bestScenicScore };
};

console.log("test input:", countVisibleTrees(testInput));
console.log("actual input:", countVisibleTrees(input));
