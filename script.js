const Gameboard = (function () {
    const size = 3;
    const board = [];

    const getBoard = () => board;
    const getSize = () => size;

    const initializeBoard = () => {
        board.length = 0;
        for (let i = 0; i < size; ++i) {
            board[i] = [];
            for (let j = 0; j < size; ++j) board[i][j] = '';
        }
    };

    const markCell = (row, col, marker) => {
        board[row][col] = marker;
    };

    return { getSize, getBoard, initializeBoard, markCell };
})();

function GameManager(playerOne, playerTwo) {
    let gameOver = false;
    const players = [
        {
            name: playerOne,
            marker: 'X',
        },
        {
            name: playerTwo,
            marker: 'O',
        },
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const playRound = (row, col) => {
        if (gameOver) return;

        Gameboard.markCell(row, col, getActivePlayer().marker);
        const winner = checkWin();
        if (winner) {
            alert(`${winner.name} wins!`);
            gameOver = true;
            return;
        }
        switchActivePlayer();
    };

    const checkWin = () => {
        const board = Gameboard.getBoard();
        const lines = [
            // rows
            [
                [0, 0],
                [0, 1],
                [0, 2],
            ],
            [
                [1, 0],
                [1, 1],
                [1, 2],
            ],
            [
                [2, 0],
                [2, 1],
                [2, 2],
            ],

            // cols
            [
                [0, 0],
                [1, 0],
                [2, 0],
            ],
            [
                [0, 1],
                [1, 1],
                [2, 1],
            ],
            [
                [0, 2],
                [1, 2],
                [2, 2],
            ],

            // diagonals
            [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
            [
                [0, 2],
                [1, 1],
                [2, 0],
            ],
        ];

        for (const line of lines) {
            const [a, b, c] = line;
            const v1 = board[a[0]][a[1]];
            if (
                v1 !== '' &&
                v1 === board[b[0]][b[1]] &&
                v1 === board[c[0]][c[1]]
            ) {
                return players.find((player) => player.marker == v1);
            }
        }
        return null;
    };

    const markCell = () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.addEventListener('click', () => {
                if (cell.textContent !== '' || gameOver) return;

                const row = Number(cell.dataset.row);
                const col = Number(cell.dataset.col);
                cell.textContent = getActivePlayer().marker;
                playRound(row, col);
            });
        });
    };

    const reset = () => {
        gameOver = false;
        activePlayer = players[0];
        document.querySelectorAll('.cell').forEach((cell) => {
            cell.textContent = '';
        });
        Gameboard.initializeBoard();
    };

    return { markCell, reset };
}

let game = null;

document.querySelector('.start-game').addEventListener('click', () => {
    const p1Name = document.querySelector('#player-one-name').value.trim();
    const p2Name = document.querySelector('#player-two-name').value.trim();

    if (game) game.reset();

    Gameboard.initializeBoard();
    game = GameManager(p1Name || 'Player One', p2Name || 'Player Two');
    game.markCell();
});

document.querySelector('.reset-game').addEventListener('click', () => {
    if (game) game.reset();
    document.querySelector('.players-details form').reset();
});
