const NUM_ROWS = 13; // number of boxes on x-axis
const NUM_COLS = 11;
const BOX_X = 30; // size of box on x-axis
const BOX_Y = 40;

import createjs from 'createjs';
import Player from './player';
import Bomb from './bomb';

class Board {
    constructor(stage, players) {
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
	this.players = players;

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

	this.players.forEach(player => player.draw(this.boxLength, this.boxHeight));
    }

    isOccupied(x, y) {
	return (["rock", "destructible-rock", "bomb"].includes(this.grid[x][y])) || (this.grid[x][y] instanceof Player);
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

    placeBomb(player) {
	const x = player.x;
	const y = player.y;
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
	}, 750);
    }

    clearDestructibles({x, y}) {
	if (this.grid[x][y] === "destructible-rock") {
	    this.grid[x][y] = undefined;
	} else if (this.grid[x][y] instanceof Player) {
	    this.grid[x][y].remove();
	    const index = this.players.indexOf(this.grid[x][y]);
	    this.grid[x][y] = undefined;
	    this.players.splice(index, 1);
	}
    }

    removeObstructedPositions(line) {
	let out = [];
	for (let i = 0, n = line.length; i < n; i++) {
	    const {x, y} = line[i];
	    if (this.isOccupied(x, y)) {
		this.clearDestructibles({x, y});
		return out;
	    } else {
		out.push({x, y});
	    }
	};
	return out;
    }

    inBounds({x, y}) {
	return (x >= 0) && (y >= 0) && (x < NUM_COLS) && (y < NUM_ROWS);
    }

    isValidMove(player, direction) {
	const pos = {x: player.x, y: player.y};

	let newX = player.x;
	let newY = player.y;
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

    moveAll(key) {
	this.players.forEach(player => this.move(player, key));
    }

    move(player, key) {
	const direction = player.direction(key);
	if (direction === 'bomb') {
	    this.placeBomb(player);
	} else if (this.isValidMove(player, direction)) {
	    let x = player.x;
	    let y = player.y;
	    if (this.grid[x][y] !== "bomb") {
		this.grid[x][y] = undefined;
	    }

	    player.move(direction);
	    x = player.x;
	    y = player.y;
	    this.grid[x][y] = player;
	}
    }
}

export default Board;
