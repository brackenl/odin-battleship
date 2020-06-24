export let playerTurn = true;

const setTurn = () => (playerTurn = !playerTurn);

export const player = () => {
  const playerObj = {
    fireMissile(gameBoard, xCoOrd, yCoOrd) {
      gameBoard.receiveAttack(xCoOrd, yCoOrd);
      setTurn();
    },
  };
  return playerObj;
};

export const CPU = () => {
  const CPUObj = {
    fireMissile(gameBoard) {
      gameBoard.receiveAttack(...getRandomCoOrds(gameBoard));
      setTurn();
    },
  };

  const getRandomCoOrds = (gameBoard) => {
    const notAttackedGrids = gameBoard.grid.filter(
      (gridSquare) => !gridSquare.attacked
    );
    const randomInd = Math.floor(Math.random() * notAttackedGrids.length);
    return [
      notAttackedGrids[randomInd].xCoOrd,
      notAttackedGrids[randomInd].yCoOrd,
    ];
  };
  return CPUObj;
};
