import Player from './player.js';
import Gameboard from './board.js';

describe('player and computer properties', () => {
    let realPlayer;
    let computerPlayer;

    beforeEach(() => {
        realPlayer = new Player('real');
        computerPlayer = new Player('computer');
    });

    test('creates a real player', () => {
        expect(realPlayer.type).toBe('real');
    });

    test('creates a computer player', () => {
        expect(computerPlayer.type).toBe('computer');
    });

    test('each player has its own gameboard', () => {
        expect(realPlayer.gameboard).toBeInstanceOf(Gameboard);
        expect(computerPlayer.gameboard).toBeInstanceOf(Gameboard);
    })

    test('players do not share the same gameboard', () => {
        expect(realPlayer.gameboard).not.toBe(computerPlayer.gameboard);
    });

    test('players can place ships indepently', () => {
        realPlayer.gameboard.placeShip([0,0], 3);

        expect(realPlayer.gameboard.ships.length).toBe(1);
        expect(computerPlayer.gameboard.ships.length).toBe(0);
    });
})