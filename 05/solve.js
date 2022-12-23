function readInput(testInput = false, asStringList = false) {
  const fs = require("fs");
  const inputfile = testInput ? "testinput.txt" : "input.txt";
  const input = fs.readFileSync(inputfile, "utf-8");

  if (asStringList) {
    return input.split("\n");
  }
  return input;
}

function readStacks(input) {
  // stack input is always 3 chars wide with one space to the next
}

function instructionFromLine(inputline) {
  const lineRe = /move\s(?<amount>\d+)\sfrom\s(?<from>\d+)\sto\s(?<to>\d+)/g;
  for (const match of inputline.matchAll(lineRe)) {
    return [match.groups.amount, match.groups.to, match.groups.from];
  }
  return [];
}

function readInstructions(input) {
  let instructions = [];
  // todo: parse instructions from input
}

const [testrun, inputAsStringList] = [true, true];
const input = readInput(testrun, inputAsStringList);

input.forEach((current) => instructionFromLine(current));
