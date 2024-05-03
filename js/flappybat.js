// query selectors for HTML classes
const canvas = document.querySelector('.game-canvas');
const ctx = canvas.getContext('2d');
const gameContainer = document.querySelector('.game-container');
const scoreDisplay = document.querySelector('.score-display');
const endMenu = document.querySelector('.end-menu');
const endScore = document.querySelector('.end-score');
const bestScoreDisplay = document.querySelector('.best-score');

// Bat sprite by MoikMellah (https://opengameart.org/content/bat-32x32)
// used under CC0 (Public Domain)

// Load the images for the bat with wings up
const flappyImgUp = new Image();
flappyImgUp.src = 'images/batWingsUp.png';

// Load the images for the bat with wings down
const flappyImgDown = new Image();
flappyImgDown.src = 'images/batWingsDown.png';

// Game constants
// Bird vairables left but image replaced with bat
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

// Flap the bird
function flap() {
    birdVelocity = FLAP_SPEED;
}

// Flap the bird when the space bar is pressed
document.body.onkeyup = function(e) {
    if (e.code === 'Space') {
        flap();
    }
}

// Flap the bird when the canvas is clicked
// added to allow for mobile play
canvas.addEventListener('click', flap);

// Restart the game when the restart button is clicked
document.querySelector('.restart-button').addEventListener('click', function() {
    hideEndMenu();
    resetGame();
    loop();
});

// Increase the score when the bird passes a pipe
function increaseScore() {
    // Check if the bird has passed the pipe
    if (birdX > pipeX + PIPE_WIDTH && !scored) {
        score++;
        scoreDisplay.textContent = "Score: " + score;
        scored = true;
    }

    // Reset the scored flag if the bird is behind the pipe
    if (birdX < pipeX + PIPE_WIDTH) {
        scored = false;
    }
}

function collisionCheck() {
    // Create bounding boxes for the bird and the pipes
    const birdBox = { x: birdX, y: birdY, width: BIRD_WIDTH, height: BIRD_HEIGHT };
    const topPipeBox = { x: pipeX, y: 0, width: PIPE_WIDTH, height: pipeY };
    const bottomPipeBox = { x: pipeX, y: pipeY + PIPE_GAP, width: PIPE_WIDTH, height: canvas.height - pipeY - PIPE_GAP };

    // Check if the bird is colliding with the pipes or the top/bottom of the canvas
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

// display the end menu with current and best score
function showEndMenu() {
    endMenu.style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    endScore.textContent = score;
    if (score > highScore) {
        highScore = score;
    }
    bestScoreDisplay.textContent = highScore;
}

// Hide the end menu
function hideEndMenu() {
    endMenu.style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');
}

// Reset the game to its initial state
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

// Main game loop
function loop() {
    // Clear the canvas and draw the bird
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const flappyImg = birdVelocity < 0 ? flappyImgUp : flappyImgDown;
    ctx.drawImage(flappyImg, birdX, birdY, BIRD_WIDTH, BIRD_HEIGHT);

    // Draw the pipes
    ctx.fillStyle = '#333';
    ctx.fillRect(pipeX, 0, PIPE_WIDTH, pipeY);
    ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY - PIPE_GAP);

    // Check for collisions
    if (collisionCheck()) {
        endGame();
        return;
    }

    // Move the pipes and the bird
    pipeX -= getDifficulty();
    if (pipeX < -PIPE_WIDTH) {
        pipeX = canvas.width;
        pipeY = Math.random() * (canvas.height - PIPE_GAP - PIPE_WIDTH) + PIPE_WIDTH;
    }
    birdVelocity += birdAcceleration;
    birdY += birdVelocity;

    // Update the score and request the next frame
    increaseScore();
    requestAnimationFrame(loop);
}

// Get the difficulty level from the radio buttons
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

// show the end menu
function endGame() {
    showEndMenu();
}

// Start the game loop
loop();
