const { input, testInput } = require("./input");

let visitedCoordinates = ["0,0"];

const isXWithinOne = (currentPositions) => {
  if (currentPositions.head.x >= 0 && currentPositions.tail.x >= 0) {
    return (Math.abs(currentPositions.head.x - currentPositions.tail.x) < 2 &&
    Math.abs(currentPositions.head.x - currentPositions.tail.x) > -2);
  } else if (currentPositions.head.x < 0 && currentPositions.tail.x < 0) {
    return (Math.abs(currentPositions.head.x) - Math.abs(currentPositions.tail.x) < 2 && 
    Math.abs(currentPositions.head.x) - Math.abs(currentPositions.tail.x) > -2);
  }
  return (
    (currentPositions.head.x === 0 && currentPositions.tail.x === -1) ||
    (currentPositions.head.x === -1 && currentPositions.tail.x === 0)
  );
};

const isYWithinOne = (currentPositions) => {
  if (currentPositions.head.y >= 0 && currentPositions.tail.y >= 0) {
    return (Math.abs(currentPositions.head.y - currentPositions.tail.y) < 2 &&
    Math.abs(currentPositions.head.y - currentPositions.tail.y) > -2);
  } else if (currentPositions.head.y < 0 && currentPositions.tail.y < 0) {
    return (Math.abs(currentPositions.head.y) - Math.abs(currentPositions.tail.y) < 2 && 
    Math.abs(currentPositions.head.y) - Math.abs(currentPositions.tail.y) > -2);
  }
  return (
    (currentPositions.head.y === 0 && currentPositions.tail.y === -1) ||
    (currentPositions.head.y === -1 && currentPositions.tail.y === 0)
  );
};

const headAndTailTouching = (currentPositions) => {
  return isXWithinOne(currentPositions) && isYWithinOne(currentPositions);
};

const moveRope = (currentPositions, direction, distance) => {
  for (let i = 0; i < +distance; i++) {
    if (direction === "R") {
      currentPositions.head.x += 1;
    } else if (direction === "L") {
      currentPositions.head.x -= 1;
    } else if (direction === "U") {
      currentPositions.head.y += 1;
    } else {
      currentPositions.head.y -= 1;
    }
    if (!headAndTailTouching(currentPositions)) {
      if (direction === "R")
        currentPositions.tail.x = currentPositions.head.x - 1;
      else if (direction === "L")
        currentPositions.tail.x = currentPositions.head.x + 1;
      else if (direction === "U")
        currentPositions.tail.y = currentPositions.head.y - 1;
      else 
        currentPositions.tail.y = currentPositions.head.y + 1;
      if (direction === "R" || direction === "L")
        currentPositions.tail.y = currentPositions.head.y;
      else
        currentPositions.tail.x = currentPositions.head.x;
      if (!visitedCoordinates.includes(`${currentPositions.tail.x},${currentPositions.tail.y}`)) {
        visitedCoordinates.push(`${currentPositions.tail.x},${currentPositions.tail.y}`);
      }
    } 
  }
};

const simulateRopeMovement = (moves) => {
  let currentPositions = { head: { x: 0, y: 0 }, tail: { x: 0, y: 0 } };

  for (let i = 0; i < moves.length; i++) {
    const [direction, distance] = moves[i].split(" ");
    moveRope(currentPositions, direction, distance);
  }
};

const getAmountOfVisitedPoints = (input) => {
  const moves = input.split("\n");

  simulateRopeMovement(moves);
  return visitedCoordinates.length;
};

console.log("test input:", getAmountOfVisitedPoints(testInput));
visitedCoordinates = ["0,0"]
console.log("actual input:", getAmountOfVisitedPoints(input));
