// query selectors for HTML classe
const canvas = document.querySelector('.game-canvas');
const scoreDisplay = document.querySelector('.score-display');
const endScore = document.querySelector('.end-score');
const bestScore = document.querySelector('.best-score');
const context = canvas.getContext('2d');
const gameContainer = document.querySelector('.game-container');

// snake and apple dimensions
const appleWidth = canvas.width / 20;
const appleHeight = canvas.height / 20;
const snakeWidth = canvas.width / 20;
const snakeHeight = canvas.height / 20;

// Game variables
let highScore = 0;
let score = 0;
let snakeXVel = 0;
let snakeYVel = 0;
let snake = [];
let appleXPos;
let appleYPos;
let gameInterval;
let isGameOver = false;

// Event listeners to start/restart game and key presses
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.restart-button').addEventListener('click', restartGame);
    document.addEventListener('keydown', moveSnake);
    startGame();
});

// Start the game and randomly place the apple
function startGame() {
    snake = [{xPos: 10, yPos: 10}];
    snakeXVel = 0;
    snakeYVel = 0;
    appleXPos = Math.floor(Math.random() * 20);
    appleYPos = Math.floor(Math.random() * 20);
    gameInterval = setInterval(updateGame, getDifficulty());
}

// Place the apple on the canvas randomly
function placeApple() {
    appleXPos = Math.floor(Math.random() * 20);
    appleYPos = Math.floor(Math.random() * 20);
    context.fillStyle = 'red';
    context.fillRect(appleXPos * appleWidth, appleYPos * appleHeight, appleWidth, appleHeight);
}

// Place the snake on the canvas
function placeSnake() {
    context.fillStyle = 'green';
    snake.forEach(segment => {
        context.fillRect(segment.xPos * snakeWidth, segment.yPos * snakeHeight, snakeWidth, snakeHeight);
    });
}

// Restart the game
function restartGame() {
    scoreDisplay.innerHTML = 'Score: 0';
    score = 0;
    clearInterval(gameInterval);
    isGameOver = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    startGame();
    hideEndMenu();
}

// Update the game state
function updateGame() {
    // Clear the canvas and draw the apple
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'red';
    context.fillRect(appleXPos * appleWidth, appleYPos * appleHeight, appleWidth, appleHeight);
    
    // Move the snake
    let headX = snake[0].xPos + snakeXVel;
    let headY = snake[0].yPos + snakeYVel;

    // Collision with the borders
    if (headX < 0 || headX >= 20 || headY < 0 || headY >= 20) {
        gameOver();
        return;
    }

    // Collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (headX === snake[i].xPos && headY === snake[i].yPos) {
            gameOver();
            return;
        }
    }

    // Move snake body
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].xPos = snake[i - 1].xPos;
        snake[i].yPos = snake[i - 1].yPos;
    }

    // Move snake head
    snake[0].xPos += snakeXVel;
    snake[0].yPos += snakeYVel;

    // Eating the apple
    if (snake[0].xPos === appleXPos && snake[0].yPos === appleYPos) {
        snake.push({xPos: appleXPos, yPos: appleYPos});
        placeApple();
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
    }

    // Draw the snake
    placeSnake();
}

// hide the end menu
function hideEndMenu () {
    document.querySelector('.end-menu').style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');
}

// End the game
function gameOver() {
    clearInterval(gameInterval);
    showEndMenu();
    isGameOver = true;
}

// Move the snake based on key presses
function moveSnake(e) {
    if (isGameOver) return; // Prevent movement if game is over
    switch(e.key){
        case 'ArrowUp': if (snakeYVel == 0) { snakeYVel = -1; snakeXVel = 0; } break;
        case 'ArrowDown': if (snakeYVel == 0) { snakeYVel = 1; snakeXVel = 0; } break;
        case 'ArrowLeft': if (snakeXVel == 0) { snakeXVel = -1; snakeYVel = 0; } break;
        case 'ArrowRight': if (snakeXVel == 0) { snakeXVel = 1; snakeYVel = 0; } break;
    }
}

// display the end menu with current and best score
function showEndMenu () {
    document.querySelector('.end-menu').style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    endScore.innerHTML = score;
    if (score > highScore) {
        highScore = score;
    }
    bestScore.innerHTML = highScore;
}

// Get the difficulty level from the radio buttons
function getDifficulty() {
    let radios = document.getElementsByName('difficulty');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value === 'easy') {
                return 200;
            }
            else if (radios[i].value === 'medium') {
                return 100;
            }
            else if (radios[i].value === 'hard') {
                return 50;
            }
            else {
                return 10;
            }
        }
    }
}