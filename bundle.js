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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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


var _createjs = __webpack_require__(0);

var _createjs2 = _interopRequireDefault(_createjs);

var _board = __webpack_require__(3);

var _board2 = _interopRequireDefault(_board);

var _player = __webpack_require__(4);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MOVE_KEYS = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};
function init() {
    var stage = new _createjs2.default.Stage("gameEasel");
    var player = new _player2.default({
        x: 1,
        y: 3,
        color: "Blue",
        stage: stage
    });
    var board = new _board2.default(stage, player);

    document.onkeydown = function (e) {
        return handleKeyDown(e, board);
    };
    _createjs2.default.Ticker.addEventListener("tick", function () {
        return tick(board, stage);
    });
}

function handleKeyDown(e, board) {
    e.preventDefault();
    var direction = MOVE_KEYS[e.keyCode];
    console.log(direction);
    board.move(direction);
}

function tick(board, stage) {
    board.draw();
    stage.update();
}

document.addEventListener("DOMContentLoaded", init);

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createjs = __webpack_require__(0);

var _createjs2 = _interopRequireDefault(_createjs);

var _player = __webpack_require__(4);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DIM_X = 13; // number of boxes on x-axis
var DIM_Y = 11;
var BOX_X = 30; // size of box on x-axis
var BOX_Y = 40;

var Board = function () {
			function Board(stage, player) {
						var _this = this;

						_classCallCheck(this, Board);

						this.dimX = DIM_X;
						this.dimY = DIM_Y;
						this.boxLength = BOX_X;
						this.boxHeight = BOX_Y;
						this.grid = new Array(this.dimY).map(function (row) {
									return new Array(_this.dimX);
						});
						this.stage = stage;
						this.player = player;
			}

			_createClass(Board, [{
						key: 'draw',
						value: function draw() {
									this.stage.clear();
									this.stage.update();

									for (var i = 0; i < this.dimY; i++) {
												for (var j = 0; j < this.dimX; j++) {
															var box = new _createjs2.default.Shape();
															var color = i % 2 === j % 2 ? "Green" : "Red";
															box.graphics.beginFill(color).drawRect(i * this.boxLength, j * this.boxHeight, this.boxLength, this.boxHeight);
															this.stage.addChild(box);
															this.stage.update();
												}
									}

									this.player.draw(this.boxLength, this.boxHeight);
						}
			}, {
						key: 'isValidMove',
						value: function isValidMove(direction) {
									switch (direction) {
												case "left":
															return this.player.x > 0;
												case "right":
															return this.player.x < this.dimX;
												case "up":
															return this.player.y > 0;
												case "down":
															return this.player.y < this.dimY;
												default:
															return false;
									}
						}
			}, {
						key: 'move',
						value: function move(direction) {
									if (this.isValidMove(direction)) {
												this.player.move(direction);
									}
						}
			}]);

			return Board;
}();

exports.default = Board;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
			function Player(_ref) {
						var x = _ref.x,
						    y = _ref.y,
						    color = _ref.color,
						    stage = _ref.stage;

						_classCallCheck(this, Player);

						this.x = x;
						this.y = y;
						this.color = color;
						this.stage = stage;
			}

			_createClass(Player, [{
						key: "draw",
						value: function draw(boxLength, boxHeight) {
									var box = new _createjs2.default.Shape();
									box.graphics.beginFill(this.color).drawRect(this.x * boxLength, this.y * boxHeight, boxLength, boxHeight);
									this.stage.addChild(box);
									this.stage.update();
						}
			}, {
						key: "move",
						value: function move(direction) {
									switch (direction) {
												case "left":
															this.x--;
															return;
												case "right":
															this.x++;
															return;
												case "up":
															this.y--;
															return;
												case "down":
															this.y++;
															return;
												default:
															return;
									}
						}
			}]);

			return Player;
}();

exports.default = Player;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map