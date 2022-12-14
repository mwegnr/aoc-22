// Opponent: A = Rock, B = Paper, C = Scissors
// Own: X = Rock, Y = Paper, Z = Scissors

function readInput() {
  let fs = require("fs");
  //   return fs.readFileSync("testinput.txt", "utf-8");
  return fs.readFileSync("input.txt", "utf-8");
}

function getAsciiValue(character) {
  return character.charCodeAt(0);
}

// Part 1
function getResultScore(opponent, own) {
  // Idea: ASCII encode, substract opponent from own, shift by 2 and check remainder
  // (own - opponent + 2) mod 3 = 2 (win), = 1 (draw), = 0 (lose)
  var rem = (getAsciiValue(own) - getAsciiValue(opponent) + 2) % 3;
  return rem * 3;
}

function getChoiceScore(own) {
  // Idea: ASCII encode and substract base "W" to get score
  return getAsciiValue(own) - getAsciiValue("W");
}

function getLineScorePartOne(inputline) {
  var [opponent, own] = inputline.split(" ");
  return getResultScore(opponent, own) + getChoiceScore(own);
}

const input = readInput().split("\n");

console.log(
  input.reduce(function (total, current) {
    return total + getLineScorePartOne(current);
  }, 0)
);

// Part 2
function getOwnChoice(opponent, result) {
  // Idea: ASCII encode, add opponent to result, shift by 1, modulo 3 and add since modulo starts at 0
  // (res - 1 + opp) % 3 + 1 = own
  var own = (getAsciiValue(result) - 1 + getAsciiValue(opponent)) % 3;
  return String.fromCharCode(own + getAsciiValue("X"));
}

function getLineScorePartTwo(inputline) {
  var [opponent, result] = inputline.split(" ");
  var own = getOwnChoice(opponent, result);
  return getResultScore(opponent, own) + getChoiceScore(own);
}

console.log(
  input.reduce(function (total, current) {
    return total + getLineScorePartTwo(current);
  }, 0)
);
