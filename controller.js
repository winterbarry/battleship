import Player from './player.js';
import Gameboard from './board.js';
import Ship from './ship.js';
import { renderBoard, clearBoards } from './render.js';

const GameController = (() => {
  let player;
  let computer;
  let currentPlayer;
  let gameOver = false;

  function startGame() {
    player = new Player('real', new Gameboard());
    computer = new Player('computer', new Gameboard());

    currentPlayer = player;
    gameOver = false;

    // hardcoded player and computer ships
    player.gameboard.placeShip([0, 0], 5);
    player.gameboard.placeShip([2, 0], 4);
    player.gameboard.placeShip([4, 0], 3);
    player.gameboard.placeShip([6, 0], 3);
    player.gameboard.placeShip([8, 0], 2);

    computer.gameboard.placeShip([0, 2], 5);
    computer.gameboard.placeShip([2, 2], 4);
    computer.gameboard.placeShip([4, 2], 3);
    computer.gameboard.placeShip([6, 2], 3);
    computer.gameboard.placeShip([8, 2], 2);

    clearBoards();
    renderBoards();
    bindEnemyBoardEvents();
  }

  function renderBoards() {
    renderBoard(player.gameboard, 'player-board', false);
    renderBoard(computer.gameboard, 'computer-board', false);
  }

  function bindEnemyBoardEvents() {
    const enemyBoard = document.querySelector('#computer-board');

    enemyBoard.addEventListener('click', (e) => {
      if (gameOver || currentPlayer !== player) return;

      const cell = e.target;
      const row = Number(cell.dataset.row);
      const col = Number(cell.dataset.col);

      handlePlayerAttack([row, col]);
    });
  }

  function handlePlayerAttack(coords) {
    if (isIllegalMove(computer.gameboard, coords)) return;

    computer.gameboard.receiveAttack(coords);
    renderBoards();

    if (computer.gameboard.allShipsSunk()) {
      endGame('You win!');
      return;
    }

    // switch to computer after player attack
    currentPlayer = computer;
    setTimeout(computerTurn, 500); 
  }

  function computerTurn() {
    let coords;

    // continue looping until valid cell to attack is found
    do {
      coords = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
    } while (isIllegalMove(player.gameboard, coords));

    player.gameboard.receiveAttack(coords);
    renderBoards();

    if (player.gameboard.allShipsSunk()) {
      endGame('Computer wins!');
      return;
    }

    // switch back to player
    currentPlayer = player;
  }

  function isIllegalMove(board, [row, col]) {
    const alreadyHitShip = board.board[row][col] instanceof Ship && board.board[row][col].hits > 0;
    const alreadyMissed = board.missedAttacks.some(([r, c]) => r === row && c === col);
    return alreadyHitShip || alreadyMissed;
  }

  function endGame(message) {
    gameOver = true;
    alert(message);
  }

  return {
    startGame,
  };
})();

export default GameController;
