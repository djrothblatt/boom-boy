import createjs from 'createjs';
import Board from './board';
import Player from './player/player';
import AIPlayer from './player/ai_player';
import { NUM_ROWS, NUM_COLS, MOVE_KEYS_P1, MOVE_KEYS_P2 } from './constants';

function init() {
    createjs.Ticker.removeAllEventListeners();

    const stage = new createjs.Stage('gameEasel'),
          player1 = new Player({
              x: 1,
              y: 1,
              color: 'white',
              moveKeys: MOVE_KEYS_P1,
              stage
          }),
          player2 = new Player({
              x: NUM_COLS - 2,
              y: 1,
              color: 'black',
              moveKeys: MOVE_KEYS_P2,
              stage
          }),
          player3 = new AIPlayer({
              x: 1,
              y: NUM_ROWS - 2,
              color: 'red',
              stage
          }),
          player4 = new AIPlayer({
              x: NUM_COLS - 2,
              y: NUM_ROWS - 2,
              color: 'blue',
              stage
          }),
          board = new Board(stage, [player1, player2], [player3, player4]);

    createjs.Ticker.addEventListener('tick', () => tick(board, stage));
    createjs.Ticker.paused = true;

    const instructionsModal = document.getElementById('instructionsModal'),
          closeButton = document.getElementsByClassName('close')[0];

    instructionsModal.style.display = 'block';
    closeButton.onclick = () => {
        instructionsModal.style.display = 'none';
        createjs.Ticker.paused = false;
    };

    const gameOverModal = document.getElementById('gameOverModal'),
          playAgainButton = document.getElementById('playAgain');
    gameOverModal.style.display = 'none';
    playAgainButton.onclick = init;

    window.onclick = e => {
        if (e.target === instructionsModal) {
            instructionsModal.style.display = 'none';
            createjs.Ticker.paused = false;
        }
    };
    window.onkeydown = e => handleKeyDown(e, board);
}

function handleKeyDown(e, board) {
    const key = e.key;

    if (MOVE_KEYS_P1[key] || MOVE_KEYS_P2[key]) {
        e.preventDefault();
        board.movePlayers(key);
    }
    if (key == ' ') {
        e.preventDefault();
        togglePause();
    }
}

function toggleInstructionsModal() {
    let modal = document.getElementById('instructionsModal');
    let display = modal.style.display;
    modal.style.display = display === 'block' ? 'none' : 'block';
}

function togglePause() {
    toggleInstructionsModal();
    createjs.Ticker.paused = !createjs.Ticker.paused;
}

function tick(board, stage) {
    stage.removeAllChildren();
    if (board.isGameOver()) {
        document.getElementById('gameOverModal').style.display = 'block';
        createjs.Ticker.paused = true;
    }

    if (!createjs.Ticker.paused) {
        board.moveAI();
    }
    board.draw();
    stage.update();
}

document.addEventListener('DOMContentLoaded', init);
