module.exports = {
    readInput: function (testInput = false, asStringList = false) {
        const fs = require("fs");
        const inputfile = testInput ? "testinput.txt" : "input.txt";
        const input = fs.readFileSync(inputfile, "utf-8");

        if (asStringList) {
            return input.split("\n");
        }
        return input;
    }
}
