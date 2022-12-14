function readInput() {
  let fs = require("fs");
  // return fs.readFileSync("testinput.txt", 'utf-8');
  return fs.readFileSync("input.txt", "utf-8");
}

function caloriesByElves(inputByElves) {
  var caloriesByElves = [];
  inputByElves.forEach((element, index) => {
    var caloriesPerSnack = element.split("\n");
    var sum = caloriesPerSnack.reduce(function (total, current) {
      return Number(total) + Number(current);
    }, 0);
    caloriesByElves.push(sum);
  });
  return caloriesByElves;
}

const input = readInput();
inputByElves = input.split("\n\n");
caloriesByElves = caloriesByElves(inputByElves);
sortedCalories = caloriesByElves.sort(function (a, b) {
  return b - a;
});

// Part 1
console.log(sortedCalories[0]);

// Part 2
console.log(sortedCalories[0] + sortedCalories[1] + sortedCalories[2]);
