const box = document.querySelectorAll(".box");

const restartButton = document.querySelector("#restartbtn");

const status = document.querySelector("#status");

const playerDisplay = document.querySelector("#display_player");
let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "x";

let isGameActive = true;

const PLAYERO_WON = 'PLAYERO_WON';
const PLAYERX_WON = 'PLAYERX_WON';
const DRAW = 'DRAW';
const WinningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const isValid = (box) => {
    if (box.innerHTML === 'x' || box.innerHTML === 'o') {
        return false;
    }
    return true;
}

const updateBoard = (index) => {
    board[index] = currentPlayer;
}

const change_player = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    playerDisplay.innerHTML = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

const statu = (type) => {
    switch (type) {
        case PLAYERO_WON:
            status.innerHTML = 'Player O has won';
            break;
        case PLAYERX_WON:
            status.innerHTML = 'Player X has won';
            break;
        case DRAW:
            status.innerHTML = 'Draw';
            break;
    }
}

const resultEvaluator = () => {
    let roundWon = false;
    for (let i = 0; i < 8; i++) {
        let WinCondition = WinningCondition[i];
        const a = board[WinCondition[0]];
        const b = board[WinCondition[1]];
        const c = board[WinCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statu(currentPlayer === 'x' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
      
        return;
    }
    if (!board.includes("")) {
        statu(DRAW);
    }
}

const playerAction = (box, index) => {
    if (isValid(box) && isGameActive) {
        box.innerHTML = currentPlayer; 
        updateBoard(index); 
        
        resultEvaluator();
       
        change_player();
    }
}

box.forEach((box, index) => {
    box.addEventListener("click", function() {
        playerAction(box, index);
    });
});

const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    if (currentPlayer === 'o'){
        change_player();
    }
    box.forEach((box) => {
        box.innerHTML = '';
    });
    status.innerHTML='';
   
}

document.querySelector('button').addEventListener("click", function() {
    resetBoard();
});