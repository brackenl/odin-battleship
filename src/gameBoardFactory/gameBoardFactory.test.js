import gameBoardFactory from "./gameBoardFactory";

const obj = gameBoardFactory();

describe("the gameboard factory function", () => {
  beforeEach(() => {
    obj.resetGame();
  });

  it("returns a 10 x 10 grid", () => {
    expect(obj.grid).toHaveLength(100);
  });

  it("should reject an attempt to place a ship off the board", () => {
    const valid1 = obj.placeShip(5, 7, 0, "horizontal");
    const valid2 = obj.placeShip(5, 0, 5, "vertical");
    expect(valid1).toEqual(false);
    expect(valid2).toEqual(false);
  });

  it("should reject an attempt to place a ship on top of an existing ship", () => {
    const valid1 = obj.placeShip(5, 0, 0, "horizontal");
    const valid2 = obj.placeShip(5, 0, 0, "vertical");
    expect(valid1).toEqual(undefined);
    expect(valid2).toEqual(false);
  });

  it("should be able to place ships at specific coordinates by calling the ship factory function", () => {
    // horizontal placement
    obj.placeShip(3, 6, 9, "horizontal");
    expect(obj.grid[96]).toMatchObject({
      id: 96,
      xCoOrd: 6,
      yCoOrd: 9,
      placed: "Destroyer",
      hullIndex: 0,
    });
    expect(obj.grid[98]).toMatchObject({
      id: 98,
      xCoOrd: 8,
      yCoOrd: 9,
      placed: "Destroyer",
      hullIndex: 2,
    });

    // vertical placement
    obj.placeShip(5, 9, 2, "vertical");
    expect(obj.grid[29]).toMatchObject({
      id: 29,
      xCoOrd: 9,
      yCoOrd: 2,
      placed: "Carrier",
      hullIndex: 0,
    });
    expect(obj.grid[69]).toMatchObject({
      id: 69,
      xCoOrd: 9,
      yCoOrd: 6,
      placed: "Carrier",
      hullIndex: 4,
    });
  });

  it("should reject an invalid placement of a ship", () => {
    const valid1 = obj.placeShip(5, 7, 0, "horizontal");
    expect(valid1).toEqual(false);
    const valid2 = obj.placeShip(5, 0, 5, "vertical");
    expect(valid2).toEqual(false);
  });

  it("should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot", () => {
    obj.placeShip(3, 2, 5, "horizontal");
    obj.receiveAttack(2, 5);
    obj.receiveAttack(4, 5);
    expect(obj.grid[52]).toMatchObject({
      id: 52,
      xCoOrd: 2,
      yCoOrd: 5,
      placed: "Destroyer",
      hullIndex: 0,
      attacked: true,
    });
    expect(obj.ships[0].hull).toEqual([true, false, true]);
  });

  it("should be able to report whether or not all of its ships have been sunk", () => {
    obj.placeShip(3, 5, 2, "horizontal");
    obj.receiveAttack(5, 2);
    obj.receiveAttack(6, 2);
    obj.receiveAttack(7, 2);
    expect(obj.allShipsSunk()).toEqual(true);
  });
});
