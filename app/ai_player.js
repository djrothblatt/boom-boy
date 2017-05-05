import Movable from './movable';

function randomInt(max) { // in { 0, 1 ..., max-1 }
    return Math.floor(Math.random() * max) + 1;
}

export default class AIPlayer extends Movable {
    constructor({x, y, color, stage}) {
	super({x, y, color, stage});
	this.resetMove();
	this.resetBomb();
    }

    resetMove() {
	this.ticksToMove = randomInt(8) + 1;
    }

    resetBomb() {
	this.ticksToBomb = randomInt(15) + 1;
    }
    
    direction({validMoves}) {
	if (--this.ticksToMove === 0) {
	    this.resetMove();
	    return validMoves[randomInt(validMoves.length)];
	} else if (--this.ticksToBomb === 0) {
	    this.resetBomb();
	    return "bomb";	    
	} else {
	    return undefined;
	}
    }
}
