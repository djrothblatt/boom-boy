import createjs from 'createjs';
import Board from './board';
import Player from './player';
import AIPlayer from './ai_player';

const MOVE_KEYS_P1 = {
    ArrowLeft: 'left',
    ArrowUp: 'up',
    ArrowRight: 'right',
    ArrowDown: 'down',
    ' ': 'bomb'
};

const MOVE_KEYS_P2 = {
    a: 'left',
    w: 'up',
    d: 'right',
    s: 'down',
    f: 'bomb'
};

function init() {
    const stage = new createjs.Stage('gameEasel');
    const player1 = new Player({
	x: 0,
	y: 0,
	color: 'Blue',
	moveKeys: MOVE_KEYS_P1,
	stage
    });

    const player2 = new Player({
	x: 10,
	y: 12,
	color: 'Orange',
	moveKeys: MOVE_KEYS_P2,
	stage
    });

    const player3 = new AIPlayer({
	x: 10,
	y: 0,
	color: 'White',
	stage
    });

    const player4 = new AIPlayer({
	x: 0,
	y: 12,
	color: 'Purple',
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
