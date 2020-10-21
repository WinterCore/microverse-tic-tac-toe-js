const $form = document.querySelector('#player');

const showPlayerForm = (heading) => {
  $form.querySelector('h1').innerHTML = heading;
  $form.classList.add('display-block');
};

const hidePlayerForm = () => {
  $form.classList.remove('display-block');
  $form.classList.add('display-none');
};

const getPlayerFormData = () => new Promise((resolve) => {
  function onSubmit(e) {
    e.preventDefault();
    const $name = $form.querySelector('#player_name');
    resolve({
      name: $name.value,
    });
    $name.value = '';
    $form.removeEventListener('submit', onSubmit);
  }

  $form.addEventListener('submit', onSubmit);
});

export {
  showPlayerForm,
  getPlayerFormData,
  hidePlayerForm,
};