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
  .map((num) => parseInt(num, 10));

console.log(data);

let lastWindow = 0;
let timesIncreased = 0;
for(let i = 0; i < data.length; i++) {
  // create new window if able, otherwise break
  if (i + 2 < data.length) {
    let currentWindow = data[i] + data[i+1] + data[i+2];
    if (currentWindow > lastWindow && lastWindow != 0) {
      timesIncreased++;
    }
    lastWindow = currentWindow;
  } else {
    break;
  }
}
console.log(timesIncreased);