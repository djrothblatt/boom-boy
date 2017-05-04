import createjs from 'createjs';
import Board from './board';
import Player from './player';

const MOVE_KEYS = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};
function init() {
    const stage = new createjs.Stage("gameEasel");
    const player = new Player({
	x: 1,
	y: 3,
	color: "Blue",
	stage
    });
    const board = new Board(stage, player);

    document.onkeydown = (e) => handleKeyDown(e, board);
    createjs.Ticker.addEventListener("tick", () => tick(board, stage));    
}

function handleKeyDown(e, board) {
    //    debugger
    
    let direction = MOVE_KEYS[e.keyCode];
    if (direction) {
	e.preventDefault();
	board.move(direction);
    }
}

function tick(board, stage) {
//    stage.clear();
    stage.removeAllChildren();
    board.draw();
    stage.update();
}

document.addEventListener("DOMContentLoaded", init);
