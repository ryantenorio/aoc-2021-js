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
const targetDay = 256;
let school = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
}
data.forEach(startingDay => {
  school[startingDay] = school[startingDay] + 1;
})
while(currentDay < targetDay) {
  let newFish = school[0];
  school[0] = school[1];
  school[1] = school[2];
  school[2] = school[3];
  school[3] = school[4];
  school[4] = school[5];
  school[5] = school[6];
  school[6] = school[7] + newFish;
  school[7] = school[8];
  school[8] = newFish;
  currentDay++;
}
console.log(school);
console.log(school[0] + school[1] + school[2] + school[3] + school[4] + school[5] + school[6] + school[7] + school[8]);
// let currentState = data.map(startingDaysUntilBreed => {
//   return new Lanternfish(startingDaysUntilBreed);
// });
// const targetDay = 256;
// while(currentDay < targetDay) {
//   let newFish = [];
//   currentState.forEach(fish => {
//     if(fish.incrementAndCheckShouldSpawn()) {
//       newFish.push(new Lanternfish(8));
//     }
//   });
//   currentState = currentState.concat(newFish);
//   currentDay++;
// }
// console.log(currentState.length);