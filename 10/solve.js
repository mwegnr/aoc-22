const util = require("../util");

function readInstructionsFromInput(input) {
  const instructionRe = /(?<instruction>addx|noop)\s*(?<amount>-?\d+)*/g;
  return input.map((line) => {
    for (const match of line.matchAll(instructionRe)) {
      if (match.groups.instruction == "addx") {
        return { instruction: "addx", amount: Number(match.groups.amount) };
      } else return { instruction: "noop" };
    }
  });
}

function simulateRegisterContent(instructions) {
  let registerContentPerCycle = [1];
  instructions.forEach((instruction) => {
    const lastValue = registerContentPerCycle[registerContentPerCycle.length - 1];
    if (instruction.instruction == "noop") {
      // add last value again as cycle does nothing
      registerContentPerCycle.push(lastValue);
    } else if (instruction.instruction == "addx") {
      registerContentPerCycle.push(lastValue);
      registerContentPerCycle.push(lastValue + instruction.amount);
    }
  });
  return registerContentPerCycle;
}

function calculateSignalStrength(registerContentPerCycle) {
  const cycles = [];
  for (let i = 20; i <= 220; i += 40) cycles.push(i);
  return cycles.map((cycle) => cycle * registerContentPerCycle[cycle - 1]).reduce((total, current) => total + current);
}

const [testrun, inputAsStringList] = [false, true];
const input = util.readInput(testrun, inputAsStringList);

const instructions = readInstructionsFromInput(input);

// Part 1
const registerContentPerCycle = simulateRegisterContent(instructions);
console.log(calculateSignalStrength(registerContentPerCycle));

// console.log(registerContentPerCycle[20 - 1] == 21);
// console.log(registerContentPerCycle[60 - 1] == 19);
// console.log(registerContentPerCycle[100 - 1] == 18);
// console.log(registerContentPerCycle[140 - 1] == 21);
// console.log(registerContentPerCycle[180 - 1] == 16);
// console.log(registerContentPerCycle[220 - 1] == 18);

// console.log(calculateSignalStrength(registerContentPerCycle) == 13140);

// Part 2