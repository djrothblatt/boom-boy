/* Abstract class */

import createjs from 'createjs';

export default class Movable {
    constructor({x, y, color, stage}) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.stage = stage;
    }

    draw(boxLength, boxHeight) {
	const box = new createjs.Shape();
	box.graphics.beginFill(this.color).drawRect(
	    this.x * boxLength,
	    this.y * boxHeight,
	    boxLength,
	    boxHeight
	);
	this.stage.addChild(box);
    }
    
    remove() {
	this.stage.removeChild(this);
    }
    
    move(direction) {
    	switch (direction) {
    	case 'left':
    	    this.x--;
    	    return;
    	case 'right':
    	    this.x++;
    	    return;
    	case 'up':
    	    this.y--;
    	    return;
    	case 'down':
    	    this.y++;
    	    return;
    	default:
    	    return;
    	}
    }
}
