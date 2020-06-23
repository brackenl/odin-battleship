import shipFactory from "../shipFactory/shipFactory";

const gameBoardFactory = () => {
  const obj = {
    grid: initialiseGrid(),
    ships: initialiseShips(),
    placeShip(length, xCoOrd, yCoOrd, orientation) {
      const valid = checkValidPlacement(
        this.grid,
        length,
        xCoOrd,
        yCoOrd,
        orientation
      );
      if (!valid) {
        // console.log("Please select a valid placement"); //  consider how to feedback to player
        return false;
      }
      const ship = shipFactory(length);

      let copyGrid = [...this.grid];
      let relGridInd = copyGrid.findIndex(
        (item) => item.xCoOrd === xCoOrd && item.yCoOrd === yCoOrd
      );

      if (orientation === "horizontal") {
        // place the boat horizontally on the grid + map out its hull locations
        for (let i = 0; i < ship.length; i++) {
          const relGridSquare = { ...copyGrid[relGridInd] };
          relGridSquare.placed = ship.name;
          relGridSquare.hullIndex = i;
          copyGrid.splice(relGridInd, 1, relGridSquare);
          relGridInd += 1;
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          // place the boat vertically on the grid + map out its hull locations
          const relGridSquare = { ...copyGrid[relGridInd] };
          relGridSquare.placed = ship.name;
          relGridSquare.hullIndex = i;
          copyGrid.splice(relGridInd, 1, relGridSquare);
          relGridInd += 10;
        }
      }

      this.grid = copyGrid;
      this.ships = [...this.ships, ship];
    },
    receiveAttack(xCoOrd, yCoOrd) {
      let copyGrid = [...this.grid];
      const relGridInd = copyGrid.findIndex(
        (item) => item.xCoOrd === xCoOrd && item.yCoOrd === yCoOrd
      );
      const relGridSquare = { ...copyGrid[relGridInd] };
      relGridSquare.attacked = true;
      copyGrid.splice(relGridInd, 1, relGridSquare); // TBD where placed

      if (relGridSquare.placed) {
        const relShipInd = this.ships.findIndex(
          (ship) => ship.name === relGridSquare.placed
        );
        this.ships[relShipInd].hit(relGridSquare.hullIndex);
      }
      this.grid = copyGrid;
    },
    allShipsSunk() {
      return this.ships.every((ship) => ship.sunk);
    },
    resetGame() {
      this.grid = initialiseGrid();
      this.ships = initialiseShips();
    },
  };

  function initialiseGrid() {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      const x = i % 10;
      const y = i < 10 ? 0 : Math.floor(i / 10);
      arr.push({ id: i, xCoOrd: x, yCoOrd: y });
    }
    return arr;
  }

  function initialiseShips() {
    const arr = [];
    return arr;
  }

  return obj;
};

const checkValidPlacement = (grid, length, xCoOrd, yCoOrd, orientation) => {
  let relGridInd = grid.findIndex(
    (item) => item.xCoOrd === xCoOrd && item.yCoOrd === yCoOrd
  );

  if (orientation === "horizontal") {
    // check that ship fits horizontally on the grid
    if (length + xCoOrd > 9) {
      return false;
    }
    for (let i = 0; i < length; i++) {
      const relGridSquare = { ...grid[relGridInd] };
      if (relGridSquare.placed) {
        return false;
      }
      relGridInd += 1;
    }
  } else {
    // check that ship fits vertically on the grid
    if (length + yCoOrd > 9) {
      return false;
    }
    for (let i = 0; i < length; i++) {
      const relGridSquare = { ...grid[relGridInd] };
      if (relGridSquare.placed) {
        return false;
      }
      relGridInd += 10;
    }
  }
  return true;
};

export default gameBoardFactory;
