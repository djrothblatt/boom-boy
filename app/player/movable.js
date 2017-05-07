/* Abstract class */

import createjs from 'createjs';

export default class Movable {
    constructor({x, y, color, stage}) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.sprites = new createjs.SpriteSheet({
	    images: ["../assets/standing-player.png"],
	    frames: { width: 25, height: 44, numFrames: 1 },
	    animations: { stand: 0 }
	});
	this.stage = stage;
    }

    draw(boxLength, boxHeight) {
	let sprite = new createjs.Sprite(this.sprites, "stand");

	sprite.x = this.x * boxLength;
	sprite.y = this.y * boxHeight;
	this.stage.addChild(sprite);
    }

    remove() {
	this.stage.removeChild(this);
    }

    direction() {
	// instantiated by child classes
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
