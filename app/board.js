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

	this.grid = [];
	for (let i = 0; i < DIM_Y; i++) {
	    let innerArray = [];
	    for (let j = 0; j < DIM_X; j++) {
		innerArray.push(undefined);
	    }
	    this.grid.push(innerArray);
	}

	this.placeObstacles();
	this.stage = stage;
	this.player = player;
    }

    draw() {
	for (let i = 0; i < this.dimY; i++) {
	    for (let j = 0; j < this.dimX; j++) {
		const box = new createjs.Shape();
		const color = this.at(i, j) === "rock" ? "Gray" : "Green";
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

    placeObstacles() {
	for (let i = 1; i < this.dimY; i += 2) {
	    for (let j = 1; j < this.dimX; j += 2) {
		this.grid[i][j] = "rock";
	    }
	}
    }

    at(x, y) {
	return this.grid[x][y];
    }
    
    playerCanMove(direction) {
	let newX = this.player.x;
	let newY = this.player.y;
	switch (direction) {
	case "left":
	    newX--;
	    break;
	case "right":
	    newX++;
	    break;
	case "up":
	    newY--;
	    break;
	case "down":
	    newY++;
	    break;
	}

	return this.at(newX, newY) !== "rock";
    }
    
    isValidMove(direction) {
	let inBounds;
	switch (direction) {
	case "left":
	    inBounds = (this.player.x > 0);
	    break;
	case "right":
	    inBounds = (this.player.x < this.dimY - 1);
	    break;
	case "up":
	    inBounds = (this.player.y > 0);
	    break;
	case "down":
	    inBounds = (this.player.y < this.dimX - 1);
	    break;
	default:
	    inBounds = false;
	}

	return inBounds && this.playerCanMove(direction);
    }
    
    move(direction) {
	if (this.isValidMove(direction)) this.player.move(direction);
    }
}

export default Board;
