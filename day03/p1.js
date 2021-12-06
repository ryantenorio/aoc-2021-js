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
  .split('\n');

console.log(data);

const lenth = data[0].length;
let gamma = "";
let epsilon = "";
for (let i = 0; i < lenth; i++) {
  let ones = 0
  let zeroes = 0;
  data.forEach(number => {
    if (number.charAt(i) === "0") {
      zeroes++;
    } else {
      ones++;
    }
  });
  if (ones > zeroes) {
    gamma = gamma.concat("1");
    epsilon = epsilon.concat("0");
  } else {
    gamma = gamma.concat("0");
    epsilon = epsilon.concat("1");
  }
}

console.log(parseInt(epsilon, 2) * parseInt(gamma, 2));