
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

const game = (() => {
    // let board = Array.from({ length: 9 }),
        player1 = null,
        player2 = null;



    async function init() {
        // board = Array.from({ length: 9 });

        let data = null;
        display.showPlayerForm('Player 1 details');
        data = await display.getPlayerFormData();
        player1 = createPlayer(data.name, 'X');
        display.showPlayerForm('Player 2 details');
        data = await display.getPlayerFormData();
        player2 = createPlayer(data.name, 'O');
        display.hidePlayerForm();
    }

    return {
        init
    };
})();

const gameboard = (() => {

    const gameCells = ["", "", "", "", "", "", "", "", ""];

    const getGameCells = () => {
        return gameCells;
    }

    const fillPlayedCell = (index) => {
        if (gameCells[index] === "") {
            gameCells[index] = getCurrentPlayer().getShape();
            return true;
        }
        else { 
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

    const displayBoard = (() => {
        const boardDiv = document.getElementById('#board');
    
    
    
        return {
            showPlayerForm,
            getPlayerFormData,
            hidePlayerForm
        };


})();

game.init().catch(console.log);