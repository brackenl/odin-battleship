import shipFactory from "./shipFactory";

describe("The ship factory function returns an object which ", () => {
  const ship1 = shipFactory(3);
  const ship2 = shipFactory(4);

  it("is named based on its length", () => {
    expect(ship1.name).toEqual("Destroyer");
    expect(ship2.name).toEqual("Battleship");
  });

  it("includes a length property", () => {
    expect(ship1.length).toEqual(3);
    expect(ship2.length).toEqual(4);
  });

  it("shows where the ship has been hit", () => {
    /* reconsider this test when hit functionality applied */
    expect(ship1.hull).toEqual([false, false, false]);
    expect(ship2.hull).toEqual([false, false, false, false]);
  });

  it("shows whether the ship has been sunk", () => {
    /* reconsider this test when hit functionality applied */
    expect(ship1.sunk).toEqual(false);
    expect(ship2.sunk).toEqual(false);
  });

  it("has a hit() method that takes a number and then marks that position as ‘hit’", () => {
    ship1.hit(0);
    ship2.hit(2);
    expect(ship1.hull).toEqual([true, false, false]);
    expect(ship2.hull).toEqual([false, false, true, false]);
  });

  it("has an isSunk() method that calculates whether the ship is sunk based on their length and whether all of their positions are ‘hit’", () => {
    ship1.hit(0);
    ship2.hit(0);
    ship2.hit(1);
    ship2.hit(2);
    ship2.hit(3);
    expect(ship1.sunk).toEqual(false);
    expect(ship2.sunk).toEqual(true);
  });
});
