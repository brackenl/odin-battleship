const identifyShip = (length) => {
  switch (length) {
    case 2:
      return "Patrol Boat";
    case 3:
      return "Destroyer";
    case 4:
      return "Battleship";
    case 5:
      return "Carrier";
    default:
      return "Unknown";
  }
};

const shipFactory = (length) => {
  return {
    name: identifyShip(length),
    length: length,
    hull: Array(length).fill(false),
    sunk: false,
    hit(index) {
      this.hull[index] = true;
      this.isSunk(); // consider whether this should be baked in to hit method
    },
    isSunk() {
      this.hull.every((item) => item === true) ? (this.sunk = true) : null;
    },
  };
};

export default shipFactory;
