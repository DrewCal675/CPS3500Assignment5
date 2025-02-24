document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const restartButton = document.getElementById('restart');
    const words = ['hat', 'sat', 'rat', 'that', 'mat', 'fat', 'bat', 'cat', 'hat', 'sat', 'rat', 'that',
        'mat', 'fat', 'bat', 'cat'];
    let flippedCards = [];
    let matchedPairs = 0;
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };
    const createBoard = () => {
        shuffleArray(words);
        for (let i = 0; i < words.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = words[i];
            card.innerHTML = `<div class="front"></div><div class="back">${words[i]}</div>`;
            grid.appendChild(card);
        }
    };
    const flipCard = e => {
        const clickedCard = e.target.closest('.card');
        if (clickedCard && !clickedCard.classList.contains('flipped') && flippedCards.length < 2) {
            clickedCard.classList.add('flipped');
            flippedCards.push(clickedCard);
            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    };
    const checkForMatch = () => {
        const [card1, card2] = flippedCards;
        if (card1.dataset.name === card2.dataset.name) {
            matchedPairs++;
            if (matchedPairs === words.length / 2) {
                setTimeout(() => alert('Congratulations! You found all the pairs!'), 500);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        flippedCards = [];
    };
    const restartGame = () => {
        grid.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        createBoard();
    };
    grid.addEventListener('click', flipCard);
    restartButton.addEventListener('click', restartGame);
    createBoard();
});