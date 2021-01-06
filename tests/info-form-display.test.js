describe('infoFormDisplay', () => {
  document.body.innerHTML = `
    <form id="player">
        <h1></h1>
        <div class="input-group">
            <input type="text" id="player_name" placeholder="Your Name" required />
        </div>
        <button>Save</button>
    </form>
  `;

  /* eslint-disable global-require */

  // The require statement can't be moved to the top of the file because the board.js file relies
  // on certain html to be present in the document's body and we can only require the file after
  // that condition has been met
  const infoFormDisplay = require('../src/info-form-display');

  /* eslint-enable global-require */

  const playerForm = document.querySelector('#player');

  describe('infoFormDisplay.showPlayerForm', () => {
    it('Shows the form (adds display-block) and sets the content of it\'s heading', () => {
      const text = 'hello world';
      infoFormDisplay.showPlayerForm(text);

      expect(playerForm.querySelector('h1').innerHTML).toBe(text);
      expect(playerForm.classList.contains('display-block')).toBe(true);
    });
  });

  describe('infoFormDisplay.hidePlayerForm', () => {
    it('Hides the player form (removes display-block and adds display-none)', () => {
      infoFormDisplay.hidePlayerForm();

      expect(playerForm.classList.contains('display-block')).toBe(false);
      expect(playerForm.classList.contains('display-none')).toBe(true);
    });
  });

  describe('infoFormDisplay.getPlayerFormData', () => {
    it('Promps the user for their data and returns it upon submission & clears the form inputs', () => {
      const name = 'potato123';
      const nameInput = playerForm.querySelector('#player_name');
      nameInput.value = name;

      infoFormDisplay.getPlayerFormData()
        .then(data => {
          expect(data).toStrictEqual({ name });
          expect(nameInput.value).toHaveLength(0);
        });

      playerForm.submit();
    });
  });
});
