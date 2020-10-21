const createPlayer = (name, shape) => ({
  getName() {
    return name;
  },
  getShape() {
    return shape;
  },
});

export default createPlayer;