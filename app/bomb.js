export default class Bomb {
    constructor({x, y}) {
	this.x = x;
	this.y = y;
	this.range = 3;
	this.lifetime = 3000;
    }

    explosionPath() {
	function line({dx, dy}) {
	    return [1,2,3].reduce((list, i) => list.concat({
		x: this.x + (dx * i),
		y: this.y + (dy * i)
	    }), []);
	}
	line = line.bind(this);

	const left = {dx: -1, dy: 0};
	const right = {dx: 1, dy: 0};
	const up = {dx: 0, dy: -1};
	const down = {dx: 0, dy: 1};
	
	return [left, right, up, down].reduce((acc, direction) => acc.concat([line(direction)]), [[{x: this.x, y: this.y}]]);
    }
}
