// Setting up query selectors for HTML classes
const flipButton = document.querySelector('.flip-button');
const coin = document.querySelector('.coin');
const resultDisplay = document.querySelector('.result-display');
const flipCount = document.querySelector('.score-display');

// Variables to keep track of the number of heads and tails for repeated flips
let headsCount = 0;
let tailsCount = 0;

// Set event listener for the flip button
document.addEventListener('DOMContentLoaded', function() {
    flipButton.addEventListener('click', function() {
        flipCoin();
    });
});

function flipCoin() {
    // Randomly generate a number between 0 and 1
    resultDisplay.textContent = 'Flipping...';
    let random = Math.random();
    let result = random < 0.5 ? 'Heads' : 'Tails';
    result === 'Heads' ? headsCount++ : tailsCount++;

    // Animate the coin flip
    coin.style.animation = 'none';
    setTimeout(() => {
        coin.style.animation = 'flip 1s forwards';
        setTimeout(() => {
            coin.src = result === 'Heads' ? 'images/heads.png' : 'images/tails.png';
            resultDisplay.textContent = result;
            flipCount.textContent = "Heads: " + headsCount + " Tails: " + tailsCount;
        }, 900);
    }, 10);
}
