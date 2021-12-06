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

const length = data[0].length;
let possibleOxygenValues = data;
let possibleC02Values = data;
let oxygen = "";
let C02 = "";
for (let i = 0; i < length; i++) {
  let oxygenOnes = 0
  let oxygenZeroes = 0;
  let C02Ones = 0;
  let C02Zeroes = 0;
  possibleOxygenValues.forEach(number => {
    if (number.charAt(i) === "0") {
      oxygenZeroes++;
    } else {
      oxygenOnes++;
    }
  });
  possibleC02Values.forEach(number => {
    if (number.charAt(i) === "0") {
      C02Zeroes++;
    } else {
      C02Ones++;
    }
  });
  if (oxygenOnes >= oxygenZeroes) {
    possibleOxygenValues = possibleOxygenValues.filter(value => {
      return value.charAt(i) === "1";
    });
  } else {
    possibleOxygenValues = possibleOxygenValues.filter(value => {
      return value.charAt(i) === "0";
    });
  }
  if (C02Zeroes <= C02Ones) {
    possibleC02Values = possibleC02Values.filter(value => {
      return value.charAt(i) === "0";
    });
  } else {
    possibleC02Values = possibleC02Values.filter(value => {
      return value.charAt(i) === "1";
    });
  }
  if (possibleOxygenValues.length === 1 && oxygen === "") {
    oxygen = possibleOxygenValues[0];    
  }
  if (possibleC02Values.length === 1 && C02 === "") {
    C02 = possibleC02Values[0];    
  }
} 

console.log(parseInt(oxygen, 2));
console.log(parseInt(C02, 2));
console.log(parseInt(oxygen, 2) * parseInt(C02, 2));