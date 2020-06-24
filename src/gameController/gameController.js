import { player, CPU, playerTurn } from "../players/players";
import gameBoardFactory from "../gameBoardFactory/gameBoardFactory";

const gameController = () => {
  const playerGameBoard = gameBoardFactory();
  const CPUGameBoard = gameBoardFactory();
  const player1 = player();
  const CPU1 = CPU();

  playerGameBoard.placeShip(2, 0, 0, "horizontal");
  playerGameBoard.placeShip(3, 0, 1, "horizontal");
  playerGameBoard.placeShip(4, 0, 2, "horizontal");
  playerGameBoard.placeShip(5, 0, 3, "horizontal");

  CPUGameBoard.placeShip(2, 0, 0, "vertical");
  CPUGameBoard.placeShip(3, 1, 0, "vertical");
  CPUGameBoard.placeShip(4, 2, 0, "vertical");
  CPUGameBoard.placeShip(5, 3, 0, "vertical");

  return { player1, CPU1, playerGameBoard, CPUGameBoard };
};

export default gameController;
