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

// Part 1
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
  return util
    .range(20, 221, 40)
    .map((cycle) => cycle * registerContentPerCycle[cycle - 1])
    .reduce((total, current) => total + current);
}

// Part 2

function getPixelContent(currentPosition, registerContent) {
  if ([registerContent - 1, registerContent, registerContent + 1].includes(currentPosition)) {
    return "#";
  }
  return ".";
}

function draw(registerContentPerCycle) {
  const lines = util.range(0, 6);
  return lines.map((lineNr) => {
    return util
      .range(0, 40)
      .map((charIndex) => {
        let registerIndex = lineNr * 40 + charIndex;
        return getPixelContent(charIndex, registerContentPerCycle[registerIndex]);
      })
      .join("");
  });
}

const [testrun, inputAsStringList] = [false, true];
const input = util.readInput(testrun, inputAsStringList);

const instructions = readInstructionsFromInput(input);

const registerContentPerCycle = simulateRegisterContent(instructions);
// console.log(calculateSignalStrength(registerContentPerCycle));

// console.log(registerContentPerCycle[20 - 1] == 21);
// console.log(registerContentPerCycle[60 - 1] == 19);
// console.log(registerContentPerCycle[100 - 1] == 18);
// console.log(registerContentPerCycle[140 - 1] == 21);
// console.log(registerContentPerCycle[180 - 1] == 16);
// console.log(registerContentPerCycle[220 - 1] == 18);

// console.log(calculateSignalStrength(registerContentPerCycle) == 13140);

const crtImage = draw(registerContentPerCycle);
console.log(crtImage);

// console.log(getPixelContent(0, 1) == "#");
// console.log(getPixelContent(2, 16) == ".");

// console.log(crtImage[0] == "##..##..##..##..##..##..##..##..##..##..")
// console.log(crtImage[1] == "###...###...###...###...###...###...###.")
// console.log(crtImage[2] == "####....####....####....####....####....")
// console.log(crtImage[3] == "#####.....#####.....#####.....#####.....")
// console.log(crtImage[4] == "######......######......######......####")
// console.log(crtImage[5] == "#######.......#######.......#######.....")