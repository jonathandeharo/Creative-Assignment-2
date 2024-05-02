const canvas = document.querySelector('.game-canvas');
const ctx = canvas.getContext('2d');
const gameContainer = document.querySelector('.game-container');
const scoreDisplay = document.querySelector('.score-display');
const endMenu = document.querySelector('.end-menu');
const endScore = document.querySelector('.end-score');
const bestScoreDisplay = document.querySelector('.best-score');

const flappyImgUp = new Image();
flappyImgUp.src = 'images/batWingsUp.png';

const flappyImgDown = new Image();
flappyImgDown.src = 'images/batWingsDown.png';

// Game constants
const FLAP_SPEED = -3;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
const PIPE_WIDTH = 50;
const PIPE_GAP = 125;

// Bird variables
let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.1;

// Pipe variables
let pipeX = 400;
let pipeY = canvas.height - 200;

// Score variables
let score = 0;
let highScore = 0;
let scored = false;

function flap() {
    birdVelocity = FLAP_SPEED;
}

document.body.onkeyup = function(e) {
    if (e.code === 'Space') {
        flap();
    }
}

canvas.addEventListener('click', flap);

document.querySelector('.restart-button').addEventListener('click', function() {
    hideEndMenu();
    resetGame();
    loop();
});

function increaseScore() {
    if (birdX > pipeX + PIPE_WIDTH && !scored) {
        score++;
        scoreDisplay.textContent = "Score: " + score;
        scored = true;
    }

    if (birdX < pipeX + PIPE_WIDTH) {
        scored = false;
    }
}

function collisionCheck() {
    const birdBox = { x: birdX, y: birdY, width: BIRD_WIDTH, height: BIRD_HEIGHT };
    const topPipeBox = { x: pipeX, y: 0, width: PIPE_WIDTH, height: pipeY };
    const bottomPipeBox = { x: pipeX, y: pipeY + PIPE_GAP, width: PIPE_WIDTH, height: canvas.height - pipeY - PIPE_GAP };

    if ((birdBox.x < topPipeBox.x + topPipeBox.width &&
         birdBox.x + birdBox.width > topPipeBox.x &&
         birdBox.y < topPipeBox.height) ||
        (birdBox.x < bottomPipeBox.x + bottomPipeBox.width &&
         birdBox.x + birdBox.width > bottomPipeBox.x &&
         birdBox.y + birdBox.height > bottomPipeBox.y) ||
        birdY < 0 || birdY + BIRD_HEIGHT > canvas.height) {
        return true;
    }

    return false;
}

function showEndMenu() {
    endMenu.style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    endScore.textContent = score;
    if (score > highScore) {
        highScore = score;
    }
    bestScoreDisplay.textContent = highScore;
}

function hideEndMenu() {
    endMenu.style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');
}

function resetGame() {
    birdX = 50;
    birdY = 50;
    birdVelocity = 0;
    pipeX = 400;
    pipeY = canvas.height - 200;
    score = 0;
    scored = false;
    scoreDisplay.textContent = "Score: " + score;
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const flappyImg = birdVelocity < 0 ? flappyImgUp : flappyImgDown;
    ctx.drawImage(flappyImg, birdX, birdY, BIRD_WIDTH, BIRD_HEIGHT);

    ctx.fillStyle = '#333';
    ctx.fillRect(pipeX, 0, PIPE_WIDTH, pipeY);
    ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY - PIPE_GAP);

    if (collisionCheck()) {
        endGame();
        return;
    }

    pipeX -= getDifficulty();
    if (pipeX < -PIPE_WIDTH) {
        pipeX = canvas.width;
        pipeY = Math.random() * (canvas.height - PIPE_GAP - PIPE_WIDTH) + PIPE_WIDTH;
    }

    birdVelocity += birdAcceleration;
    birdY += birdVelocity;

    increaseScore();
    requestAnimationFrame(loop);
}

function getDifficulty() {
    const radios = document.querySelectorAll('.difficulty-selection input');
    for (let radio of radios) {
        if (radio.checked) {
            switch (radio.value) {
                case 'easy': return 1;
                case 'medium': return 1.5;
                case 'hard': return 3;
                case 'impossible': return 40;
            }
        }
    }
    return 3; // Default to medium if no selection is found
}

function endGame() {
    showEndMenu();
}

loop();
