const NUM_ROWS = 13; // number of boxes on x-axis
const NUM_COLS = 11;
const BOX_X = 30; // size of box on x-axis
const BOX_Y = 40;

import createjs from 'createjs';
import Player from './player';
import Bomb from './bomb';

class Board {
    constructor(stage, player) {
	this.numRows = NUM_ROWS;
	this.numCols = NUM_COLS;
	this.boxLength = BOX_X;
	this.boxHeight = BOX_Y;

	this.grid = [];

	for (let i = 0; i < NUM_COLS; i++) {
	    let innerArray = [];
	    for (let j = 0; j < NUM_ROWS; j++) {
		innerArray.push(undefined);
	    }
	    this.grid.push(innerArray);
	}

	this.placeObstacles();
	this.stage = stage;
	this.player = player;

	this.inBounds = this.inBounds.bind(this);
	this.placeExplosion = this.placeExplosion.bind(this);
    }

    draw() {
	for (let i = 0; i < this.numCols; i++) {
	    for (let j = 0; j < this.numRows; j++) {
		const box = new createjs.Shape();

		let color;
		if (this.grid[i][j] === "rock") {
		    color = "Gray";
		} else if (this.grid[i][j] === "destructible-rock") {
		    color = "Black";
		} else if (this.grid[i][j] === "explosion") {
		    color = "Red";
		} else if (this.grid[i][j] === "bomb") {
		    color = "Yellow";
		} else {
		    color = "Green";
		}

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

    isOccupied(x, y) {
	return (["rock", "destructible-rock", "bomb"].includes(this.grid[x][y]));
    }

    placeObstacles() {
	for (let i = 1; i < this.numCols; i += 2) {
	    for (let j = 1; j < this.numRows; j += 2) {
		this.grid[i][j] = "rock";
	    }
	}

	let numRandomObstacles = 10;
	while (numRandomObstacles > 0) {
	    let x = Math.floor(Math.random() * this.numCols);
	    let y = Math.floor(Math.random() * this.numRows);
	    if (!this.isOccupied(x, y)) {
		this.grid[x][y] = "destructible-rock";
		numRandomObstacles--;
	    }
	}
    }

    placeBomb() {
	const x = this.player.x;
	const y = this.player.y;
	const bomb =  new Bomb({x, y});
	this.grid[x][y] = "bomb";
	window.setTimeout(() => {
	    this.grid[x][y] = undefined;
	    const positionsInBounds = bomb.explosionPath().map(line => line.filter(this.inBounds));
	    const unobstructedPositions = positionsInBounds.map(line => this.removeObstructedPositions(line));
	    const flattened = unobstructedPositions.reduce((list, val) => list.concat(val), []);
	    flattened.forEach(this.placeExplosion);
	}, bomb.lifetime);
    }

    placeExplosion({x, y}) {
	this.grid[x][y] = "explosion";
	window.setTimeout(() => {
	    this.grid[x][y] = undefined;
	}, 2000);
    }

    removeObstructedPositions(line) {
	let out = [];
	for (let i = 0, n = line.length; i < n; i++) {
	    const pos = line[i];
	    if (this.isOccupied(pos.x, pos.y)) {
		return out;
	    } else {
		out.push(pos);
	    }
	};
	return out;
    }

    inBounds({x, y}) {
	return (x >= 0) && (y >= 0) && (x < NUM_COLS) && (y < NUM_ROWS);
    }

    isValidMove(direction) {
	const pos = {x: this.player.x, y: this.player.y};

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

	return this.inBounds({x: newX, y: newY}) && !this.isOccupied(newX, newY);
    }

    move(direction) {
	if (direction === "spacebar") {
	    this.placeBomb();
	} else if (this.isValidMove(direction)) {
	    this.player.move(direction);
	}
    }
}

export default Board;
