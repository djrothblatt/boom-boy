/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = createjs;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var NUM_ROWS = exports.NUM_ROWS = 15; // number of boxes on x-axis
var NUM_COLS = exports.NUM_COLS = 13;
var BOX_X = exports.BOX_X = 25; // size of box on x-axis
var BOX_Y = exports.BOX_Y = 44;
var NUM_DESTRUCTIBLES = exports.NUM_DESTRUCTIBLES = 25;

var MOVE_KEYS_P1 = exports.MOVE_KEYS_P1 = {
    a: 'left',
    w: 'up',
    d: 'right',
    s: 'down',
    f: 'bomb'
};

var MOVE_KEYS_P2 = exports.MOVE_KEYS_P2 = {
    j: 'left',
    i: 'up',
    l: 'right',
    k: 'down',
    h: 'bomb'
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* Abstract class */


var _constants = __webpack_require__(1);

var _createjs = __webpack_require__(0);

var _createjs2 = _interopRequireDefault(_createjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Movable = function () {
    function Movable(_ref) {
        var x = _ref.x,
            y = _ref.y,
            color = _ref.color,
            stage = _ref.stage;

        _classCallCheck(this, Movable);

        this.x = x;
        this.y = y;
        this.color = color;
        this.stage = stage;
    }

    _createClass(Movable, [{
        key: 'draw',
        value: function draw(boxLength, boxHeight) {
            var sprite = new _createjs2.default.Bitmap('../assets/' + this.color + '-standing-player.png');
            sprite.x = this.x * boxLength;
            sprite.y = this.y * boxHeight;
            this.stage.addChild(sprite);
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.stage.removeChild(this);
        }
    }, {
        key: 'direction',
        value: function direction() {
            // instantiated by child classes
        }
    }, {
        key: 'move',
        value: function move(direction) {
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
    }]);

    return Movable;
}();

exports.default = Movable;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _movable = __webpack_require__(2);

var _movable2 = _interopRequireDefault(_movable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function randomInt(max) {
    // in { 0, 1 ..., max-1 }
    return Math.floor(Math.random() * max);
}

var AIPlayer = function (_Movable) {
    _inherits(AIPlayer, _Movable);

    function AIPlayer(_ref) {
        var x = _ref.x,
            y = _ref.y,
            color = _ref.color,
            stage = _ref.stage;

        _classCallCheck(this, AIPlayer);

        var _this = _possibleConstructorReturn(this, (AIPlayer.__proto__ || Object.getPrototypeOf(AIPlayer)).call(this, { x: x, y: y, color: color, stage: stage }));

        _this.resetMove();
        _this.resetBomb();
        return _this;
    }

    _createClass(AIPlayer, [{
        key: "resetMove",
        value: function resetMove() {
            this.ticksToMove = randomInt(10) + 1;
        }
    }, {
        key: "resetBomb",
        value: function resetBomb() {
            this.ticksToBomb = randomInt(55) + 1;
        }
    }, {
        key: "direction",
        value: function direction(_ref2) {
            var validMoves = _ref2.validMoves;

            if (this.ticksToMove-- === 0) {
                this.resetMove();
                return validMoves[randomInt(validMoves.length)];
            } else if (this.ticksToBomb-- === 0) {
                this.resetBomb();
                return "bomb";
            } else {
                return null;
            }
        }
    }]);

    return AIPlayer;
}(_movable2.default);

exports.default = AIPlayer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createjs = __webpack_require__(0);

var _createjs2 = _interopRequireDefault(_createjs);

var _movable = __webpack_require__(2);

var _movable2 = _interopRequireDefault(_movable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Movable) {
    _inherits(Player, _Movable);

    function Player(_ref) {
        var x = _ref.x,
            y = _ref.y,
            color = _ref.color,
            stage = _ref.stage,
            moveKeys = _ref.moveKeys;

        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, { x: x, y: y, color: color, stage: stage }));

        _this.moveKeys = moveKeys;
        return _this;
    }

    _createClass(Player, [{
        key: 'direction',
        value: function direction(_ref2) {
            var key = _ref2.key;

            if (_createjs2.default.Ticker.paused) return null;
            return this.moveKeys[key];
        }
    }]);

    return Player;
}(_movable2.default);

exports.default = Player;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(1);

var _createjs = __webpack_require__(0);

var _createjs2 = _interopRequireDefault(_createjs);

var _bomb = __webpack_require__(6);

var _bomb2 = _interopRequireDefault(_bomb);

var _movable = __webpack_require__(2);

var _movable2 = _interopRequireDefault(_movable);

var _ai_player = __webpack_require__(3);

var _ai_player2 = _interopRequireDefault(_ai_player);

var _player = __webpack_require__(4);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board(stage, humanPlayers, aiPlayers) {
        _classCallCheck(this, Board);

        this.numRows = _constants.NUM_ROWS;
        this.numCols = _constants.NUM_COLS;
        this.boxLength = _constants.BOX_X;
        this.boxHeight = _constants.BOX_Y;

        this.grid = [];

        for (var i = 0; i < this.numCols; i++) {
            var innerArray = [];

            for (var j = 0; j < this.numRows; j++) {
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

    _createClass(Board, [{
        key: 'draw',
        value: function draw() {
            var _this = this;

            for (var i = 0; i < this.numCols; i++) {
                for (var j = 0; j < this.numRows; j++) {
                    var xPos = i * this.boxLength;
                    var yPos = j * this.boxHeight;

                    var floorTile = new _createjs2.default.Bitmap('./assets/floor.png');
                    floorTile.x = xPos;
                    floorTile.y = yPos;
                    this.stage.addChild(floorTile);

                    var tileType = this.grid[i][j] || "floor";
                    if (tileType instanceof _movable2.default) {
                        tileType = "floor";
                    }

                    var tile = new _createjs2.default.Bitmap('./assets/' + tileType + '.png');
                    tile.x = xPos;
                    tile.y = yPos;
                    this.stage.addChild(tile);
                }
            }
            var players = this.humanPlayers.concat(this.aiPlayers);
            players.forEach(function (player) {
                return player.draw(_this.boxLength, _this.boxHeight);
            });
        }
    }, {
        key: 'hasObstacle',
        value: function hasObstacle(_ref) {
            var x = _ref.x,
                y = _ref.y;

            return ["brick", "destructibleBrick", "bomb"].includes(this.grid[x][y]);
        }
    }, {
        key: 'isOccupied',
        value: function isOccupied(_ref2) {
            var x = _ref2.x,
                y = _ref2.y;

            return this.hasObstacle({ x: x, y: y }) || this.grid[x][y] instanceof _movable2.default;
        }
    }, {
        key: 'placeBorder',
        value: function placeBorder() {
            for (var i = 0; i < this.numCols; i++) {
                this.grid[i][0] = "brick";
                this.grid[i][this.numRows - 1] = "brick";
            }
            for (var j = 0; j < this.numRows; j++) {
                this.grid[0][j] = "brick";
                this.grid[this.numCols - 1][j] = "brick";
            }
        }
    }, {
        key: 'placeDestructibles',
        value: function placeDestructibles() {
            for (var col = 3; col < this.numCols - 3; col++) {
                this.grid[col][1] = "destructibleBrick";
                this.grid[col][this.numRows - 2] = "destructibleBrick";
            }
            for (var _col = 2; _col < this.numCols - 2; _col++) {
                this.grid[_col][2] = "destructibleBrick";
                this.grid[_col][this.numRows - 3] = "destructibleBrick";
            }
            for (var _col2 = 1; _col2 < this.numCols - 1; _col2++) {
                for (var row = 3; row < this.numRows - 3; row++) {
                    this.grid[_col2][row] = "destructibleBrick";
                }
            }
        }
    }, {
        key: 'placeIndestructibles',
        value: function placeIndestructibles() {
            for (var i = 2; i < this.numCols - 2; i += 2) {
                for (var j = 2; j < this.numRows - 2; j += 2) {
                    this.grid[i][j] = "brick";
                }
            }
        }
    }, {
        key: 'placeObstacles',
        value: function placeObstacles() {
            this.placeBorder();
            this.placeDestructibles();
            this.placeIndestructibles();
        }
    }, {
        key: 'placeBomb',
        value: function placeBomb(player) {
            var _this2 = this;

            var x = player.x;
            var y = player.y;
            var bomb = new _bomb2.default({ x: x, y: y });
            this.grid[x][y] = "bomb";

            window.setTimeout(function () {
                _this2.grid[x][y] = undefined;
                var positionsInBounds = bomb.explosionPath().map(function (line) {
                    return line.filter(_this2.inBounds);
                });
                var unobstructedPositions = positionsInBounds.map(function (line) {
                    return _this2.removeObstructedPositions(line);
                });
                var flattened = unobstructedPositions.reduce(function (list, val) {
                    return list.concat(val);
                }, []);
                flattened.forEach(_this2.placeExplosion);
            }, bomb.lifetime);
        }
    }, {
        key: 'placeExplosion',
        value: function placeExplosion(_ref3) {
            var _this3 = this;

            var x = _ref3.x,
                y = _ref3.y;

            this.grid[x][y] = "explosion";
            window.setTimeout(function () {
                _this3.grid[x][y] = undefined;
            }, 750);
        }
    }, {
        key: 'clearDestructibles',
        value: function clearDestructibles(_ref4) {
            var x = _ref4.x,
                y = _ref4.y;

            if (this.grid[x][y] === "destructibleBrick") {
                this.grid[x][y] = undefined;
            } else if (this.grid[x][y] instanceof _movable2.default) {
                var targetArray = void 0;

                if (this.grid[x][y] instanceof _player2.default) {
                    targetArray = this.humanPlayers;
                } else {
                    targetArray = this.aiPlayers;
                }

                var targetIndex = targetArray.indexOf(this.grid[x][y]);
                targetArray.splice(targetIndex, 1);

                this.grid[x][y].remove();
                this.grid[x][y] = undefined;
            }
        }
    }, {
        key: 'removeObstructedPositions',
        value: function removeObstructedPositions(line) {
            var out = [];

            for (var i = 0, n = line.length; i < n; i++) {
                var pos = line[i];
                if (this.isOccupied(pos)) {
                    this.clearDestructibles(pos);
                    return out;
                } else {
                    out.push(pos);
                }
            };

            return out;
        }
    }, {
        key: 'inBounds',
        value: function inBounds(_ref5) {
            var x = _ref5.x,
                y = _ref5.y;

            return x >= 0 && y >= 0 && x < this.numCols && y < this.numRows;
        }
    }, {
        key: 'isValidMove',
        value: function isValidMove(player, direction) {
            var pos = { x: player.x, y: player.y };

            var newX = player.x;
            var newY = player.y;
            switch (direction) {
                case "left":
                    newX--;
                    break;
                case "right":
                    newX++;
                    break;
                case "up":
                    newY--;
                    break;
                case "down":
                    newY++;
                    break;
            }

            return this.inBounds({ x: newX, y: newY }) && !this.isOccupied({ x: newX, y: newY });
        }
    }, {
        key: 'movePlayers',
        value: function movePlayers(key) {
            var _this4 = this;

            this.humanPlayers.forEach(function (player) {
                return _this4.move(player, key);
            });
        }
    }, {
        key: 'moveAI',
        value: function moveAI() {
            var _this5 = this;

            this.aiPlayers.forEach(function (player) {
                return _this5.move(player, null);
            });
        }
    }, {
        key: 'move',
        value: function move(player, key) {
            var validMoves = ["left", "right", "up", "down"].filter(this.isValidMove.bind(this, player));
            var direction = player.direction({ key: key, validMoves: validMoves });
            var x = player.x;
            var y = player.y;
            if (direction === 'bomb' && this.grid[x][y] !== 'bomb') {
                this.placeBomb(player);
            } else if (this.isValidMove(player, direction)) {
                if (this.grid[x][y] !== "bomb") {
                    this.grid[x][y] = undefined;
                }

                player.move(direction);
                x = player.x;
                y = player.y;
                this.grid[x][y] = player;
            }
        }
    }]);

    return Board;
}();

exports.default = Board;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bomb = function () {
    function Bomb(_ref) {
        var x = _ref.x,
            y = _ref.y;

        _classCallCheck(this, Bomb);

        this.x = x;
        this.y = y;
        this.range = 3;
        this.lifetime = 3000;
    }

    _createClass(Bomb, [{
        key: "explosionPath",
        value: function explosionPath() {
            function oneUpto(n) {
                if (n <= 1) return [1];
                return oneUpto(n - 1).concat([n]);
            }

            function line(_ref2) {
                var _this = this;

                var dx = _ref2.dx,
                    dy = _ref2.dy;

                return oneUpto(this.range).reduce(function (list, i) {
                    return list.concat({
                        x: _this.x + dx * i,
                        y: _this.y + dy * i
                    });
                }, []);
            }

            line = line.bind(this);

            var left = { dx: -1, dy: 0 };
            var right = { dx: 1, dy: 0 };
            var up = { dx: 0, dy: -1 };
            var down = { dx: 0, dy: 1 };

            return [left, right, up, down].reduce(function (acc, direction) {
                return acc.concat([line(direction)]);
            }, [[{ x: this.x, y: this.y }]]);
        }
    }]);

    return Bomb;
}();

exports.default = Bomb;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createjs = __webpack_require__(0);

var _createjs2 = _interopRequireDefault(_createjs);

var _board = __webpack_require__(5);

var _board2 = _interopRequireDefault(_board);

var _player = __webpack_require__(4);

var _player2 = _interopRequireDefault(_player);

var _ai_player = __webpack_require__(3);

var _ai_player2 = _interopRequireDefault(_ai_player);

var _constants = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
    var stage = new _createjs2.default.Stage('gameEasel');
    var player1 = new _player2.default({
        x: 1,
        y: 1,
        color: 'white',
        moveKeys: _constants.MOVE_KEYS_P1,
        stage: stage
    });

    var player2 = new _player2.default({
        x: _constants.NUM_COLS - 2,
        y: 1,
        color: 'black',
        moveKeys: _constants.MOVE_KEYS_P2,
        stage: stage
    });

    var player3 = new _ai_player2.default({
        x: 1,
        y: _constants.NUM_ROWS - 2,
        color: 'red',
        stage: stage
    });

    var player4 = new _ai_player2.default({
        x: _constants.NUM_COLS - 2,
        y: _constants.NUM_ROWS - 2,
        color: 'blue',
        stage: stage
    });

    var board = new _board2.default(stage, [player1, player2], [player3, player4]);

    _createjs2.default.Ticker.addEventListener('tick', function () {
        return tick(board, stage);
    });
    _createjs2.default.Ticker.paused = true;

    var modal = document.getElementById('instructionsModal');
    modal.style.display = 'block';
    var span = document.getElementsByClassName('close')[0];
    span.onclick = function () {
        modal.style.display = 'none';
        _createjs2.default.Ticker.paused = false;
    };
    window.onclick = function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            _createjs2.default.Ticker.paused = false;
        }
    };
    document.onkeydown = function (e) {
        return handleKeyDown(e, board);
    };
}

function handleKeyDown(e, board) {
    var key = e.key;

    if (_constants.MOVE_KEYS_P1[key] || _constants.MOVE_KEYS_P2[key]) {
        e.preventDefault();
        board.movePlayers(key);
    }
    if (key == " ") {
        e.preventDefault();
        togglePause();
    }
}

function toggleModal() {
    var modal = document.getElementById('instructionsModal');
    var display = modal.style.display;
    modal.style.display = display === "block" ? "none" : "block";
}

function togglePause() {
    toggleModal();
    _createjs2.default.Ticker.paused = !_createjs2.default.Ticker.paused;
}

function tick(board, stage) {
    stage.removeAllChildren();
    if (!_createjs2.default.Ticker.paused) {
        board.moveAI();
    }
    board.draw();
    stage.update();
}

document.addEventListener('DOMContentLoaded', init);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map