
const createPlayer = (name, shape) => ({
    getName() {
        return name;
    },
    getShape() {
        return shape;
    }
});

const display = (() => {
    const $form = document.querySelector('#player');

    const showPlayerForm = (heading) => {
        $form.querySelector('h1').innerHTML = heading;
        $form.style.display = 'block';
    };

    const hidePlayerForm = () => {
        $form.style.display = 'none';
    };

    const getPlayerFormData = () => {
        return new Promise((resolve) => {
            function onSubmit(e) {
                e.preventDefault();
                const $name = $form.querySelector('#player_name');
                resolve({
                    name: $name.value
                });
                $name.value = '';
                $form.removeEventListener('submit', onSubmit);
            }

            $form.addEventListener('submit', onSubmit);
        });
    };


    return {
        showPlayerForm,
        getPlayerFormData,
        hidePlayerForm
    };
})();

const gameboard = (() => {

    let gameCells = ["", "", "", "", "", "", "", "", ""];
    const $boardDiv = document.getElementById('board');
    const $boardCells = $boardDiv.querySelectorAll('.cell');
    const $gameStateDiv = document.querySelector('#game-state');

    let clickCallback;

    const getGameCells = () => {
        return gameCells;
    }

    const fillPlayedCell = (index, shape) => {
        if (gameCells[index] === "") {
            gameCells[index] = shape;
            $boardDiv.querySelector(`#cell-${index}`).innerHTML = shape;
            return true;
        } else {
            return false;
        }
    };

    const checkWinner = (shape) => {
        const winningCells = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        const playerBoard = [];

        for (let i=0; i<gameCells.length; i++) {
            if (gameCells[i] === shape) {
                playerBoard.push(i);
            }
        }

        for (let item of winningCells) {
            if (item.every(index => gameCells[index] === shape))
                return 'win';
        }

        for (let i=0; i<gameCells.length; i++) {
            if (gameCells[i] === "") {
                return 'nowin'
            }
        }

        return 'draw';
    }

    const showBoard = () => $boardDiv.style.display = 'grid';
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
        $boardCells.forEach((div) => div.innerHTML = '');
        gameCells = ["", "", "", "", "", "", "", "", ""];
    };


    return {
        showBoard,
        onCellClick,
        fillPlayedCell,
        checkWinner,
        updateGameStateDisplay,
        clearClickListener,
        clear
    };
})();

const game = (() => {
    const $playAgain = document.querySelector('#play-again');
    let player1 = createPlayer('Test 1', 'X'),
        player2 = createPlayer('Test 2', 'O'),
        currentPlayer = player1;

    const showPlayAgain = () => {
        $playAgain.style.display ='block';
    }

    function handleTurn(cell) {
        if (!gameboard.fillPlayedCell(cell, currentPlayer.getShape())) return;


        switch (gameboard.checkWinner(currentPlayer.getShape())) {
            case 'win':
                gameboard.updateGameStateDisplay(`${currentPlayer.getName()} has won.`);
                showPlayAgain();
                gameboard.clearClickListener();
                return;
            case 'draw':
                gameboard.updateGameStateDisplay(`It's a draw.`);
                showPlayAgain();
                gameboard.clearClickListener();
                return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        gameboard.updateGameStateDisplay(`${currentPlayer.getName()}'s turn.`);
    }

    async function init() {
        // let data = null;
        // display.showPlayerForm('Player 1 details');
        // data = await display.getPlayerFormData();
        // player1 = createPlayer(data.name, 'X');
        // display.showPlayerForm('Player 2 details');
        // data = await display.getPlayerFormData();
        // player2 = createPlayer(data.name, 'O');
        // display.hidePlayerForm();

        gameboard.showBoard();
            gameboard.onCellClick((e) => handleTurn(+e.target.dataset.cell));
            gameboard.updateGameStateDisplay(`${currentPlayer.getName()}'s turn.`);
    }

    $playAgain.addEventListener("click", function (){
        gameboard.clear();        
        gameboard.onCellClick((e) => handleTurn(+e.target.dataset.cell));
        gameboard.updateGameStateDisplay(`${currentPlayer.getName()}'s turn.`);
    });

    return {
        init
    };
})();

game.init().catch(console.log);
