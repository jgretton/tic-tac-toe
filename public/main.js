//initialises socket io
const socket = io();

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

const x_class = 'x';
const o_class = 'o';

let oTurn;

const screen_text = document.querySelector('[screen-text]');
const screen_text_element = document.getElementById('message-screen');

const restart_btn = document.getElementById('button');

const win_conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

button.addEventListener('click', startGame);

startGame();

function startGame(){
    oTurn = false;
    cellElements.forEach( cell => {
        cell.classList.remove(x_class);
        cell.classList.remove(o_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true}) 
        // { once: true} means it will only ever fire the event listener once.
    })

    setBoardHoverClass();

    screen_text_element.classList.remove('show');

}


function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? o_class : x_class;
    placeMark(cell, currentClass);

    //Check win
    if(checkWin(currentClass)){
        endGame(false);
    } else if(isDraw()){
        endGame(true);
    }else{
        //switch turns
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw){
    if( draw ){
        screen_text.innerText = "Draw!";
    } else{
        screen_text.innerText = `${oTurn ? "O's" : "X's"} Wins! `;
    }
    screen_text_element.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class);
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    oTurn = !oTurn;
}

function setBoardHoverClass(){

    board.classList.remove(x_class);
    board.classList.remove(o_class);

    if (oTurn){
        board.classList.add(o_class);
    } else {
        board.classList.add(x_class);
    }

}

function checkWin(currentClass){
    return win_conditions.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


socket.on('message', function(data){
    console.log(data);
});