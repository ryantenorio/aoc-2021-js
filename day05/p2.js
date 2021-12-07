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

function Coordinate(x, y) {
  this.x = x;
  this.y = y;    
}

function coordinateAsString(coordinate) {
  return coordinate.x + ',' + coordinate.y;
}

function pointsBetween(c1, c2) {
  let line = [];
  const xDelta = c2.x - c1.x;
  const yDelta = c2.y - c1.y;
  let xMod = 1;
  let yMod = 1;
  if(xDelta < 0) {
    xMod = -1;
  }
  if(yDelta < 0) {
    yMod = -1;
  }
  if(Math.abs(xDelta) == Math.abs(yDelta)) {        
    let currX = c1.x;
    let currY = c1.y;
    while(currX != c2.x && currY != c2.y) {
      line.push(new Coordinate(currX, currY));
      currX += xMod;
      currY += yMod;
    }
    return line;
  }
  // not a 45 degree diagnoal but both still changed
  if(xDelta != 0 && yDelta != 0) {
    return line;
  }
  if (xDelta > 0) {
    // c2 is higher than c1
    for(let i = c1.x; i <= c2.x; i++){      
      line.push(new Coordinate(i, c1.y));
    }
  }
  if (xDelta < 0) {
    //c2 is lower than c1
    for(let i = c2.x; i <= c1.x; i++){      
      line.push(new Coordinate(i, c1.y));
    }
  }
  if (yDelta > 0) {
    // c2 is higher than c1
    for(let i = c1.y; i <= c2.y; i++){      
      line.push(new Coordinate(c1.x, i));
    }
  }
  if (yDelta < 0) {
    //c2 is lower than c1
    for(let i = c2.y; i <= c1.y; i++){      
      line.push(new Coordinate(c1.x, i));
    }
  }  
  return line;
}

function Vent(startingX, startingY, endingX, endingY, id) {
  this.startingPoint = new Coordinate(startingX, startingY);
  this.endingPoint = new Coordinate(endingX, endingY);
  this.id = id;
}

let vents = []

for(let i = 0; i < data.length; i++) {
  const coordinates = data[i].split(' -> ');
  const start = coordinates[0].split(',').map(val => parseInt(val));  
  const end = coordinates[1].split(',').map(val => parseInt(val));
  let vent = new Vent(start[0], start[1], end[0], end[1], i);  
  vents.push(vent);
}

// K: Coordinate, V: count of vents at that location
let coordMap = new Map();
vents.forEach(vent => {
  const lines = pointsBetween(vent.startingPoint, vent.endingPoint)  
  lines.forEach(line => {
    const hash = coordinateAsString(line)
    if (coordMap.has(hash)) {
      coordMap.set(hash, coordMap.get(hash) + 1);
    } else {
      coordMap.set(hash, 1);
    }
  })
})

let answer = 0;
coordMap.forEach((value) => {
  if(value > 1) {
    answer++;
  }
})

console.log(answer);
