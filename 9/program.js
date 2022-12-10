const { input, testInput, testInput_2 } = require("./input");

let visitedCoordinates;

const headAndTailTouching = (currentPositions, knot) => {
  return (
    Math.abs(currentPositions[knot].x - currentPositions[knot - 1].x) < 2 &&
    Math.abs(currentPositions[knot].y - currentPositions[knot - 1].y) < 2
  );
};

const getDirection = (currentPositions, knot) => {
  let tailDirection = "";
  if (currentPositions[knot - 1].y - currentPositions[knot].y > 1) tailDirection += "U";
  if (currentPositions[knot].y - currentPositions[knot - 1].y > 1) tailDirection += "D";
  if (currentPositions[knot - 1].x - currentPositions[knot].x > 1) tailDirection += "R";
  if (currentPositions[knot].x - currentPositions[knot - 1].x > 1) tailDirection += "L";

  return tailDirection;
};

const getDiagonalMovement = (currentPositions, tailDirection, knot) => {
  if (tailDirection.includes("R")) currentPositions[knot].x = currentPositions[knot - 1].x - 1;
  if (tailDirection.includes("L")) currentPositions[knot].x = currentPositions[knot - 1].x + 1;
  if (tailDirection.includes("U")) currentPositions[knot].y = currentPositions[knot - 1].y - 1;
  if (tailDirection.includes("D")) currentPositions[knot].y = currentPositions[knot - 1].y + 1;
};

const moveRope = (currentPositions, direction, distance) => {
  for (let i = 0; i < +distance; i++) {
    for (let knot = 0; knot < currentPositions.length; knot++) {
      if (knot === 0) {
        if (direction === "R") {
          currentPositions[knot].x += 1;
        } else if (direction === "L") {
          currentPositions[knot].x -= 1;
        } else if (direction === "U") {
          currentPositions[knot].y += 1;
        } else {
          currentPositions[knot].y -= 1;
        }
      } else if (!headAndTailTouching(currentPositions, knot)) {
        let tailDirection = getDirection(currentPositions, knot);
        if (tailDirection === "R") currentPositions[knot].x = currentPositions[knot - 1].x - 1;
        else if (tailDirection === "L") currentPositions[knot].x = currentPositions[knot - 1].x + 1;
        else if (tailDirection === "U") currentPositions[knot].y = currentPositions[knot - 1].y - 1;
        else if (tailDirection === "D") currentPositions[knot].y = currentPositions[knot - 1].y + 1;

        if (tailDirection.length == 2) getDiagonalMovement(currentPositions, tailDirection, knot);
        else if (tailDirection === "R" || tailDirection === "L")
          currentPositions[knot].y = currentPositions[knot - 1].y;
        else if (tailDirection === "U" || tailDirection === "D")
          currentPositions[knot].x = currentPositions[knot - 1].x;

        if (
          knot === currentPositions.length - 1 &&
          !visitedCoordinates.includes(`${currentPositions[knot].x},${currentPositions[knot].y}`)
        ) {
          visitedCoordinates.push(`${currentPositions[knot].x},${currentPositions[knot].y}`);
        }
      }
    }
  }
};

const getAmountOfVisitedPoints = (input, knots) => {
  const moves = input.split("\n");
  let currentPositions = Array.from({ length: knots }, (e) => ({ x: 0, y: 0 }));
  visitedCoordinates = ["0,0"];

  for (let i = 0; i < moves.length; i++) {
    let [direction, distance] = moves[i].split(" ");
    moveRope(currentPositions, direction, distance);
  }
  return visitedCoordinates.length;
};

console.log(
  "test input:\npart 1:",
  getAmountOfVisitedPoints(testInput, 2),
  "part 2:",
  getAmountOfVisitedPoints(testInput, 10),
  "\nbigger test input:\n",
  getAmountOfVisitedPoints(testInput_2, 10)
);
console.log(
  "actual input\npart 1:",
  getAmountOfVisitedPoints(input, 2),
  "part 2:",
  getAmountOfVisitedPoints(input, 10)
);
