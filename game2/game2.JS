const resultText = document.getElementById('result-text');
const choices = ['rock', 'paper', 'scissors'];
const playRound = (playerChoice) => {
const computerChoice = choices[Math.floor(Math.random() * 3)];
if (playerChoice === computerChoice) {
resultText.textContent = `It's a draw! Both chose ${playerChoice}.`;
} else if (
(playerChoice === 'rock' && computerChoice === 'scissors') ||
(playerChoice === 'paper' && computerChoice === 'rock') ||
(playerChoice === 'scissors' && computerChoice === 'paper')
) {
resultText.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
} else {
resultText.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
}
};