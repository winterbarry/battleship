import Ship from './ship.js';

describe('ship operations', () => {

    test('ship has correct initial properties', () => {
        const ship = new Ship(3);

        expect(ship.length).toBe(3);
        expect(ship.hits).toBe(0);
        expect(ship.sunk).toBe(false);
    })

    test('hit increases hit count', () => {
        const ship = new Ship(4);

        ship.hit();

        expect(ship.hits).toBe(1);
    })

    test('if a ship sinks', () => {
        const ship = new Ship(5);

        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();

        expect(ship.isSunk()).toBe(true);
    })
})