const util = require("../util");

function equalsPos(p, q) {
  return p.x == q.x && p.y == q.y;
}

function equalsPosForIndex(element) {
  return element.x == this.x && element.y == this.y;
}

function getEucledianDistance(p, q) {
  return Math.sqrt(Math.pow(q.x - p.x, 2) + Math.pow(q.y - p.y, 2));
}

function getOneDimDistance(x1, x2) {
  return Math.sqrt(Math.pow(x1 - x2, 2));
}

function readInstructionsFromInput(input) {
  const instructionRe = /(?<direction>\w)\s(?<steps>\d+)/g;
  return input.map((line) => {
    for (const match of line.matchAll(instructionRe)) {
      return { dir: match.groups.direction, steps: Number(match.groups.steps) };
    }
  });
}

function getNextTailPosition(headPosition, tailPosition) {
  const eucledianDistance = getEucledianDistance(headPosition, tailPosition);
  if (eucledianDistance < 2) {
    return tailPosition;
  } else if (eucledianDistance == 2)
    // move horizontal/vertical
    return {
      x: tailPosition.x + (headPosition.x - tailPosition.x) / 2,
      y: tailPosition.y + (headPosition.y - tailPosition.y) / 2,
    };
  else if (eucledianDistance == Math.sqrt(5)) {
    // diagonal
    if (getOneDimDistance(headPosition.x, tailPosition.x) == 1) {
      return {
        x: headPosition.x,
        y: tailPosition.y + (headPosition.y - tailPosition.y) / 2,
      };
    } else if (getOneDimDistance(headPosition.y, tailPosition.y) == 1) {
      return {
        x: tailPosition.x + (headPosition.x - tailPosition.x) / 2,
        y: headPosition.y,
      };
    }
  } else if (eucledianDistance == Math.sqrt(8)) {
    return {
      x: tailPosition.x + (headPosition.x - tailPosition.x) / 2,
      y: tailPosition.y + (headPosition.y - tailPosition.y) / 2,
    };
  }
}

function moveKnotsList(ropePositions) {
  let previousElement = ropePositions[0];
  return ropePositions.map((element, index) => {
    if (index == 0) return element;
    previousElement = getNextTailPosition(previousElement, element);
    return previousElement;
  });
}

// simulates moves and returns visited points afterwards
function moveRopeEnds(instructions, knots = 2) {
  let headPosition = { x: 0, y: 0 };

  // init with head + copies of head until no of knots
  let ropePositions = [headPosition];
  for (let i = 1; i < knots; i++) {
    ropePositions.push({ ...headPosition });
  }

  // push initial tail to visited positions
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

      // update rope positions according to new head position
      ropePositions = moveKnotsList(ropePositions);

      // push current tail to visited positions if different from prev
      // (may result in dupes, will be filtered later)
      if (!equalsPos(visitedPositions[visitedPositions.length - 1], ropePositions[ropePositions.length - 1])) {
        visitedPositions.push({ ...ropePositions[ropePositions.length - 1] });
      }
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
    if (visitedPositions.findIndex(equalsPosForIndex, current) == index) {
      return total + 1;
    }
    return total;
  }, 0)
);

// Part 2
const visitedPositionsPartTwo = moveRopeEnds(instructions, 10);
const visitedPositionsNoDupesPartTwo = visitedPositionsPartTwo.reduce((total, current, index) => {
  if (visitedPositionsPartTwo.findIndex(equalsPosForIndex, current) == index) {
    return total + 1;
  }
  return total;
}, 0);
console.log(visitedPositionsNoDupesPartTwo); // -> 2203 -> too low

// // TODO: unit tests?
// console.log(equalsPos({ x: 1, y: 0 }, getNextTailPosition({ x: 0, y: 0 }, { x: 1, y: 0 }))); // no need to move
// console.log(equalsPos({ x: 1, y: -2 }, getNextTailPosition({ x: 1, y: -1 }, { x: 1, y: -3 }))); // move down
// console.log(equalsPos({ x: 2, y: -1 }, getNextTailPosition({ x: 3, y: -1 }, { x: 1, y: -1 }))); // move right
// console.log(equalsPos({ x: 1, y: 1 }, getNextTailPosition({ x: 1, y: 2 }, { x: 0, y: 0 }))); // move diagonally up + right
// console.log(equalsPos({ x: 2, y: -2 }, getNextTailPosition({ x: 2, y: -3 }, { x: 1, y: -1 }))); // move diagonally up + right
// console.log(equalsPos({ x: 2, y: -2 }, getNextTailPosition({ x: 3, y: -2 }, { x: 1, y: -1 }))); // move diagonally up + right
// console.log(equalsPos({ x: 3, y: -3 }, getNextTailPosition({ x: 4, y: -3 }, { x: 2, y: -4 }))); // move diagonally down + right
// console.log(equalsPos({ x: 5, y: 3 }, getNextTailPosition({ x: 6, y: 4 }, { x: 4, y: 2 }))); // move diagonally down + right
