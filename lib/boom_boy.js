import createjs from 'createjs';
import Board from './board';
import Player from './player/player';
import AIPlayer from './player/ai_player';
import { NUM_ROWS, NUM_COLS } from './constants';

const MOVE_KEYS_P1 = {
    ArrowLeft: 'left',
    ArrowUp: 'up',
    ArrowRight: 'right',
    ArrowDown: 'down',
    '/': 'bomb'
};

const MOVE_KEYS_P2 = {
    a: 'left',
    w: 'up',
    d: 'right',
    s: 'down',
    ' ': 'bomb'
};

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

    document.onkeydown = e => handleKeyDown(e, board);
    createjs.Ticker.addEventListener('tick', () => tick(board, stage));
}

function handleKeyDown(e, board) {
    const key = e.key;

    if (MOVE_KEYS_P1[key] || MOVE_KEYS_P2[key]) {
	e.preventDefault();
	board.movePlayers(key);
    }
}

function tick(board, stage) {
    stage.removeAllChildren();
    board.moveAI();
    board.draw();
    stage.update();
}

document.addEventListener('DOMContentLoaded', init);
