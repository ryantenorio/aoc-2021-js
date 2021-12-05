const fs = require('fs');

const data = fs
  .readFileSync('input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n')
  .map((num) => parseInt(num, 10));

console.log(data);

let lastDepth = 0;
let timesIncreased = 0;
data.forEach(currentDepth => {
  if (lastDepth != 0) {
    if (currentDepth > lastDepth) {      
      timesIncreased++;
    }
  }
  lastDepth = currentDepth;  
})
console.log(timesIncreased);