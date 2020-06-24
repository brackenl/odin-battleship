import gameController from "./gameController/gameController";
import dragula from "dragula";

const { player1, CPU1, playerGameBoard, CPUGameBoard } = gameController();
const playerGameboardContainer = document.querySelector(".player-container");
const CPUGameboardContainer = document.querySelector(".CPU-container");
const placementContainer = document.querySelector(".placement-grid-container");

let fleetOrientation = "horizontal";

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
          : gameBoard.grid[i].placed
          ? "placed"
          : ""
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
  victoryCheck();
  CPU1.fireMissile(playerGameBoard);
  renderBoard(playerGameBoard, playerGameboardContainer);
  victoryCheck();
};

const addListeners = () => {
  const gridSquares = document.querySelectorAll(".CPU-container");
  const switchButton = document.querySelector(".switch-btn");

  gridSquares.forEach((square) =>
    square.addEventListener("click", handleClick)
  );
  switchButton.addEventListener("click", rotateFleet);
};

const rotateFleet = () => {
  const pieceContainer = document.querySelector(".piece-container");
  const pieces = document.querySelectorAll(".piece");

  if (pieceContainer.style.flexDirection === "column") {
    pieceContainer.style.flexDirection = "row";
  } else {
    pieceContainer.style.flexDirection = "column";
  }

  pieces.forEach((piece) => {
    if (piece.style.gridTemplateColumns === "repeat(5, 50px)") {
      piece.style.gridTemplateColumns = "repeat(1, 50px)";
      piece.style.gridTemplateRows = "repeat(5, 50px)";
    } else {
      piece.style.gridTemplateColumns = "repeat(5, 50px)";
      piece.style.gridTemplateRows = "repeat(1, 50px)";
    }
  });

  fleetOrientation =
    fleetOrientation === "horizontal" ? "vertical" : "horizontal";
};

const endPhaseOne = () => {
  const phaseOne = document.querySelector(".phase-one");
  const phaseTwo = document.querySelector(".phase-two");
  phaseOne.style.display = "none";
  phaseTwo.style.display = "block";
};

const victoryCheck = () => {
  if (CPUGameBoard.allShipsSunk() || playerGameBoard.allShipsSunk()) {
    displayEndingModal(CPUGameBoard.allShipsSunk());
  }
};

const displayEndingModal = (bool) => {
  const endText = bool
    ? "Congratulations admiral, you have bested the enemy!"
    : "Your fleet has been eliminated...";
  const phase2 = document.querySelector(".phase-two");
  phase2.insertAdjacentHTML(
    "beforeend",
    `
    <div class="end-modal">
      <p>${endText}</p>
      <button onClick="window.location.href=window.location.href">Play again</button>
    </div>
  `
  );
};

renderBoard(playerGameBoard, placementContainer);
renderBoard(playerGameBoard, playerGameboardContainer);
renderBoard(CPUGameBoard, CPUGameboardContainer);
addListeners();

const drake = dragula({
  containers: [
    document.querySelector(".piece-container"),
    ...document.querySelectorAll(".gameboard-gridchild"),
  ],
});

const pushContainers = () => {
  const arr = [
    document.querySelector(".piece-container"),
    ...document.querySelectorAll(".gameboard-gridchild"),
  ];
  drake.containers = arr;
};

pushContainers();

drake.on("drop", (el, target, source, sibling) => {
  el.style.display = "none";
  const length = Number(el.getAttribute("data-hull"));
  const x = playerGameBoard.grid[target.id].xCoOrd;
  const y = playerGameBoard.grid[target.id].yCoOrd;
  playerGameBoard.placeShip(length, x, y, fleetOrientation);
  renderBoard(playerGameBoard, placementContainer);
  pushContainers();
  if (playerGameBoard.ships.length >= 4) {
    endPhaseOne();
  }
  // consider error handling if players makes invalid placement
});
