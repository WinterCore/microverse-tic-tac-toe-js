let gameCells = ['', '', '', '', '', '', '', '', ''];
const $boardDiv = document.querySelector('.board-container');
const $boardCells = $boardDiv.querySelectorAll('.cell');
const $gameStateDiv = document.querySelector('#game-state');

let clickCallback;

const fillPlayedCell = (index, shape) => {
  if (gameCells[index] === '') {
    gameCells[index] = shape;
    $boardDiv.querySelector(`#cell-${index}`).innerHTML = shape;
    return true;
  }
  return false;
};

const checkWinner = (shape) => {
  const winningCells = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const playerBoard = [];

  for (let i = 0; i < gameCells.length; i += 1) {
    if (gameCells[i] === shape) {
      playerBoard.push(i);
    }
  }

  for (let i = 0; i < winningCells.length; i += 1) {
    const cells = gameCells;
    if (winningCells[i].every(index => cells[index] === shape)) return 'win';
  }

  for (let i = 0; i < gameCells.length; i += 1) {
    if (gameCells[i] === '') {
      return 'nowin';
    }
  }

  return 'draw';
};

const showBoard = () => {
  $boardDiv.classList.add('display-block');
};

const updateGameStateDisplay = (str) => {
  $gameStateDiv.innerHTML = str;
};

const onCellClick = (cb) => {
  clickCallback = cb;
  $boardCells.forEach((cell) => {
    cell.addEventListener('click', cb);
  });
};

const clearClickListener = () => {
  $boardCells.forEach((cell) => {
    cell.removeEventListener('click', clickCallback);
  });
};

const clear = () => {
  $boardCells.forEach((div) => {
    div.innerHTML = '';
  });
  gameCells = ['', '', '', '', '', '', '', '', ''];
};

export {
  showBoard,
  onCellClick,
  fillPlayedCell,
  checkWinner,
  updateGameStateDisplay,
  clearClickListener,
  clear,
};
