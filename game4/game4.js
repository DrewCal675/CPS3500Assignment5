const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
let isJumping = false;
let score = 0;
let gravity = 0.9;

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isJumping) {
        jump();
    }
});

function jump() {
    let position = 0;
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 100) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 5;
                dino.style.bottom = position + "px";
            }, 20);
        }
        position += 5;
        dino.style.bottom = position + "px";
    }, 20);
}

function moveObstacle() {
    let obstaclePosition = 600;
    let obstacleInterval = setInterval(() => {
        if (obstaclePosition <= 0) {
            obstaclePosition = 600;
            score++;
            scoreDisplay.innerText = score;
        }
        obstaclePosition -= 5;
        obstacle.style.left = obstaclePosition + "px";
        
        let dinoRect = dino.getBoundingClientRect();
        let obstacleRect = obstacle.getBoundingClientRect();
        
        if (
            dinoRect.right > obstacleRect.left &&
            dinoRect.left < obstacleRect.right &&
            dinoRect.bottom > obstacleRect.top
        ) {
            alert("Game Over! Your score: " + score);
            clearInterval(obstacleInterval);
            location.reload();
        }
    }, 20);
}

moveObstacle();
