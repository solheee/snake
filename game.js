import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, snakeBody} from './snake.js'
import { update as updateApple, draw as drawApple} from './apple.js'
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
let gameWin = false;
const gameBoard = document.getElementById('game-board')
localStorage.setItem("score", 0);

function main(currentTime) {

    if (gameOver) {
        if (confirm('You lost. Press ok to restart')) {
            window.location.reload();
        }
        return
    }

    if (gameWin) {
        if (confirm('You win. Press ok to restart')) {
            window.location.reload();
        }
        return
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

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


export function setGameScore() {
    const gameScoreInHtml = document.getElementById('game-Score');
    let gameScore = 0;
    gameScore = snakeBody.length;
    gameScoreInHtml.innerText = gameScore;
    
    gameWin = ( gameScore > 440 );

    
    let saveScore = 0;
    if (gameScore > saveScore) {
        localStorage.setItem("score", gameScore);
    }
    saveScore = localStorage.getItem("score");
}

const pressToStart = document.querySelector('.press-to-start')
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            pressToStart.style.display = "none"
            break;
    }
});