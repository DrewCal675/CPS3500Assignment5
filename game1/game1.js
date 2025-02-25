let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const makeMove = (cell, index) => {
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add('taken');
    checkWinner();
};

const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById('status').innerText = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes('')) {
        document.getElementById('status').innerText = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').innerText = '';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('taken');
    });
};