import { player, CPU, playerTurn } from "./players";
import gameBoardFactory from "../gameBoardFactory/gameBoardFactory";

describe("The player function", () => {
  const playerGameBoard = gameBoardFactory();
  const CPUGameBoard = gameBoardFactory();
  const player1 = player();
  const CPU1 = CPU();

  it("allows the player to launch an attack against the CPU", () => {
    player1.fireMissile(CPUGameBoard, 0, 0);
    player1.fireMissile(CPUGameBoard, 2, 0);
    expect(CPUGameBoard.grid[0].attacked).toEqual(true);
    expect(CPUGameBoard.grid[1].attacked).toBeFalsy;
    expect(CPUGameBoard.grid[2].attacked).toEqual(true);
  });

  it("allows the CPU to launch an attack against the player based on random co-ordinates", () => {
    CPU1.fireMissile(playerGameBoard);
    CPU1.fireMissile(playerGameBoard);
    const attackedGridSquares = playerGameBoard.grid.filter(
      (grid) => grid.attacked
    );
    expect(attackedGridSquares).toHaveLength(2);
  });

  it("switches turns after an attack has been made", () => {
    expect(playerTurn).toBe(true);
    player1.fireMissile(CPUGameBoard, 0, 0);
    expect(playerTurn).toBe(false);
    CPU1.fireMissile(playerGameBoard);
    expect(playerTurn).toBe(true);
  });
});
