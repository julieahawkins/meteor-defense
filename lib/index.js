import {Game} from "./Game";

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');

let game;

const drawStartScreen = (font, color, content, x, y) => {
    context.font = font;
    context.fillStyle = color;
    context.fillText(content, x, y);
};

const setGame = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.lineWidth = "3";
    context.strokeStyle = "#51A5CB";
    context.rect(canvas.width/2 - 80, canvas.height/2 - 30, 150, 40);
    context.stroke();
    drawStartScreen('30px Monospace', '#51A5CB', 'START', canvas.width/2 - 50, canvas.height/2);
    drawStartScreen('50px Black Ops One, Monospace', '#51A5CB', 'Meteor Defense', 100, 240);

    pauseButton.disabled = true;
    pauseButton.innerText = 'PAUSE GAME';
    resetButton.disabled = true;

    game = new Game(context, canvas.width, canvas.height);
};

window.onload = setGame;

canvas.addEventListener('click', (event) => {
    if (game && !game.active) {
        game.startGame();
        game.active = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
    } else if (game && game.active) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        game.clicked(mouseX, mouseY);
    }
});

pauseButton.addEventListener('click', () => {
    if (game.paused) {
        game.paused = false;
        game.animate();
        pauseButton.innerText = 'PAUSE GAME';
    } else {
        game.paused = true;
        pauseButton.innerText = 'RESUME PLAY';
    }
});

resetButton.addEventListener('click', () => {
    game.paused = true;
    game.active = false;

    setTimeout(() => setGame(), 300);
});
