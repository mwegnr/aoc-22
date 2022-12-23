function readInput(testInput = false, asStringList = false) {
  const fs = require("fs");
  const inputfile = testInput ? "testinput.txt" : "input.txt";
  const input = fs.readFileSync(inputfile, "utf-8");

  if (asStringList) {
    return input.split("\n");
  }
  return input;
}

const [testrun, inputAsStringList] = [false, false];
const input = readInput(testrun, inputAsStringList);

function getIndexOfFirstMarker(input, neededCharacters = 4) {
  for (let i = 0; i < input.length; i++) {
    const hasFourUniqueChars = new Set(input.slice(i, i + neededCharacters)).size == neededCharacters
    if (hasFourUniqueChars) {
      return i + neededCharacters;
    }
  }
}

console.log(getIndexOfFirstMarker(input));
console.log(getIndexOfFirstMarker(input, 14))