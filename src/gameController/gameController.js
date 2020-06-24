import { player, CPU, playerTurn } from "../players/players";
import gameBoardFactory from "../gameBoardFactory/gameBoardFactory";

const gameController = () => {
  const playerGameBoard = gameBoardFactory();
  const CPUGameBoard = gameBoardFactory();
  const player1 = player();
  const CPU1 = CPU();

  const placeCPUShips = () => {
    const randOrientation = () => {
      const coinFlip = Math.floor(Math.random() * 2);
      if (coinFlip === 1) {
        return "horizontal";
      } else {
        return "vertical";
      }
    };
    const randX = () => Math.floor(Math.random() * 10);
    const randY = () => Math.floor(Math.random() * 10);

    for (let i = 2; i < 6; i++) {
      while (CPUGameBoard.ships.findIndex((ship) => ship.length === i) === -1) {
        CPUGameBoard.placeShip(i, randX(), randY(), randOrientation());
      }
    }
  };

  placeCPUShips();

  return { player1, CPU1, playerGameBoard, CPUGameBoard };
};

export default gameController;
