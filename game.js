import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateApple, draw as drawApple} from './apple.js'
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board')

function main(currentTime) {

    if (gameOver) {
        if (confirm('You lost. Press ok to restart')) {
            window.location = '/'
        }
        return
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;


    console.log("Render");
    lastRenderTime = currentTime;

    update();
    draw();
};

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateApple();
    checkDeath();
};

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawApple(gameBoard);
};

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
