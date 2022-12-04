const { input, testInput } = require("./input");

const scoresForObjects = {
  X: 1,
  Y: 2,
  Z: 3,
};

const scoresForResults = {
  X: 0,
  Y: 3,
  Z: 6,
};

const getPlayedObject = (matchData) => {
  let matchScore = 0;

  if (
    (matchData[0] === "A" && matchData[1] === "X") ||
    (matchData[0] === "B" && matchData[1] === "Z") ||
    (matchData[0] === "C" && matchData[1] === "Y")
  ) {
    matchScore += scoresForObjects.Z;
  } else if (
    (matchData[0] === "A" && matchData[1] === "Y") ||
    (matchData[0] === "B" && matchData[1] === "X") ||
    (matchData[0] === "C" && matchData[1] === "Z")
  ) {
    matchScore += scoresForObjects.X;
  } else {
    matchScore += scoresForObjects.Y;
  }
  matchScore += scoresForResults[matchData[1]];

  return matchScore;
};

const getMatchResult = (playedObjects) => {
  let matchScore = 0;
  if (
    (playedObjects[0] === "A" && playedObjects[1] === "X") ||
    (playedObjects[0] === "B" && playedObjects[1] === "Y") ||
    (playedObjects[0] === "C" && playedObjects[1] === "Z")
  ) {
    matchScore += 3;
  } else if (
    (playedObjects[0] === "A" && playedObjects[1] === "Y") ||
    (playedObjects[0] === "B" && playedObjects[1] === "Z") ||
    (playedObjects[0] === "C" && playedObjects[1] === "X")
  ) {
    matchScore += 6;
  }
  matchScore += scoresForObjects[playedObjects[1]];
  return matchScore;
};

const countTotalScore = (input) => {
  const matches = input.split("\n");

  let totalScore = { part_1: 0, part_2: 0 };
  matches.forEach((match) => {
    const matchData = match.split(" ");
    totalScore.part_1 += getMatchResult(matchData);
    totalScore.part_2 += getPlayedObject(matchData);
  });
  return totalScore;
};

console.log("test input:", countTotalScore(testInput));
console.log("actual input:", countTotalScore(input));
