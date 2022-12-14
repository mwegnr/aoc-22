function readInput(testInput = false, asStringList = false) {
  const fs = require("fs");
  const inputfile = testInput ? "testinput.txt" : "input.txt";
  const input = fs.readFileSync(inputfile, "utf-8");

  if (asStringList) {
    return input.split("\n");
  }
  return input;
}

function getItemPriority(item) {
  const lowerCaseBase = "a".charCodeAt(0);
  const upperCaseBase = "A".charCodeAt(0);

  const itemCharCode = item.charCodeAt(0);

  if (itemCharCode >= lowerCaseBase) {
    return itemCharCode - lowerCaseBase + 1;
  }
  return itemCharCode - upperCaseBase + 27;
}

function getBackpackPriority(rucksack) {
  const [first, second] = splitIntoCompartments(rucksack);
  const commonItem = first.filter((value) => second.includes(value))[0];
  return getItemPriority(commonItem);
}

function splitIntoCompartments(rucksack) {
  const middle = rucksack.length / 2;
  return [
    rucksack.substring(0, middle).split(""),
    rucksack.substring(middle).split(""),
  ];
}

function getBackpackGroupPriority(backpackGroup) {
  const [first, second, third] = backpackGroup.slice(0, 3);
  const commonItem = first.filter((value) =>
    second.filter((value) => third.includes(value)).includes(value)
  )[0];
  return getItemPriority(commonItem);
}

function getBackpackGroups(backpacks) {
  let n = 3;
  let backpacksCopy = backpacks;
  return new Array(Math.ceil(backpacksCopy.length / n))
    .fill()
    .map((_) => backpacksCopy.splice(0, n).map((value) => value.split("")));
}

// Main

const [testrun, inputAsStringList] = [false, true];
const input = readInput(testrun, inputAsStringList);

// Part 1
console.log(
  input.reduce(function (total, current) {
    return total + getBackpackPriority(current);
  }, 0)
);

// Part 2
let backpackGroups = getBackpackGroups(input);
console.log(
  backpackGroups.reduce(function (total, current) {
    return total + getBackpackGroupPriority(current);
  }, 0)
);
