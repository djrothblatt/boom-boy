import createjs from 'createjs';
import Bomb from './bomb';

export default class Player {
    constructor({x, y, color, stage, moveKeys}) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.stage = stage;
	this.moveKeys = moveKeys;
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

    direction(key) {
	return this.moveKeys[key];
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
