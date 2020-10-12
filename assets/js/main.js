
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
    let board = Array.from({ length: 9 }),
        player1 = null,
        player2 = null;



    async function init() {
        board = Array.from({ length: 9 });

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

game.init().catch(console.log);