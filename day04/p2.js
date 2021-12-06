const fs = require('fs');

function checkBoard(board, drawnNumbers) {
  for(let i = 0; i < 5; i++) {
    if (checkColumnOf(board, drawnNumbers, i) || checkRowOf(board, drawnNumbers, i)) {            
      return true;
    }
  }
  return false;
}

function checkColumnOf(board, drawnNumbers, columnNum) {
  const column = board.map(row => row[columnNum]);
  let matches = 0;
  column.forEach(val => {
    if(drawnNumbers.includes(val)) {
      matches++;
    }
  })
  if (matches == 5) {
    return true;
  }
  return false;
}

function checkRowOf(board, drawnNumbers, rowNum) {
  let matches = 0;
  board[rowNum].forEach(val => {
    if(drawnNumbers.includes(val)) {
      matches++;
    }
  });
  if (matches == 5) {
    return true;
  }
  return false;
}

function calculateWinningBoardScore(board, drawnNumbers) {
  // reduce board to just an array of numbies
  // get the delta between drawnNumbers and said array
  // do maths
  const rawNumbers = board.flat();    
  const filteredNumbers = rawNumbers.filter(num => {
    return !drawnNumbers.includes(num);
  });    
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let sum = 0;
  if(filteredNumbers.length != 0){
    sum = filteredNumbers.reduce(reducer);  
  }
  // console.log("drawn numbers:", drawnNumbers); 
  // console.log("last winning board:", board); 
  return sum * drawnNumbers[drawnNumbers.length-1];
}

function didBoardScoreAlready(idx, scoredBoards) {
  scoredBoards.forEach(scoredBoard => {     
    if(scoredBoard.index === idx) {      
      return true;
    }
  })
  return false;
}

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

// console.log(data);
const drawnNumbers = data[0].split(',').map(num=>parseInt(num, 10));
let boards = [];
let board = [];
data.slice(2).forEach(row => {  
  if (row === '') {
    boards.push(board);
    board = [];    
  } else {    
    board.push(row.trim().split(/\s+/).map(num => parseInt(num, 10)));
  }
})
boards.push(board);
let boardsInOrder = [];
let winningIndices = [];
for(let i = 0; i < drawnNumbers.length; i++) {  
  const currentDrawnNumbers = drawnNumbers.slice(0, i+1);
  for(let j = 0; j < boards.length; j++) {
    // if (!didBoardScoreAlready(j, boardsInOrder) && checkBoard(boards[j], currentDrawnNumbers)) {       
    if (!winningIndices.includes(j) && checkBoard(boards[j], currentDrawnNumbers)) {       
      console.log("WINNER", j);
      winningIndices.push(j);
      boardsInOrder.push({
        board: boards[j],
        numbersAtWin: currentDrawnNumbers,
        score: calculateWinningBoardScore(boards[j], currentDrawnNumbers),
        index: j
      });      
    }
  }
}
console.log(boardsInOrder);
// console.log(calculateWinningBoardScore(boardsInOrder[boardsInOrder.length-1].board, boardsInOrder[boardsInOrder.length-1].numbersAtWin));