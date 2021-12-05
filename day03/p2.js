const fs = require('fs');

const inputFile = process.argv.slice(2);
if (inputFile.length == 0 || !inputFile[0].endsWith('.txt')) {
  console.error("requires one argument ending in .txt");
  process.exit(1);
}

const data = fs
  .readFileSync(inputFile[0], 'utf-8')
  .toString()
  .trim()
  .split('\n')
  .map((command) => command.split(' '));

console.log(data);

let horizontal = 0;
let aim = 0;
let depth = 0;

data.forEach((command) => {
  let direction = command[0];
  let amount = parseInt(command[1], 10);
  if (direction === 'forward') {
    horizontal += amount;
    depth += aim * amount;
  } else if (direction == 'up') {
    aim -= amount;
  } else if (direction == 'down') {
    aim += amount;
  }
});

console.log(horizontal * depth);