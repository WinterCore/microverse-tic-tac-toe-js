describe('Board', () => {
  document.body.innerHTML = `
    <div class="board-container">
        <h1 id="game-state"></h1>
        <div id="board">
            <div id="cell-0" data-cell="0" class="cell"></div>
            <div id="cell-1" data-cell="1" class="cell"></div>
            <div id="cell-2" data-cell="2" class="cell"></div>
            <div id="cell-3" data-cell="3" class="cell"></div>
            <div id="cell-4" data-cell="4" class="cell"></div>
            <div id="cell-5" data-cell="5" class="cell"></div>
            <div id="cell-6" data-cell="6" class="cell"></div>
            <div id="cell-7" data-cell="7" class="cell"></div>
            <div id="cell-8" data-cell="8" class="cell"></div>
        </div>
        <button id="play-again">Play again?</button>
    </div>
  `;

  /* eslint-disable global-require */

  // The require statement can't be moved to the top of the file because the board.js file relies
  // on certain html to be present in the document's body and we can only require the file after
  // that condition has been met
  const board = require('../src/board');

  /* eslint-enable global-require */

  describe('board.showBoard', () => {
    it('Should add a "display-block" class to the board container', () => {
      board.showBoard();

      const boardContainer = document.querySelector('.board-container');
      expect(boardContainer.classList.contains('display-block')).toBe(true);
    });
  });

  describe('board.onCellClick & board.clearClickListener', () => {
    const origAddEventListener = EventTarget.prototype.addEventListener;
    const origRemoveEventListener = EventTarget.prototype.removeEventListener;

    beforeEach(() => {
      EventTarget.prototype.addEventListener = jest.fn();
      EventTarget.prototype.removeEventListener = jest.fn();
    });

    afterEach(() => {
      EventTarget.prototype.addEventListener = origAddEventListener;
      EventTarget.prototype.removeEventListener = origRemoveEventListener;
    });

    it('Should call the provided callback when a cell is clicked', () => {
      const cb = jest.fn();

      board.onCellClick(cb);

      expect(EventTarget.prototype.addEventListener).toHaveBeenCalledTimes(9);
      expect(EventTarget.prototype.addEventListener).toHaveBeenLastCalledWith('click', cb);
    });

    it('Should clear the click event listener on cells when clearClickListener is called', () => {
      const cb = jest.fn();

      board.onCellClick(cb);

      board.clearClickListener();

      expect(EventTarget.prototype.removeEventListener).toHaveBeenCalledTimes(9);
      expect(EventTarget.prototype.removeEventListener).toHaveBeenLastCalledWith('click', cb);
    });
  });

  describe('board.fillPlayedCell', () => {
    it('Should fill a cell at a specific index with a specific shape', () => {
      board.clear();

      for (let i = 0; i < 9; i += 1) {
        board.fillPlayedCell(i, i);
      }

      for (let i = 0; i < 9; i += 1) {
        expect(document.querySelector(`#cell-${i}`).textContent).toBe(i.toString());
      }
    });

    it('Should return false when trying to fill an already filled cell', () => {
      const cell = 0;

      document.querySelector(`#cell-${cell}`).innerHTML = '15';

      expect(board.fillPlayedCell(cell, '50')).toBe(false);
    });

    it('Should return true when trying to fill an empty cell', () => {
      const cell = 0;
      board.clear();

      expect(board.fillPlayedCell(cell, '50')).toBe(true);
    });
  });

  describe('checkWinner', () => {
    it('Should return "win" when there\'s a winner (Test all winning combinations)', () => {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      const shape = 'a';

      winningCombinations.forEach((combination) => {
        board.clear();

        combination.forEach(cell => board.fillPlayedCell(cell, shape));

        expect(board.checkWinner(shape)).toBe('win');
      });
    });

    it('Should return "nowin" when there\'s no winner (The game is still in progress)', () => {
      const shape1 = 'a';
      const shape2 = 'b';

      board.clear();

      board.fillPlayedCell(1, shape1);
      board.fillPlayedCell(2, shape2);
      board.fillPlayedCell(5, shape1);

      expect(board.checkWinner(shape1)).toBe('nowin');
      expect(board.checkWinner(shape2)).toBe('nowin');
    });

    it('Should return "draw" when all the cells on the board are filled and there\'s no winner', () => {
      const shape1 = 'a';
      const shape2 = 'b';

      board.clear();

      board.fillPlayedCell(0, shape1);
      board.fillPlayedCell(1, shape1);
      board.fillPlayedCell(2, shape2);
      board.fillPlayedCell(3, shape2);
      board.fillPlayedCell(4, shape1);
      board.fillPlayedCell(5, shape1);
      board.fillPlayedCell(6, shape1);
      board.fillPlayedCell(7, shape2);
      board.fillPlayedCell(8, shape2);

      expect(board.checkWinner(shape1)).toBe('draw');
      expect(board.checkWinner(shape2)).toBe('draw');
    });
  });

  describe('board.updateGameStateDisplay', () => {
    it('Should update the game state div\'s text', () => {
      const text = 'hello';

      board.updateGameStateDisplay(text);

      expect(document.querySelector('#game-state').innerHTML).toBe(text);
    });
  });

  describe('board.clear', () => {
    it('Should clear the board on the user\'s screen', () => {
      for (let i = 0; i < 9; i += 1) {
        board.fillPlayedCell(i, i);
      }

      board.clear();

      for (let i = 0; i < 9; i += 1) {
        expect(document.querySelector(`#cell-${i}`).innerHTML).toHaveLength(0);
      }
    });

    it('Should clear the board internally', () => {
      const shape = 'a';
      board.clear();

      // Arrange a winner
      board.fillPlayedCell(0, shape);
      board.fillPlayedCell(1, shape);
      board.fillPlayedCell(2, shape);

      expect(board.checkWinner(shape)).toBe('win'); // There's a winner

      board.clear();

      expect(board.checkWinner(shape)).toBe('nowin'); // No winner after the board got cleared
    });
  });
});
