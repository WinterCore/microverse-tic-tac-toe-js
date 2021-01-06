import createPlayer from '../src/player';

describe('createPlayer', () => {
  const name = 'hello';
  const shape = 'world';

  it('The name of the player is returned when getName is called', () => {
    const player = createPlayer(name, shape);

    expect(player.getName()).toEqual(name);
  });

  it('The shape of the player is returned when getShape is called', () => {
    const player = createPlayer(name, shape);

    expect(player.getShape()).toEqual(shape);
  });
});
