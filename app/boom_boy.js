import createjs from 'createjs';
import Board from './board';
import Player from './player';

const MOVE_KEYS = {
    ArrowLeft: 'left',
    ArrowUp: 'up',
    ArrowRight: 'right',
    ArrowDown: 'down',
    ' ': 'spacebar'
};
function init() {
    const stage = new createjs.Stage('gameEasel');
    const player = new Player({
	x: 0,
	y: 0,
	color: 'Blue',
	stage
    });
    const board = new Board(stage, player);

    document.onkeydown = e => handleKeyDown(e, board);
    createjs.Ticker.addEventListener('tick', () => tick(board, stage));
}

function handleKeyDown(e, board) {
    let direction = MOVE_KEYS[e.key];
    if (direction) {
	e.preventDefault();
	board.move(direction);
    }
}

function tick(board, stage) {
    stage.removeAllChildren();
    board.draw();
    stage.update();
}

document.addEventListener('DOMContentLoaded', init);
