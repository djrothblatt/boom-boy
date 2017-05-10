import createjs from 'createjs';
import Movable from './movable';

export default class Player extends Movable {
    constructor({x, y, color, stage, moveKeys}) {
        super({x, y, color, stage});
        this.moveKeys = moveKeys;
    }

    direction({key}) {
	if (createjs.Ticker.paused) return null;
	return this.moveKeys[key];
    }
}
