document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const startButton = document.getElementById('start');
    const restartButton = document.getElementById('restart');
    const timerDisplay = document.getElementById('timer');

    const words = ['hat', 'sat', 'rat', 'that', 'mat', 'fat', 'bat', 'cat', 'hat', 'sat', 'rat', 'that',
        'mat', 'fat', 'bat', 'cat'];

    let flippedCards = [];
    let matchedPairs = 0;
    let gameStarted = false;
    let timer = 0;
    let timerInterval;

    // Shuffle words array
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    // Create the game board
    const createBoard = () => {
        shuffleArray(words);
        grid.innerHTML = ''; // Clear the board
        for (let i = 0; i < words.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = words[i];
            card.innerHTML = `<div class="front"></div><div class="back">${words[i]}</div>`;
            grid.appendChild(card);
        }
    };

    // Flip a card
    const flipCard = e => {
        if (!gameStarted) return; // Prevent flipping before game starts

        const clickedCard = e.target.closest('.card');
        if (clickedCard && !clickedCard.classList.contains('flipped') && flippedCards.length < 2) {
            clickedCard.classList.add('flipped');
            flippedCards.push(clickedCard);
            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    };

    // Check if two flipped cards match
    const checkForMatch = () => {
        const [card1, card2] = flippedCards;
        if (card1.dataset.name === card2.dataset.name) {
            matchedPairs++;
            if (matchedPairs === words.length / 2) {
                clearInterval(timerInterval);
                setTimeout(() => alert(`Congratulations! You completed the game in ${timer} seconds!`), 500);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        flippedCards = [];
    };

    // Start the game
    const startGame = () => {
        gameStarted = true;
        startButton.disabled = true;
        restartButton.disabled = false;
        timer = 0;
        timerDisplay.textContent = "Time: 0s";

        // Start timer
        timerInterval = setInterval(() => {
            timer++;
            timerDisplay.textContent = `Time: ${timer}s`;
        }, 1000);

        createBoard();
    };

    // Restart the game
    const restartGame = () => {
        clearInterval(timerInterval);
        gameStarted = false;
        timer = 0;
        timerDisplay.textContent = "Time: 0s";
        startButton.disabled = false;
        restartButton.disabled = true;
        matchedPairs = 0;
        flippedCards = [];
        grid.innerHTML = ''; // Clear the board
    };

    // Event Listeners
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
    grid.addEventListener('click', flipCard);
});
