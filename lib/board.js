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

        this.totalPlayers = 4;
        this.grid = [];

        for (let i = 0; i < this.numCols; i++) {
            let innerArray = [];

            for (let j = 0; j < this.numRows; j++) {
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
                const floorTile = new createjs.Bitmap('./assets/floor.png');

                floorTile.x = xPos;
                floorTile.y = yPos;
                this.stage.addChild(floorTile);

                let tileType = this.grid[i][j] || 'floor';
                if (tileType instanceof Movable) { tileType = 'floor'; }

                const tile = new createjs.Bitmap(`./assets/${tileType}.png`);
                tile.x = xPos;
                tile.y = yPos;
                this.stage.addChild(tile);
            }
        }
        const players = this.humanPlayers.concat(this.aiPlayers);
        players.forEach(player => player.draw(this.boxLength, this.boxHeight));
    }

    hasObstacle({x, y}) {
        return (['brick', 'destructibleBrick', 'bomb'].includes(this.grid[x][y]));
    }

    isOccupied({x, y}) {
        return this.hasObstacle({x, y}) || this.grid[x][y] instanceof Movable;
    }

    placeBorder() {
        for (let i = 0; i < this.numCols; i++) {
            this.grid[i][0] = 'brick';
            this.grid[i][this.numRows - 1] = 'brick';
        }
        for (let j = 0; j < this.numRows; j++) {
            this.grid[0][j] = 'brick';
            this.grid[this.numCols - 1][j] = 'brick';
        }
    }

    placeDestructibles() {
        for (let col = 3; col < this.numCols - 3; col++) {
            this.grid[col][1] = 'destructibleBrick';
            this.grid[col][this.numRows - 2] = 'destructibleBrick';
        }
        for (let col = 2; col < this.numCols - 2; col++) {
            this.grid[col][2] = 'destructibleBrick';
            this.grid[col][this.numRows - 3] = 'destructibleBrick';
        }
        for (let col = 1; col < this.numCols - 1; col++) {
            for (let row = 3; row < this.numRows - 3; row++) {
                this.grid[col][row] = 'destructibleBrick';
            }
        }
    }

    placeIndestructibles() {
        for (let i = 2; i < this.numCols - 2; i += 2) {
            for (let j = 2; j < this.numRows - 2; j += 2) {
                this.grid[i][j] = 'brick';
            }
        }        
    }

    placeObstacles() {
        this.placeBorder();
        this.placeDestructibles();
        this.placeIndestructibles();
    }

    placeBomb(player) {
        const x = player.x;
        const y = player.y;
        const bomb =  new Bomb({x, y});
        this.grid[x][y] = 'bomb';

        window.setTimeout(() => {
            this.grid[x][y] = undefined;
            const positionsInBounds = bomb.explosionPath().map(line => line.filter(this.inBounds));
            const unobstructedPositions = positionsInBounds.map(line => this.removeObstructedPositions(line));
            const flattened = unobstructedPositions.reduce((list, val) => list.concat(val), []);
            flattened.forEach(this.placeExplosion);
        }, bomb.lifetime);
    }

    placeExplosion({x, y}) {
        this.grid[x][y] = 'explosion';
        window.setTimeout(() => {
            this.grid[x][y] = undefined;
        }, 750);
    }

    clearDestructibles({x, y}) {
        if (this.grid[x][y] === 'destructibleBrick') {
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

            this.totalPlayers--;
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
        return (x >= 0) && (y >= 0) && (x < this.numCols) && (y < this.numRows);
    }

    isValidMove(player, direction) {
        const pos = {x: player.x, y: player.y};

        let newX = player.x;
        let newY = player.y;
        switch (direction) {
        case 'left':
            newX--;
            break;
        case 'right':
            newX++;
            break;
        case 'up':
            newY--;
            break;
        case 'down':
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
        const validMoves = ['left', 'right', 'up', 'down'].filter(this.isValidMove.bind(this, player));
        const direction = player.direction({key, validMoves});
        let x = player.x;
        let y = player.y;
        if (direction === 'bomb' && this.grid[x][y] !== 'bomb') {
            this.placeBomb(player);
        } else if (this.isValidMove(player, direction)) {
            if (this.grid[x][y] !== 'bomb') {
                this.grid[x][y] = undefined;
            }

        player.move(direction);
        x = player.x;
        y = player.y;
        this.grid[x][y] = player;
        }
    }

    isGameOver() {
        return this.totalPlayers <= 1;
    }
}

export default Board;
