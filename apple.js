import { setGameScore, setHighScore } from './game.js';
import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';

let apple = getRandomApplePosition();
const EXPANSION_RATE = 1;

export function update() {
    if (onSnake(apple)) {
        expandSnake(EXPANSION_RATE);
        apple = getRandomApplePosition();
        setGameScore();
        setHighScore();
        biteSound.play();
    }
};

export function draw(gameBoard) {
    const appleElement = document.createElement('div');
    appleElement.style.gridRowStart = apple.y;
    appleElement.style.gridColumnStart = apple.x;
    appleElement.classList.add('apple');
    gameBoard.appendChild(appleElement);

};

function getRandomApplePosition() {
    let newApplePosition
    while (newApplePosition == null || onSnake(newApplePosition)) {
        newApplePosition = randomGridPosition();
    };
    return newApplePosition
}

let biteSound = new Audio('./bite.mp3');
