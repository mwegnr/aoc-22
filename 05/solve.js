function readInput(testInput = false, asStringList = false) {
  const fs = require("fs");
  const inputfile = testInput ? "testinput.txt" : "input.txt";
  const input = fs.readFileSync(inputfile, "utf-8");

  if (asStringList) {
    return input.split("\n");
  }
  return input;
}

function getStackInputEndIndex(input) {
  const stackNumberLineRe = /^\s\d\s/g;
  for (let i = 0; i < input.length; i++) {
    if (stackNumberLineRe.test(input[i])) return i;
  }
  return -1;
}

function readStacks(input) {
  // stack input is always 3 chars wide with one space to the next
  const stackInputEnd = getStackInputEndIndex(input);
  const stackInput = input.slice(0, stackInputEnd);
  const stackCount = (input[stackInputEnd].length + 1) / 4;
  let stacks = Array.from({ length: stackCount }, e => []);

  stackInput.slice().reverse().forEach(line => {
    for (let i = 1; i <= line.length; i = i + 4) {
      if (line[i] != ' ') {
        stacks[(i - 1) / 4].push(line[i])
      }
    }
  })
  return stacks;
}

function instructionFromLine(inputline) {
  const lineRe = /move\s(?<amount>\d+)\sfrom\s(?<from>\d+)\sto\s(?<to>\d+)/g;
  for (const match of inputline.matchAll(lineRe)) {
    return [match.groups.amount, match.groups.from, match.groups.to];
  }
  return [];
}

function readInstructions(input) {
  let instructions = [];
  input.forEach((current) => {
    const instruction = instructionFromLine(current)
    if (instruction.length != 0) {
      instructions.push(instruction);
    }
  });
  return instructions;
}

function applyInstructions(stacks, instructions) {
  instructions.forEach(instruction => {
    for (let i = 0; i < instruction[0]; i++) {
      const crate = stacks[instruction[1] - 1].pop();
      stacks[instruction[2] - 1].push(crate);
    }
  });
  return stacks;
}

function applyInstructionsMultimove(stacks, instructions) {
  instructions.forEach(instruction => {
    const crates = stacks[instruction[1] - 1].splice(-instruction[0]);
    stacks[instruction[2] - 1].push(...crates);
  });
  return stacks;
}

const [testrun, inputAsStringList] = [false, true];
const input = readInput(testrun, inputAsStringList);

// Part 1
const stacks = readStacks(input);
const instructions = readInstructions(input);

console.log(stacks);
console.log(instructions);

applyInstructions(stacks, instructions)
console.log(stacks);

console.log(stacks.reduce(function (total, current) {
  const top = current.pop()
  return total.concat(top);
}, ""))

// Part 2
const stacks_two = readStacks(input);
console.log(stacks_two);
console.log(instructions);

applyInstructionsMultimove(stacks_two, instructions);
console.log(stacks);


console.log(stacks_two.reduce(function (total, current) {
  const top = current.pop()
  return total.concat(top);
}, ""))