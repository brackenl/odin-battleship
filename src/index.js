import gameController from "./gameController/gameController";

const { player1, CPU1, playerGameBoard, CPUGameBoard } = gameController();
const playerGameboardContainer = document.querySelector(".player-container");
const CPUGameboardContainer = document.querySelector(".CPU-container");

const renderBoard = (gameBoard, container) => {
  container.innerHTML = "";
  for (let i = 0; i < gameBoard.grid.length; i++) {
    container.insertAdjacentHTML(
      "beforeend",
      `
              <div class="gameboard-gridchild ${
                gameBoard.grid[i].attacked && gameBoard.grid[i].placed
                  ? "hit"
                  : gameBoard.grid[i].attacked
                  ? "missed"
                  : null
              }" id="${gameBoard.grid[i].id}">${
        gameBoard.grid[i].attacked ? "X" : ""
      }</div>
          `
    );
  }
};

const handleClick = (e) => {
  const x = CPUGameBoard.grid[e.target.id].xCoOrd;
  const y = CPUGameBoard.grid[e.target.id].yCoOrd;
  player1.fireMissile(CPUGameBoard, x, y);
  renderBoard(CPUGameBoard, CPUGameboardContainer);
  if (CPUGameBoard.allShipsSunk() || playerGameBoard.allShipsSunk()) {
    displayEndingModal(CPUGameBoard.allShipsSunk());
  } else {
    CPU1.fireMissile(playerGameBoard);
    renderBoard(playerGameBoard, playerGameboardContainer);
  }
};

const addListeners = () => {
  const gridSquares = document.querySelectorAll(".CPU-container");
  gridSquares.forEach((square) =>
    square.addEventListener("click", handleClick)
  );
};

const displayEndingModal = (bool) => {
  const endText = bool
    ? "Congratulations admiral, you have bested the enemy"
    : "Your fleet has been eliminated";
  const phase2 = document.querySelector(".phase-two");
  const phase3 = document.querySelector(".phase-three");
  phase2.style.display = "none";
  phase3.insertAdjacentHTML(
    "beforeend",
    `
    <div class="end-modal">
      <p>${endText}</p>
      <button onClick="window.location.href=window.location.href">Play again</button>
    </div>
  `
  );
};

renderBoard(playerGameBoard, playerGameboardContainer);
renderBoard(CPUGameBoard, CPUGameboardContainer);

addListeners();
