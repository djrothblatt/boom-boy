import createjs from 'createjs';
import Board from './board';
import Player from './player/player';
import AIPlayer from './player/ai_player';
import { NUM_ROWS, NUM_COLS, MOVE_KEYS_P1, MOVE_KEYS_P2 } from './constants';

function init() {
    const stage = new createjs.Stage('gameEasel');
    const player1 = new Player({
        x: 1,
        y: 1,
        color: 'white',
        moveKeys: MOVE_KEYS_P1,
        stage
    });

    const player2 = new Player({
        x: NUM_COLS - 2,
        y: 1,
        color: 'black',
        moveKeys: MOVE_KEYS_P2,
        stage
    });

    const player3 = new AIPlayer({
        x: 1,
        y: NUM_ROWS - 2,
        color: 'red',
        stage
    });

    const player4 = new AIPlayer({
        x: NUM_COLS - 2,
        y: NUM_ROWS - 2,
        color: 'blue',
        stage
    });

    const board = new Board(stage, [player1, player2], [player3, player4]);
    createjs.Ticker.addEventListener('tick', () => tick(board, stage));
    createjs.Ticker.paused = true;

    let instructionsModal = document.getElementById('instructionsModal');
    instructionsModal.style.display = 'block';
    let span = document.getElementsByClassName('close')[0];
    span.onclick = () => {
        instructionsModal.style.display = 'none';
        createjs.Ticker.paused = false;
    };
    window.onclick = e => {
        if (e.target === instructionsModal) {
            instructionsModal.style.display = 'none';
            createjs.Ticker.paused = false;
        }
    };
    document.onkeydown = e => handleKeyDown(e, board);
}

function handleKeyDown(e, board) {
    const key = e.key;

    if (MOVE_KEYS_P1[key] || MOVE_KEYS_P2[key]) {
        e.preventDefault();
        board.movePlayers(key);
    }
    if (key == " ") {
        e.preventDefault();
        togglePause();
    }
}

function toggleModal() {
    let modal = document.getElementById('instructionsModal');
    let display = modal.style.display;
    modal.style.display = display === "block" ? "none" : "block";
}

function togglePause() {
    toggleModal();
    createjs.Ticker.paused = !createjs.Ticker.paused;
}

function tick(board, stage) {
    stage.removeAllChildren();
    if (!createjs.Ticker.paused) {
        board.moveAI();
    }
    board.draw();
    stage.update();
}

document.addEventListener('DOMContentLoaded', init);
