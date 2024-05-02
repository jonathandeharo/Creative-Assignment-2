const flipButton = document.querySelector('.flip-button');
const coin = document.querySelector('.coin');
const resultDisplay = document.querySelector('.result-display');
const flipCount = document.querySelector('.score-display');
let headsCount = 0;
let tailsCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    flipButton.addEventListener('click', function() {
        flipCoin();
    });
});

function flipCoin() {
    resultDisplay.textContent = 'Flipping...';
    let random = Math.random();
    let result = random < 0.5 ? 'Heads' : 'Tails';
    result === 'Heads' ? headsCount++ : tailsCount++;

    coin.style.animation = 'none';
    setTimeout(() => {
        coin.style.animation = 'flip 1s forwards';
        setTimeout(() => {
            coin.src = result === 'Heads' ? 'images/heads.png' : 'images/tails.png';
            resultDisplay.textContent = result;
            flipCount.textContent = "Heads: " + headsCount + " Tails: " + tailsCount;
        }, 900); // Ensure this matches the animation duration
    }, 10);
}
