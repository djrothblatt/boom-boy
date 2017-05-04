export default class Bomb {
    constructor({x, y}) {
	this.x = x;
	this.y = y;
	this.range = 3;
	this.lifetime = 3000;
    }

    explosionPath() {
	function ring(i) {
	    return [{x: this.x - i, y: this.y},
		    {x: this.x + i, y: this.y},
		    {x: this.x, y: this.y - i},
		    {x: this.x, y: this.y + i}];
	}
	ring = ring.bind(this);
	return [1, 2, 3].reduce((acc, i) => acc.concat(ring(i)), [{x: this.x, y: this.y}]);
    }
}
