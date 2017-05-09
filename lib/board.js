import { NUM_ROWS, NUM_COLS, BOX_X, BOX_Y, NUM_DESTRUCTIBLES } from './constants';

import createjs from 'createjs';
import Bomb from './bomb';
import Movable from './player/movable';
import AIPlayer from './player/ai_player';
import Player from './player/player';

class Board {
  constructor(stage, humanPlayers, aiPlayers) {
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
    this.humanPlayers = humanPlayers;
    this.aiPlayers = aiPlayers;

    this.inBounds = this.inBounds.bind(this);
    this.placeExplosion = this.placeExplosion.bind(this);
  }

  draw() {
    for (let i = 0; i < this.numCols; i++) {
      for (let j = 0; j < this.numRows; j++) {
	const xPos = i * this.boxLength;
	const yPos = j * this.boxHeight;

	const floorTile = new createjs.Bitmap('../assets/floor.png');
	floorTile.x = xPos;
	floorTile.y = yPos;
	this.stage.addChild(floorTile);

	let tileType = this.grid[i][j] || "floor";
	if (tileType instanceof Movable) { tileType = "floor"; }

	const tile = new createjs.Bitmap(`../assets/${tileType}.png`);
	tile.x = xPos;
	tile.y = yPos;
	this.stage.addChild(tile);
      }
    }
    const players = this.humanPlayers.concat(this.aiPlayers);
    players.forEach(player => player.draw(this.boxLength, this.boxHeight));
  }

  hasObstacle({x, y}) {
    return (["brick", "destructibleBrick", "bomb"].includes(this.grid[x][y]));
  }

  isOccupied({x, y}) {
    return this.hasObstacle({x, y}) || this.grid[x][y] instanceof Movable;
  }

  placeBorder() {
    for (let i = 0; i < this.numCols; i++) {
      this.grid[i][0] = "brick";
      this.grid[i][this.numRows - 1] = "brick";
    }
    for (let j = 0; j < this.numRows; j++) {
      this.grid[0][j] = "brick";
      this.grid[this.numCols - 1][j] = "brick";
    }
  }

  placeObstacles() {
    this.placeBorder();

    for (let i = 2; i < this.numCols - 2; i += 2) {
      for (let j = 2; j < this.numRows - 2; j += 2) {
	this.grid[i][j] = "brick";
      }
    }

    let numRandomObstacles = NUM_DESTRUCTIBLES;
    while (numRandomObstacles > 0) {
      let x = Math.floor(Math.random() * this.numCols);
      let y = Math.floor(Math.random() * this.numRows);
      if (!this.isOccupied({x, y})) {
	this.grid[x][y] = "destructibleBrick";
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
    if (this.grid[x][y] === "destructibleBrick") {
      this.grid[x][y] = undefined;
    } else if (this.grid[x][y] instanceof Movable) {
      let targetArray;

      if (this.grid[x][y] instanceof Player) {
      targetArray = this.humanPlayers;
      } else {
      targetArray = this.aiPlayers;
      }

      const targetIndex = targetArray.indexOf(this.grid[x][y]);
      targetArray.splice(targetIndex, 1);

      this.grid[x][y].remove();
      this.grid[x][y] = undefined;
    }
  }

  removeObstructedPositions(line) {
    let out = [];

    for (let i = 0, n = line.length; i < n; i++) {
      const pos = line[i];
      if (this.isOccupied(pos)) {
	this.clearDestructibles(pos);
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

    return this.inBounds({x: newX, y: newY}) && !this.isOccupied({x: newX, y: newY});
  }

  movePlayers(key) {
    this.humanPlayers.forEach(player => this.move(player, key));
  }

  moveAI() {
    this.aiPlayers.forEach(player => this.move(player, null));
  }

  move(player, key) {
    const validMoves = ["left", "right", "up", "down"].filter(this.isValidMove.bind(this, player));
    const direction = player.direction({key, validMoves});
    let x = player.x;
    let y = player.y;
    if (direction === 'bomb' && this.grid[x][y] !== 'bomb') {
      this.placeBomb(player);
    } else if (this.isValidMove(player, direction)) {
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
