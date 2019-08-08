'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

//function moves numbers to different stacks
//takes in the starting stack and the ending stack
function movePiece(startStack, endStack) {

  //declares starting stack as an array
  let startArr = stacks[startStack];
  //declares ending stack as an array
  let endArr = stacks[endStack];

  //adds last item in the starting array to the end of the ending array
  endArr.push(startArr.pop());

}

//function checks if move is legal
function isLegal(startStack, endStack) {
  //declares starting stack as an array
  let startArr = stacks[startStack];
  //declares ending stack as an array
  let endArr = stacks[endStack];

  //checks to see if the starting stack has numbers
  if (startArr.length === 0){
    console.log ("choose from a valid stack");
  }

  //checks if the starting and ending stack are the same
  else if(startStack === endStack){
    console.log("Not a valid move");
    return false;
  }

  //checks if the last number in the starting stack is bigger than the last number on the ending stack
  else if (startArr[startArr.length - 1] > endArr[endArr.length - 1]){
    console.log("Not a valid move");
    return false;
  }

  //all other moves allowed
  else{
    return true;
  }
}

//checks if there is a winner
function checkForWin() {

  //declares winning string
  let win = "4,3,2,1";
  //converts b stack into a string
  let bString = stacks.b.toString();
  //converts c stack into a string
  let cString = stacks.c.toString();
  
  //checks if the string of stack b is the same as win string
  if (bString === win){
    return true;
  }

  //checks if the string of stack c is the same as win string
  else if(cString === win){
    return true;
  }

  
  else{
    return false;
  }

}


function towersOfHanoi(startStack, endStack) {

  //if move is legal, call movePiece() function
  if(isLegal(startStack, endStack)){
    movePiece(startStack,endStack);
  }

  //checks for win after every move
  checkForWin();

}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3],
        b: [1],
        c: [2]
      };
      assert.equal(isLegal('a', 'b'), false);
      assert.equal(isLegal('a', 'c'), false);
      assert.equal(isLegal('c', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
      stacks = { a: [4,3,2,1], b: [], c:[]};
      assert.equal(checkForWin(), false);
      stacks = { a: [], b: [], c:[4,3,2,1]};
      assert.equal(checkForWin(), true);
    });
  });

  
} else {

  getPrompt();

}