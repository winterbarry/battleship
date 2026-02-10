import Ship from './ship.js';

export default class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = Array(size).fill(null).map(() => Array(size).fill(null)); 
    this.ships = []; 
    this.missedAttacks = [];
  }

  placeShip([row, col], length, direction = 'horizontal') {
    const ship = new Ship(length);

    for (let i = 0; i < length; i++) {
      const r = direction === 'vertical' ? row + i : row;
      const c = direction === 'horizontal' ? col + i : col;

      this.board[r][c] = {
        ship,
        index: i,
        hit: false,
      };
    }

    this.ships.push(ship);
  }

  receiveAttack([row, col]) {
    const target = this.board[row][col];

    if (target && target.ship) {
      if (!target.hit) {
        target.hit = true;
        target.ship.hit();
      }
    } else {
      this.missedAttacks.push([row, col]);
    }
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }

  resetBoard() {
    this.board = Array(this.size).fill(null).map(() => Array(this.size).fill(null));
    this.ships = [];
    this.missedAttacks = [];
  }

  randomizeShips(shipLengths = [5, 4, 3, 3, 2]) {
    this.resetBoard();

    shipLengths.forEach(length => {
      let placed = false;

      while (!placed) {
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const row = Math.floor(Math.random() * this.size);
        const col = Math.floor(Math.random() * this.size);

        if (this.canPlaceShip(row, col, length, direction)) {
          this.placeShip([row, col], length, direction);
          placed = true;
        }
      }
    });
  }

  // check if ship can be placed
  canPlaceShip(row, col, length, direction) {
    for (let i = 0; i < length; i++) {
      const r = direction === 'vertical' ? row + i : row;
      const c = direction === 'horizontal' ? col + i : col;

      if (r < 0 || r >= this.size || c < 0 || c >= this.size) return false;
      if (this.board[r][c] !== null) return false;

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 &&
            nr < this.size &&
            nc >= 0 &&
            nc < this.size &&
            this.board[nr][nc] !== null
          ) {
            return false;
          }
        }
      }
    }

    return true;
  }
}
