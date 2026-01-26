import Gameboard from './board.js';
import Ship from './ship.js';

describe('gameboard properties', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('place ship at a coordinate', () => {
        gameboard.placeShip([0,0], 3);

        expect(gameboard.board[0][0]).toBeInstanceOf(Ship);
        expect(gameboard.board[0][1]).toBeInstanceOf(Ship);
        expect(gameboard.board[0][2]).toBeInstanceOf(Ship);
    });

    test('recieve attack when coordinates match', () => {
        gameboard.placeShip([1, 1], 2);

        gameboard.receiveAttack([1, 1]);

        const ship = gameboard.board[1][1];
        expect(ship.hits).toBe(1);
    });

    test('record missed shots', () =>{
        gameboard.receiveAttack([5, 5]);

        expect(gameboard.missedAttacks).toContainEqual([5,5]);
    });

    test("receiveAttack does not record a hit as a miss", () => {
        gameboard.placeShip([2, 2], 1);

        gameboard.receiveAttack([2, 2]);

        expect(gameboard.missedAttacks.length).toBe(0);
    });

    test('report false if not all ships sunk', () => {
        gameboard.placeShip([0,0], 2);

        gameboard.receiveAttack([0,0]);

        expect(gameboard.allShipsSunk()).toBe(false);
    });

    test("reports true when all ships are sunk", () => {
        gameboard.placeShip([0, 0], 2);

        gameboard.receiveAttack([0, 0]);
        gameboard.receiveAttack([0, 1]);

        expect(gameboard.allShipsSunk()).toBe(true);
    });
})