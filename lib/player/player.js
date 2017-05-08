import Movable from './movable';

export default class Player extends Movable {
  constructor({x, y, color, stage, moveKeys}) {
    super({x, y, color, stage});
    this.moveKeys = moveKeys;
  }

  direction({key}) {
    return this.moveKeys[key];
  }
}
