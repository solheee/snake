import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, snakeBody} from './snake.js'
import { update as updateApple, draw as drawApple} from './apple.js'
import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
let gameWin = false;
const gameBoard = document.getElementById('game-board');


const highGameScoreInHtml = document.getElementById('high-Score');

let saveScore = localStorage.getItem("score");
highGameScoreInHtml.innerText = saveScore;


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


// 현재 점수
let gameScore = 0;
export function setGameScore() {
    const currentGameScoreInHtml = document.getElementById('game-Score');
    
    gameScore = snakeBody.length;
    currentGameScoreInHtml.innerText = gameScore;
    
    gameWin = ( gameScore > 440 );
}

// 최고기록
export function setHighScore() {
    if (gameScore > saveScore) {
        localStorage.setItem("score", gameScore);
    }
}


// 프레스 투 스타트 문구
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

