module.exports = {
  readInput: function (testInput = false, asStringList = false) {
    const fs = require("fs");
    const inputfile = testInput ? "testinput.txt" : "input.txt";
    const input = fs.readFileSync(inputfile, "utf-8");

    if (asStringList) {
      return input.split("\n");
    }
    return input;
  },
  round: function (v) {
    // custom rounding because JS rounds negative values the wrong way
    return (v >= 0 || -1) * Math.round(Math.abs(v));
  },
  range: function (start, end, steps = 1) {
    const range = [];
    for (let i = start; i < end; i += steps) range.push(i);
    return range;
  },
};
