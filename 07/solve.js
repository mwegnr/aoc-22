function readInput(testInput = false, asStringList = false) {
  const fs = require("fs");
  const inputfile = testInput ? "testinput.txt" : "input.txt";
  const input = fs.readFileSync(inputfile, "utf-8");

  if (asStringList) {
    return input.split("\n");
  }
  return input;
}

function calculateDirSizes(input) {
  let parentFolders = [];
  let dirSizes = {};
  const cdInReg = /\$.cd.(?<dir>[^.\n]+)/g;
  const cdOutReg = /\$.cd\s\.\./;
  const fileSizeReg = /\d+/;

  input.forEach((instruction) => {
    let matchIn = [...instruction.matchAll(cdInReg)];
    if (matchIn.length != 0) {
      // cd x -> push to stack
      // dir name needs to include parent folders since two folders in different locations can have the same name
      let dir;
      if (matchIn[0].groups.dir == "/") dir = matchIn[0].groups.dir;
      else dir = parentFolders.slice(-1).pop() + "/" + matchIn[0].groups.dir;
      parentFolders.push(dir);
      if (!dirSizes.hasOwnProperty(dir)) dirSizes[dir] = 0;
    } else if (cdOutReg.test(instruction)) {
      // cd .. -> pop from stack
      parentFolders.pop();
    } else if (fileSizeReg.test(instruction)) {
      // 29116 f -> add size to folder and all parent folders by walking up the parentFolder list
      const size = Number(instruction.match(fileSizeReg)[0]);
      for (const key of parentFolders) {
        dirSizes[key] = dirSizes[key] + size;
      }
    }
  });
  return dirSizes;
}

const [testrun, inputAsStringList] = [false, true];
const input = readInput(testrun, inputAsStringList);

const dirSizes = calculateDirSizes(input);
// console.log(dirSizes);

// Part 1
console.log(
  // only use values from dirSizes, names are irrelevant here
  Object.values(dirSizes).reduce(function (total, current) {
    if (current <= 100000) return total + current;
    return total;
  }, 0)
);

// Part 2
const totalSpace = 70000000;
const freeSpaceNeeded = 30000000;
const currentFreeSpace = totalSpace - dirSizes["/"];
// console.log(currentFreeSpace);

console.log(
  Object.values(dirSizes).sort(function (a, b) {
    const aTooSmall = currentFreeSpace + a < freeSpaceNeeded;
    const bTooSmall = currentFreeSpace + b < freeSpaceNeeded;

    if (aTooSmall && bTooSmall) {
      // too small, move to end
      return 0;
    } else if (aTooSmall) {
      return 1;
    } else if (bTooSmall) {
      return -1;
    } else {
      return a - b;
    }
  })[0]
);
