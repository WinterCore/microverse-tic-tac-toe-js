import * as infoForm from './info-form-display';
import * as gameboard from './board';
import createPlayer from './player';

const game = (() => {
  const $playAgain = document.querySelector('#play-again');
  let player1 = createPlayer('Test 1', 'X');
  let player2 = createPlayer('Test 2', 'O');
  let currentPlayer = player1;

  const showPlayAgain = () => {
    $playAgain.classList.add('display-block');
  };

  function handleTurn(cell) {
    if (!gameboard.fillPlayedCell(cell, currentPlayer.getShape())) return;

    switch (gameboard.checkWinner(currentPlayer.getShape())) {
      case 'win':
        gameboard.updateGameStateDisplay(`${currentPlayer.getName()} has won.`);
        showPlayAgain();
        gameboard.clearClickListener();
        return;
      case 'draw':
        gameboard.updateGameStateDisplay('It\'s a draw.');
        showPlayAgain();
        gameboard.clearClickListener();
        return;
      default:
        break;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    gameboard.updateGameStateDisplay(`${currentPlayer.getName()}'s turn.`);
  }

  async function init() {
    let data = null;
    infoForm.showPlayerForm('Player 1 details');
    data = await infoForm.getPlayerFormData();
    player1 = createPlayer(data.name, 'X');
    infoForm.showPlayerForm('Player 2 details');
    data = await infoForm.getPlayerFormData();
    player2 = createPlayer(data.name, 'O');
    infoForm.hidePlayerForm();
    currentPlayer = player1;

    gameboard.showBoard();
    gameboard.onCellClick((e) => handleTurn(+e.target.dataset.cell));
    gameboard.updateGameStateDisplay(`${currentPlayer.getName()}'s turn.`);
  }

  $playAgain.addEventListener('click', () => {
    gameboard.clear();
    gameboard.onCellClick((e) => handleTurn(+e.target.dataset.cell));
    gameboard.updateGameStateDisplay(`${currentPlayer.getName()}'s turn.`);
  });

  return {
    init,
  };
})();

game.init().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
