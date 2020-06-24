import gameController from "./gameController";

describe("The gameController function", () => {
  const { player1, CPU1, playerGameBoard, CPUGameBoard } = gameController();

  it("generates 5 ships for each player", () => {
    expect(playerGameBoard.ships).toHaveLength(4);
    expect(CPUGameBoard.ships).toHaveLength(4);
  });
});
