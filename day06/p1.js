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
  .split(',')
  .map(num => parseInt(num));

console.log(data);

class Lanternfish {
  constructor(daysUntilBreeds) {
    this.daysUntilBreeds = parseInt(daysUntilBreeds);
  }
  incrementAndCheckShouldSpawn() {
    if(this.daysUntilBreeds == 0) {
      this.daysUntilBreeds = 6;
      return true;
    } else {
      this.daysUntilBreeds = this.daysUntilBreeds - 1;
      return false;
    }
  }
}

// create initial state
let currentDay = 0;
let currentState = data.map(startingDaysUntilBreed => {
  return new Lanternfish(startingDaysUntilBreed);
});
const targetDay = 80;
while(currentDay < targetDay) {
  let newFish = [];
  currentState.forEach(fish => {
    if(fish.incrementAndCheckShouldSpawn()) {
      newFish.push(new Lanternfish(8));
    }
  });
  currentState = currentState.concat(newFish);
  currentDay++;
}
console.log(currentState.length);