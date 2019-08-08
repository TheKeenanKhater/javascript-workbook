'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Checker {
  constructor(color){
    if(color === 'white'){
      this.symbol = '○';
    }
    else{
      this.symbol = '●';
    }
    
  }

}

class Board {
  constructor() {
    this.grid = [];
    this.checkers = [];
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }

  //method lays out both player's checkers
  layoutCheckers() {
    this.layoutPlayer1();
    this.layoutPlayer2();
  }

  //method lays out player one's checkers
  layoutPlayer1() {
    // Layout the rows and column for the starting board for player 1
    for(let i = 5; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (i % 2 === 0) {
          if (j % 2 !== 0) {
            this.grid[i][j] = new Checker('black');
            this.checkers.push(this.grid[i][j]);

          }
        }
        else {
          if (j % 2 === 0) {
            this.grid[i][j] = new Checker('black');
            this.checkers.push(this.grid[i][j]);
          }
        }
      }
    }
  }

  //method lays out player one's checkers
  layoutPlayer2() {
    // Layout the rows and column for the starting board for player 2
    for(let i = 0; i < 3; i++) {
      for (let j = 0; j < 8; j++) {
        if (i % 2 === 0) {
          if (j % 2 !== 0) {
            this.grid[i][j] = new Checker('white');
            this.checkers.push(this.grid[i][j]);
          }
        }
        else {
          if (j % 2 === 0) {
            this.grid[i][j] = new Checker('white');
            this.checkers.push(this.grid[i][j]);
          }
        }
      }
    }
  }

  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }
}

class Game {
  constructor() {
    this.board = new Board();
  }

  //method for start of new game
  start() {
    this.board.createGrid();
    this.board.layoutCheckers();
  }

  //method deletes checkers from grid and checkers array with 
  //[row, col] as parameter
  killChecker(position){
    //assigns row and column of checker to var
    let positionRow = position[0];
    let positionCol = position[1];

    //assigns symbol of "killed" checker to var
    let symbol = this.board.grid[positionRow][positionCol].symbol;

    //loops through array
    for (let x in this.board.checkers){
      //if checker in checker array has same symbol as "killed" checker
      if (this.board.checkers[x].symbol === symbol){
        //assigns index of located checker
        let index = x;
        //deletes checker at index
        this.board.checkers.splice(index, 1);
        break;
      }
      else{
        break;
      }
    }
    //sets value on grid as null
    this.board.grid[positionRow][positionCol] = null;
  }

  //method to move checker on board
  moveChecker(start, end) {

    //assigns variables for row and col of start and end locations on grid
    let [startRow, startColumn] = start.split('');
    let [endRow, endColumn] = end.split('');
    //converts string inputs to integer
    startRow = parseInt(startRow);
    startColumn = parseInt(startColumn);
    endRow = parseInt(endRow);
    endColumn = parseInt(endColumn);
    //assigns value of ending checker location on grid to variable
    let endCell = this.board.grid[parseInt(endRow)][parseInt(endColumn)];

    //if the ending cell is empty
    if (!endCell){
      //if move is 1 row and 1 column away
      if(endRow === startRow-1 && (endColumn === startColumn+1 || endColumn === startColumn-1)){
        if(this.board.grid[startRow][startColumn].symbol === '●'){
          //reassign ending location to new symbol
          this.board.grid[endRow][endColumn] = {symbol: '●'};
          //reassign starting location to null
          this.board.grid[startRow][startColumn] = null;
          
        }
      }
      //if move is 1 row and 1 column away
      else if(endRow === startRow+1 && (endColumn === startColumn+1 || endColumn === startColumn-1)){
        if(this.board.grid[startRow][startColumn].symbol === '○'){
          //reassign ending location to new symbol
          this.board.grid[endRow][endColumn] = {symbol: '○'};
          //reassign starting location to null
          this.board.grid[startRow][startColumn] = null;
        }
      }
      //if move is 2 rows away
      else if(Math.abs(startRow - endRow) == 2){
        //row in the middle
        let killRow = (startRow + endRow)/2;
        //column in the middle
        let killCol = (startColumn + endColumn)/2;
        //position of checker to kill
        let killPosition = [killRow,killCol];
        //value of the end location on grid is set to old value
        this.board.grid[endRow][endColumn] = this.board.grid[startRow][startColumn];
        //killChecker method
        this.killChecker(killPosition);
        
      }
      else{
        //logged for invalid moves
        console.log("invalid move");
      }
    }
  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}