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
