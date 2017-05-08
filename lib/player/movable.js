/* Abstract class */
import { BOX_X, BOX_Y } from '../constants';
import createjs from 'createjs';

export default class Movable {
  constructor({x, y, color, stage}) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.stage = stage;
  }

  draw(boxLength, boxHeight) {
    let sprite = new createjs.Bitmap(`../assets/${this.color}-standing-player.png`);
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
