import Ship from './ship.js'

export default class Gameboard {
    constructor(size = 10) {
        this.size = size;
        this.board = Array(size).fill(null).map(() => Array(size).fill(null)); 
        this.ships = []; 
        this.missedAttacks = [];
    }

    placeShip([row, col], length) {
        const newShip = new Ship(length);

        for (let i = 0; i < length; i++) {
            this.board[row][col + i] = newShip; 
        }

        this.ships.push(newShip);
    }

    receiveAttack([row, col]) {
        const target = this.board[row][col];

        if (target instanceof Ship) {
            target.hit();
        } else {
            this.missedAttacks.push([row, col]);
        }
    }
    
    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}