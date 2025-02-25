let playerScore = 0;
let computerScore = 0;

const resultText = document.getElementById('result-text');
const playerScoreText = document.getElementById('player-score');
const computerScoreText = document.getElementById('computer-score');
const choices = ['rock', 'paper', 'scissors'];

const playRound = (playerChoice) => {
    if (playerScore >= 5 || computerScore >= 5) return; // Stop game if there's already a winner

    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let resultMessage = "";

    if (playerChoice === computerChoice) {
        resultMessage = `It's a draw! Both chose ${playerChoice}.`;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        resultMessage = `You win! ${playerChoice} beats ${computerChoice}.`;
    } else {
        computerScore++;
        resultMessage = `You lose! ${computerChoice} beats ${playerChoice}.`;
    }

    // Update scores
    playerScoreText.textContent = playerScore;
    computerScoreText.textContent = computerScore;
    resultText.textContent = resultMessage;

    // Check for winner
    if (playerScore === 5) {
        resultText.textContent = "Congratulations! You won the game!";
    } else if (computerScore === 5) {
        resultText.textContent = "Game Over! The computer wins!";
    }
};
