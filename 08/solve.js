// const math = require("math")

function readInput(testInput = false, asStringList = false) {
  const fs = require("fs");
  const inputfile = testInput ? "testinput.txt" : "input.txt";
  const input = fs.readFileSync(inputfile, "utf-8");

  if (asStringList) {
    return input.split("\n");
  }
  return input;
}

const getTransposedArray = (input) => input[0].map((_, colIndex) => input.map((row) => row[colIndex]));

const getNumberArray = (input) => input.map((line) => line.split("").map((value) => Number(value)));

const matrixAddition = (matrix1, matrix2) =>
  matrix1.map((line, lineIndex) => line.map((value, colIndex) => value + matrix2[lineIndex][colIndex]));

function getVisibleInLine(line) {
  let [leftMax, rightMax, leftIndex, rightIndex] = [-1, -1, 0, line.length - 1];
  let visible = Array(line.length).fill(0);
  while (leftIndex <= rightIndex) {
    if (leftMax <= rightMax) {
      const current = Number(line[leftIndex]);
      if (current > leftMax) {
        leftMax = current;
        visible[leftIndex] = 1;
      }
      leftIndex++;
    } else {
      const current = Number(line[rightIndex]);
      if (current > rightMax) {
        rightMax = current;
        visible[rightIndex] = 1;
      }
      rightIndex--;
    }
  }
  return visible;
}

const [testrun, inputAsStringList] = [false, true];
const input = getNumberArray(readInput(testrun, inputAsStringList));
const transposedInput = getTransposedArray(input);

const visibleTreesHorizontal = input.map((line) => getVisibleInLine(line));
const visibleTreesVertical = transposedInput.map((line) => getVisibleInLine(line));
const visibleTreesVerticalRetransposed = getTransposedArray(visibleTreesVertical);

const visibleTrees = matrixAddition(visibleTreesHorizontal, visibleTreesVerticalRetransposed);

// Part 1
console.log(
  visibleTrees.reduce(
    (total, currentLine) =>
      total +
      currentLine.reduce((lineTotal, current) => {
        if (current > 0) return lineTotal + 1;
        return lineTotal;
      }, 0),
    0
  )
);

// Part 2
function getScenicScoreArray(input) {
  let scenicScores = input.map((line, rowIndex) => {
    let scenicScoreLine = line.map((value, colIndex) => {
      if (rowIndex == 0 || colIndex == 0 || rowIndex == input.length - 1 || colIndex == line.length - 1) return 0;

      let [leftDistance, rightDistance, upDistance, downDistance] = [1, 1, 1, 1];
      let [leftIndex, rightIndex, upIndex, downIndex] = [colIndex - 1, colIndex + 1, rowIndex - 1, rowIndex + 1];
      // look left
      while (leftIndex >= 0 && input[rowIndex][leftIndex] < value) {
        leftDistance++;
        leftIndex--;
      }
      if (leftIndex < 0) leftDistance--;
      // look right
      while (rightIndex < line.length && input[rowIndex][rightIndex] < value) {
        rightDistance++;
        rightIndex++;
      }
      if (rightIndex >= line.length) rightDistance--;
      // look up
      while (upIndex >= 0 && input[upIndex][colIndex] < value) {
        upDistance++;
        upIndex--;
      }
      if (upIndex < 0) upDistance--;
      // look down
      while (downIndex < input.length && input[downIndex][colIndex] < value) {
        downDistance++;
        downIndex++;
      }
      if (downIndex >= input.length) downDistance--;

      return leftDistance * rightDistance * upDistance * downDistance;
    });
    return scenicScoreLine;
  });
  return scenicScores;
}

const scenicScores = getScenicScoreArray(input);
console.log(
  scenicScores.reduce((total, currentLine) => {
    const lineTotal = currentLine.reduce((lineTotal, current) => {
      if (current > lineTotal) return current;
      return lineTotal;
    }, 0);  

    if (lineTotal > total) return lineTotal
    return total
  }, 0)
);
