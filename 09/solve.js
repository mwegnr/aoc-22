const util = require("../util");

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

function moveTailToHead(tailPosition, headPosition, previousHeadPosition) {
  // move tail to previous head position if eucledian distance is 2 or bigger
  if (eucledianDistance(tailPosition, headPosition) >= 2) {
    return previousHeadPosition;
  }
  return tailPosition;
}

// simulates moves and returns visited points afterwards
function moveRopeEnds(instructions) {
  let headPosition = { x: 0, y: 0 };
  let tailPosition = { x: 0, y: 0 };
  const visitedPositions = [{ ...tailPosition }];
  instructions.forEach((move) => {
    for (let i = 0; i < move.steps; i++) {
      const previousHeadPosition = { ...headPosition };
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
      tailPosition = moveTailToHead(tailPosition, headPosition, previousHeadPosition);
      visitedPositions.push({ ...tailPosition });
    }
  });
  return visitedPositions;
}

const [testrun, inputAsStringList] = [false, true];
const input = util.readInput(testrun, inputAsStringList);

const instructions = readInstructionsFromInput(input);
const visitedPositions = moveRopeEnds(instructions);

function equalsPos(element) {
  return element.x == this.x && element.y == this.y;
}

console.log(
  visitedPositions.reduce((total, current, index) => {
    if (visitedPositions.findIndex(equalsPos, current) == index) {
      return total + 1;
    }
    return total;
  }, 0)
);


// Part 2