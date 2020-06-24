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
    hitLastTime: false,
    lastCoOrds: null,
    fireMissile(gameBoard) {
      let x;
      let y;
      if (this.hitLastTime) {
        [x, y] = getSimilarCoOrds(this.lastCoOrds);
      } else {
        [x, y] = getRandomCoOrds(gameBoard);
      }

      const targetInd = gameBoard.grid.findIndex(
        (gridSquare) => gridSquare.xCoOrd === x && gridSquare.yCoOrd === y
      );
      this.hitLastTime =
        gameBoard.grid[targetInd].placed && !gameBoard.grid[targetInd].attacked
          ? true
          : false;
      gameBoard.receiveAttack(x, y);

      this.lastCoOrds = [x, y];
      setTurn();
    },
  };

  return CPUObj;
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

const getSimilarCoOrds = (prevCoOrds) => {
  let [x, y] = prevCoOrds;
  if (coinFlip()) {
    x = x > 4 ? x - 1 : x + 1;
  } else {
    y = y > 4 ? y - 1 : y + 1;
  }
  return [x, y];
};

const coinFlip = () => {
  const coin = Math.floor(Math.random() * 2);
  if (coin === 1) {
    return true;
  } else {
    return false;
  }
};
