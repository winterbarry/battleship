export function clearBoards() {
  document.querySelector('#player-board').innerHTML = '';
  document.querySelector('#computer-board').innerHTML = '';
}

export function renderBoard(gameboard, containerId, hideShips) {
  const container = document.querySelector(`#${containerId}`);

  // loop through empty board && create cells
  for (let row = 0; row < gameboard.size; row++) {
    for (let col = 0; col < gameboard.size; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;

      // check current cell for ships || missed attacks
      const value = gameboard.board[row][col];

      if (value && !hideShips) {
        cell.classList.add('ship');
      }

      // show hits
      if (value && value.hits > 0) {
        cell.classList.add('hit');
      }

      if (
        gameboard.missedAttacks.some(
          ([r, c]) => r === row && c === col
        )
      ) {
        cell.classList.add('miss');
      }

      container.appendChild(cell);
    }
  }
}