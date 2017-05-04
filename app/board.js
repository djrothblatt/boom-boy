const DIM_X = 13; // number of boxes on x-axis
const DIM_Y = 11;
const BOX_X = 30; // size of box on x-axis
const BOX_Y = 40;

import createjs from 'createjs';
import Player from './player';

class Board {
    constructor(stage, player) {
	this.dimX = DIM_X;
	this.dimY = DIM_Y;
	this.boxLength = BOX_X;
	this.boxHeight = BOX_Y;
	this.grid = new Array(this.dimY).map(row => {
	    return new Array(this.dimX);
	});
	this.stage = stage;
	this.player = player;
    }

    draw() {
	for (let i = 0; i < this.dimY; i++) {
	    for (let j = 0; j < this.dimX; j++) {
		const box = new createjs.Shape();
		const color = i % 2 === j % 2 ? "Green" : "Red";
		box.graphics.beginFill(color).drawRect(
		    i * this.boxLength,
		    j * this.boxHeight,
		    this.boxLength,
		    this.boxHeight
		);
		this.stage.addChild(box);
	    }
	}

	this.player.draw(this.boxLength, this.boxHeight);
    }

    isValidMove(direction) {
	switch (direction) {
	case "left":
	    return (this.player.x > 0);
	case "right":
	    return (this.player.x < this.dimY - 1);
	case "up":
	    return (this.player.y > 0);
	case "down":
	    return (this.player.y < this.dimX - 1);
	default:
	    return false;
	}
    }

    move(direction) {
	if (this.isValidMove(direction)) {
	    this.player.move(direction);
	}
    }
}

export default Board;
