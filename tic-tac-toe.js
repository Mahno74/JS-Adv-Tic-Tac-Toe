const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const restartButton = document.getElementById('restartButton');
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.getElementById(
  'data-winning-message-text'
);
const winningMessageElement = document.getElementById('winningMessage');

var oTurn;
startGame();
restartButton.addEventListener('click', startGame);
function startGame() {
  oTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS, O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true }); //можно нажать подряд только один раз
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerHTML = `Draw!`;
  } else {
    winningMessageTextElement.innerHTML = `${oTurn ? 'O`s' : 'X`s'} Win!`;
  }
  winningMessageElement.classList.add('show');
}
function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}
//Отрисовываем ход
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
//swap turn
function swapTurns() {
  oTurn = !oTurn;
}
function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
function setBoardHoverClass() {
  board.classList.remove(X_CLASS, O_CLASS);
  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
