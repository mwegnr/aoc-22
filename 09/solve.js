const util = require("../util");

function equalsPos(element) {
  return element.x == this.x && element.y == this.y;
}

function eucledianDistance(p, q) {
  return Math.sqrt(Math.pow(q.x - p.x, 2) + Math.pow(q.y - p.y, 2));
}

function readInstructionsFromInput(input) {
  const instructionRe = /(?<direction>\w)\s(?<steps>\d+)/g;
  return input.map((line) => {
    for (const match of line.matchAll(instructionRe)) {
      return { dir: match.groups.direction, steps: Number(match.groups.steps) };
    }
  });
}
function moveKnotsList(headPosition, ropePositions) {
  // move tail to previous head position if eucledian distance is 2 or bigger
  const tailPosition = ropePositions[ropePositions.length - 1];

  if (eucledianDistance(tailPosition, headPosition) >= 2) {
    ropePositions.pop();
    return [{ ...headPosition }, ...ropePositions];
  }
  return [{ ...headPosition }, { ...tailPosition }];
}

function moveKnots(headPosition, ropePositions) {
  // move tail to previous head position if eucledian distance is 2 or bigger
  const tailPosition = ropePositions[ropePositions.length - 1];

  if (eucledianDistance(tailPosition, headPosition) >= 2) {
    ropePositions.pop();
    return [{ ...headPosition }, ...ropePositions];
  }
  return [{ ...headPosition }, { ...tailPosition }];
}

// simulates moves and returns visited points afterwards
function moveRopeEnds(instructions, knots = 2) {
  let headPosition = { x: 0, y: 0 };
  let ropePositions = Array.from({ length: knots }, (e) => {
    return { ...headPosition };
  });

  const visitedPositions = [{ ...ropePositions[ropePositions.length - 1] }];
  instructions.forEach((move) => {
    for (let i = 0; i < move.steps; i++) {
      switch (move.dir) {
        case "U":
          headPosition.y--;
          break;
        case "D":
          headPosition.y++;
          break;
        case "R":
          headPosition.x++;
          break;
        case "L":
          headPosition.x--;
          break;
      }
      ropePositions = moveKnots(headPosition, ropePositions);
      visitedPositions.push({ ...ropePositions[ropePositions.length - 1] });
    }
  });
  return visitedPositions;
}

const [testrun, inputAsStringList] = [false, true];
const input = util.readInput(testrun, inputAsStringList);

const instructions = readInstructionsFromInput(input);
const visitedPositions = moveRopeEnds(instructions);

console.log(
  visitedPositions.reduce((total, current, index) => {
    if (visitedPositions.findIndex(equalsPos, current) == index) {
      return total + 1;
    }
    return total;
  }, 0)
);

// Part 2
