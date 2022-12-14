function readInput(testInput = false, asStringList = false) {
  const fs = require("fs");
  const inputfile = testInput ? "testinput.txt" : "input.txt";
  const input = fs.readFileSync(inputfile, "utf-8");

  if (asStringList) {
    return input.split("\n");
  }
  return input;
}

// idea: check if start of second <= start of first and end of second >= end of first and vice versa
// maybe this can be done more elegant with math
function getPairsFromInput(pairLine) {
  return pairLine
    .split(",")
    .map((value) => value.split("-").map((innerValue) => Number(innerValue)));
}

function isIncludingPair(pairLine) {
  const [[firstStart, firstEnd], [secondStart, secondEnd]] =
    getPairsFromInput(pairLine);
  if (secondStart >= firstStart && secondEnd <= firstEnd) return 1;
  else if (firstStart >= secondStart && firstEnd <= secondEnd) return 1;
  return 0;
}

function isOverlappingPair(pairLine) {
  const [[firstStart, firstEnd], [secondStart, secondEnd]] =
    getPairsFromInput(pairLine);

  if (secondStart >= firstStart && secondStart <= firstEnd) return 1; // firstStart <= secondStart <= firstEnd
  else if (secondEnd >= firstStart && secondEnd <= firstEnd) return 1; // firstStart <= secondEnd <= firstEnd
  else if (firstStart >= secondStart && firstStart <= secondEnd) return 1; // secondStart <= firstStart <= secondEnd
  else if (firstEnd >= secondStart && firstEnd <= secondEnd) return 1; // secondStart <= firstEnd <= secondEnd

  return 0;
}

const [testrun, inputAsStringList] = [true, true];
const input = readInput(testrun, inputAsStringList);

console.log(
  input.reduce(function (total, current) {
    return total + isIncludingPair(current);
  }, 0)
);

console.log(
  input.reduce(function (total, current) {
    return total + isOverlappingPair(current);
  }, 0)
);
