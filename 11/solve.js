const util = require("../util");

function parseMonkeyData(input) {
  const monkeyIdRe = /Monkey\s(?<monkey_id>\d+)/g
  const itemPrioRe = /Starting\sitems:\s(?<item_priorities>.*)/g // TODO: split further

  // each monkey description takes 6 + (1 empty) input lines
  for (let i = 0; i < input.length; i += 7) {
    console.log(input[i]);
  }
}

const [testrun, inputAsStringList] = [true, true];
const input = util.readInput(testrun, inputAsStringList);

parseMonkeyData(input);
