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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./zelda.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Hud height is scaled up: 168
// map screens are 768 x 528 (256 x 176)
// world is a 16 x 8 grid

class Board {
  constructor(worldCtx, collisionCtx) {
    this.worldCtx = worldCtx
    this.collisionCtx = collisionCtx
    this.overworld = new Image();
    this.overworld.src = './assets/images/maps/overworld.png'
    this.collisionMap = new Image();
    this.collisionMap.src = './assets/images/maps/overworld-collision.png'
    
    // this.music = new Audio("./assets/sfx/overworld.mp3");
    // this.music.autoplay();
    // this.music.loop = true;
    // this.music.play();
    
    this.pos = { x: 5376, y: 3528 }
  }

  setLocation(playerPos, worldPos, map, collisionMap) {

  }

  scroll(direction) {

  }


  getMapPos() {
    return { x: this.pos.x / 768, y: (this.pos.y + 168) / 528}
  }

  render() {
    this.drawWorld();
    this.drawCollisionMap();
  }

  drawWorld() {
    this.worldCtx.drawImage(
      this.overworld,
      this.pos.x, // x axis anchor point
      this.pos.y, // y axis anchor point
      768,
      696,
      0,
      0,
      768,
      696
    )
  }

  drawCollisionMap() {
    this.collisionCtx.drawImage(
      this.collisionMap,
      this.pos.x, // x axis anchor point
      this.pos.y, // y axis anchor point
      768,
      696,
      0,
      0,
      768,
      696
    )
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Board);



/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/input */ "./src/util/input.js");
/* harmony import */ var _hud_hud_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hud/hud.js */ "./src/hud/hud.js");
/* harmony import */ var _player_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player/player */ "./src/player/player.js");
/* harmony import */ var _units_spawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./units/spawn */ "./src/units/spawn.js");
/* harmony import */ var _units_spark__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./units/spark */ "./src/units/spark.js");
/* harmony import */ var _units_octorok__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./units/octorok */ "./src/units/octorok.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./board */ "./src/board.js");
/* harmony import */ var _util_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util/constants */ "./src/util/constants.js");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/util */ "./src/util/util.js");










// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles
// TODO: remove keymaster dependancy!

class Game {
  constructor(hudCtx, spriteCtx, boardCtx, collisionCtx) {
    this.hud = new _hud_hud_js__WEBPACK_IMPORTED_MODULE_1__["default"](hudCtx);
    this.player = new _player_player__WEBPACK_IMPORTED_MODULE_2__["default"](spriteCtx);
    this.board = new _board__WEBPACK_IMPORTED_MODULE_6__["default"](boardCtx, collisionCtx);
    this.spriteCtx = spriteCtx;
    this.collisionCtx = collisionCtx;

    this.startmusic = new Audio("./assets/sfx/overworldstart.ogg")
    this.startmusic.volume = 0.2
    this.music = new Audio("./assets/sfx/overworld.ogg");
    this.music.volume = 0.2;
    // this.music.autoplay();
    // this.music.loop = true;
    // this.music.play();

    // game sounds
    this.unitDeath = new Audio("./assets/sfx/destroy-enemy.wav");

    // game scroll logic
    this.scrolling = false;
    this.scrollQueue = 0;

    // npc placement
    this.units = [];
    this.grid = null; // collection of grid squares with color data of center 4 pixels.
    this.openSpaces = null; // Array of subarrays.  Each contain a x/y pixel position pair.
    this.enemyCount = 0;

    this.input = new _util_input__WEBPACK_IMPORTED_MODULE_0__["default"];

    this.muted = false;
    this.live = false;
    document.addEventListener('keydown', e => {
      if (e.keyCode === 13 && !this.live) {
        this.live = true;
        this.hud.clearStartPage();
        this.startmusic.play();
        setTimeout(() => {
          this.music.play();
          this.music.loop = true;
        }, 6410);
        // this.music.play();
        // this.music.loop = true;
      }
      if (this.player.hp <= 0 && e.keyCode === 13) {
        this.destroyUnits();
        this.player.reset();
        this.board.pos = { x: 5376, y: 3528 }
        this.board.render();
        this.hud.render()
        this.player.render();
        this.hud.clearStartPage();
        this.hud.death = false;
        this.startmusic.play();
        setTimeout(() => {
          this.music.play();
          this.music.loop = true;
        }, 6410);
      }
      if (e.keyCode === 77) {
        if (this.muted) {
          this.startmusic.volume = .2
          this.music.volume = .2
          this.muted = false;
        } else {
          this.startmusic.volume = 0
          this.music.volume = 0
          this.muted = true;
        }
      }
    });
  }
  
  init() {
    this.board.render();
    this.hud.render()
    this.player.render();
    this.hud.renderStartPage();
    requestAnimationFrame(() => this.gameLoop())
  }

  gameLoop() {
    // let now = Date.now();
    // let dt = (now - lastTime) / 1000.0;
    this.clear()
    this.step(this.collisionCtx);
    this.draw()
    requestAnimationFrame(() => this.gameLoop())
  }

  clear() {
    this.clearUnits();
    this.clearAttacks();
    this.player.clear();
  }

  step(collisionCtx) {
    this.checkBorder();
    this.scroll(collisionCtx);
    this.processInput(collisionCtx);
    this.stepUnits(collisionCtx);
    this.player.step();
  }

  draw() {
    if (this.player.hp <= 0) {
      this.hud.renderDeathPage();
      this.music.pause();
      this.music.currentTime = 0;
    }
    this.drawUnits();
    this.drawAttacks();
    this.player.render();
  }

  clearUnits() {
    this.units.forEach(unit => unit.clear())
  }

  clearAttacks() {
    this.player.attacks.forEach(attack => attack.clear())
  }

  stepUnits(collisionCtx) {
    if (this.player.frames.knockback) this.knockBackPlayer(collisionCtx)

    this.units.forEach((unit, i) => {
      if (unit instanceof _units_spawn__WEBPACK_IMPORTED_MODULE_3__["default"] && unit.runCycle <= 0) {
        this.units[i] = new _units_octorok__WEBPACK_IMPORTED_MODULE_5__["default"](unit.pixelPos, this.grid, this.spriteCtx)
      }

      unit.step();
      this.checkCollisionsAgainstPlayer(unit);

      this.player.attacks.forEach(attack => {
        if (_util_util__WEBPACK_IMPORTED_MODULE_8__["checkCollision"](attack.hitBox, unit.pos)) this.damageUnit(unit)
      })

      // if (unit instanceof Spark && unit.runCycle > 16) {
      //   this.units.splice(this.units.indexOf(i), 1)
      // }
    })
  }

  checkCollisionsAgainstPlayer(unit) {
    if (unit instanceof _units_spawn__WEBPACK_IMPORTED_MODULE_3__["default"] || unit instanceof _units_spark__WEBPACK_IMPORTED_MODULE_4__["default"]) return;
    if (_util_util__WEBPACK_IMPORTED_MODULE_8__["checkCollision"](this.player.hitbox, unit.pos)) this.damagePlayer();
  }

  damagePlayer(damage) {
    if (this.player.hp <= 0) return;
    this.player.takeDamage();
    this.hud.updateHearts(this.player.hp)
    if (this.player.hp <= 0) this.killPlayer();
  }

  killPlayer() {
    this.unitDeath.play();
    this.units.push(new _units_spark__WEBPACK_IMPORTED_MODULE_4__["default"](this.player.pos, this.spriteCtx))
    // Object.assign({x: null, y: null}, this.player.pos)
  }

  damageUnit(unit, damage) {
    unit.takeDamage(damage);
    if (unit.hp <= 0) this.killUnit(unit)
  }


  killUnit(unit) {
    this.unitDeath.play();
    this.units.splice(this.units.indexOf(unit), 1)
    this.units.push(new _units_spark__WEBPACK_IMPORTED_MODULE_4__["default"](unit.pos, this.spriteCtx))
  }

  knockBackPlayer(ctx) {
    // if (!this.player.frames.knockback) return;
    let faceDirection = this.player.pos.direction
    let x = this.player.pos.x
    let y = this.player.pos.y

    if (faceDirection === 96 && y < 634 && !this.impassableTerrain('down',ctx)) {
      this.player.move(0, 12)
    } else if (faceDirection === 144 && x > 14 && !this.impassableTerrain('left', ctx)) {
      this.player.move(-12, 0)
    } else if (faceDirection === 0 && y > 188 && !this.impassableTerrain('up', ctx)) {
      this.player.move(0, -12)
    } else if (faceDirection === 48 && x < 706 && !this.impassableTerrain('right', ctx)) {
      this.player.move(12, 0)
    }
  }

  drawUnits() {
    this.units.forEach(unit => unit.draw())
  }

  drawAttacks() {
    this.player.attacks.forEach(attack => attack.draw())
  }

  scanGrid(ctx) {
    let newGrid = [];
    let openSpaces = [];
    for (let y = 168; y < 696; y += 48) {
      let row = [];
      for (let x = 0; x < 768; x += 48) {
        let value = _util_util__WEBPACK_IMPORTED_MODULE_8__["scanMapTile"](ctx, x, y);
        row.push(value);
        if (value === 1020) openSpaces.push([x, y]);
      }
      newGrid.push(row);
    }
    this.openSpaces = openSpaces;
    this.grid = newGrid;
  }

  setSpawns() {
    for (let i = 0; i < this.enemyCount; i++) {
      let pixelPos = this.openSpaces[Math.floor(Math.random() * this.openSpaces.length)];
      this.units.push(new _units_spawn__WEBPACK_IMPORTED_MODULE_3__["default"](pixelPos, this.spriteCtx));
    }
  }
  
  // Scrolling logic below
  scroll(collisionCtx) {
    if (!this.scrolling) return;
    if (this.scrollQueue <= 0) {
      this.hud.updateMiniMap(this.board.getMapPos())
      this.scrolling = false;
      this.board.drawCollisionMap(collisionCtx)
      this.scanGrid(collisionCtx);
      this.setSpawns();
    } else {
      let playerDirection = this.player.pos.direction
      if (playerDirection === 96) {
        this.board.pos.y -= 8;
        if (this.scrollQueue > 48) this.player.move(0, 8)
      }
      if (playerDirection === 144) {
        this.board.pos.x += 8;
        if (this.scrollQueue > 48) this.player.move(-8, 0)
      }
      if (playerDirection === 0) {
        this.board.pos.y += 8;
        if (this.scrollQueue > 48) this.player.move(0, -8)
      }
      if (playerDirection === 48) {
        this.board.pos.x -= 8;
        if (this.scrollQueue > 48) this.player.move(8, 0)
      }
      this.scrollQueue -= 8;
      this.board.drawWorld()
    }
  }

  checkBorder() {
    if (this.player.pos.y < _util_constants__WEBPACK_IMPORTED_MODULE_7__["BORDERTOP"] || this.player.pos.y > _util_constants__WEBPACK_IMPORTED_MODULE_7__["BORDERBOTTOM"]) {
      this.scrolling = true;
      this.destroyUnits()
      this.scrollQueue = 528;
    }
    if (this.player.pos.x > _util_constants__WEBPACK_IMPORTED_MODULE_7__["BORDERRIGHT"] || this.player.pos.x < _util_constants__WEBPACK_IMPORTED_MODULE_7__["BORDERLEFT"]) {
      this.scrolling = true;
      this.destroyUnits()
      this.scrollQueue = 768;
    }
  }

  destroyUnits() {
    this.clearUnits();
    this.units = [];
    this.enemyCount = (_util_util__WEBPACK_IMPORTED_MODULE_8__["random"](1, 6)) // reload enemy count for next screen.
  }

  // collision layer check below
  checkIfBarrier(pixel1, pixel2) {
    let pixel1value = _util_util__WEBPACK_IMPORTED_MODULE_8__["sumArr"](pixel1)
    let pixel2value = _util_util__WEBPACK_IMPORTED_MODULE_8__["sumArr"](pixel2)
    if (pixel1value === _util_constants__WEBPACK_IMPORTED_MODULE_7__["WALL"] || pixel1value === _util_constants__WEBPACK_IMPORTED_MODULE_7__["WATER"]) return true;
    if (pixel2value === _util_constants__WEBPACK_IMPORTED_MODULE_7__["WALL"] || pixel2value === _util_constants__WEBPACK_IMPORTED_MODULE_7__["WATER"]) return true;
    return false;
  }

  impassableTerrain(direction, ctx) {
    if (direction === 'up') {
      const topPixel = _util_util__WEBPACK_IMPORTED_MODULE_8__["getMapPixel"](
        ctx,
        this.player.tracebox.topLeft[0],
        this.player.tracebox.topLeft[1] - 3)
      const bottomPixel = _util_util__WEBPACK_IMPORTED_MODULE_8__["getMapPixel"](
        ctx,
        this.player.tracebox.topRight[0],
        this.player.tracebox.topRight[1] - 3)
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'right') {
      const topPixel = _util_util__WEBPACK_IMPORTED_MODULE_8__["getMapPixel"](
        ctx,
        this.player.tracebox.topRight[0] + 3,
        this.player.tracebox.topRight[1])
      const bottomPixel = _util_util__WEBPACK_IMPORTED_MODULE_8__["getMapPixel"](
        ctx,
        this.player.tracebox.bottomRight[0] + 3,
        this.player.tracebox.bottomRight[1])
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'down') {
      const topPixel = _util_util__WEBPACK_IMPORTED_MODULE_8__["getMapPixel"](
        ctx,
        this.player.tracebox.bottomLeft[0],
        this.player.tracebox.bottomLeft[1] + 3)
      const bottomPixel = _util_util__WEBPACK_IMPORTED_MODULE_8__["getMapPixel"](
        ctx,
        this.player.tracebox.bottomRight[0],
        this.player.tracebox.bottomRight[1] + 3)
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'left') {
      const topPixel = _util_util__WEBPACK_IMPORTED_MODULE_8__["getMapPixel"](
        ctx,
        this.player.tracebox.topLeft[0] - 3,
        this.player.tracebox.topRight[1])
      const bottomPixel = _util_util__WEBPACK_IMPORTED_MODULE_8__["getMapPixel"](
        ctx,
        this.player.tracebox.bottomLeft[0] - 3,
        this.player.tracebox.bottomLeft[1])
      return this.checkIfBarrier(topPixel, bottomPixel)
    }
  }

  processInput(ctx) {
    if (this.scrolling) return;
    if (!this.live) return;
    let direction = this.input.getInput()
    let speed = null;
    switch (direction) {
      case 'attack':
        this.player.attack();
        return;
      case 'up':
        speed = this.impassableTerrain(direction, ctx) ? 0 : -4
        this.player.move(0, speed, direction)
        break;
      case 'right':
        speed = this.impassableTerrain(direction, ctx) ? 0 : 4
        this.player.move(speed, 0, direction)
        break;
      case 'down':
        speed = this.impassableTerrain(direction, ctx) ? 0 : 4
        this.player.move(0, speed, direction)
        break;
      case 'left':
        speed = this.impassableTerrain(direction, ctx) ? 0 : -4
        this.player.move(speed, 0, direction)
        break;
    }
  }
}




/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./src/hud/hud.js":
/*!************************!*\
  !*** ./src/hud/hud.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ "./src/util/util.js");


class Hud {
  constructor(ctx) {
    this.ctx = ctx;
    this.pos = { x: 0, y: 0 }
    this.image = new Image();
    this.image.src = "./assets/images/ui/menu.png"
    this.heartSprite = new Image();
    this.heartSprite.src = "./assets/images/items/hearts.png"
    this.numbers = new Image();
    this.numbers.src = "./assets/images/ui/numbers.png"
    this.primaryitems = new Image();
    this.primaryitems.src = './assets/images/items/primaryItems.png'

    this.startPage = new Image();
    this.startPage.src = './assets/images/ui/start.png'

    this.deathPage = new Image();
    this.deathPage.src = './assets/images/ui/deathpage.png'

    this.maxHearts = 6;
    this.slotA = null;
    this.slotB = null;

    this.death = false;
  }

  renderStartPage() {
    this.ctx.drawImage(
      this.startPage, 0, 0
    )
  }

  renderDeathPage() {
    if (this.death === false) {
      this.ctx.drawImage(
        this.deathPage, 0, 0
      )
      this.death = true;
    }
  }

  clearStartPage() {
    this.ctx.clearRect(0, 0, 768, 696)
    this.render()
  }

  render() {
    this.ctx.drawImage(
      this.image,
      0,
      528,
      768,
      696,
      this.pos.x,
      this.pos.y,
      768,
      696
    )
    this.updateHearts(6)
    this.updateMiniMap({ x: 7, y: 7})
    this.updateMoney(0)
    this.updateKeys(0)
    this.updateBombCount(0)
    this.updateSlotA(0)
    this.updateSlotB()
  }

  updateHearts(hp) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(528, 96, 192, 48)
    for (let i = 0; i < this.maxHearts; i++) {
      this.ctx.drawImage(
        this.heartSprite,
        i < hp ? 24 : 72,
        0,
        24,
        24,
        528 + (24 * i),
        96,
        24,
        24,
      )
    }
  }

  updateMiniMap(gridPos) {
    // header
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(48, 24, 192, 48)
    //  minimap
    this.ctx.fillStyle = 'grey'
    this.ctx.fillRect(48, 48, 192, 96)
    // player dot
    this.ctx.fillStyle = '#80D010'
    this.ctx.fillRect(51 + (gridPos.x * 12),48 + (gridPos.y * 12),9,9)
  }

  updateMoney(money) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(312, 48, 48, 24)
    let digits = _util_util__WEBPACK_IMPORTED_MODULE_0__["splitNum"](money)
    digits.forEach((digit, i) => {
      this.ctx.drawImage(
        this.numbers,
        0 + (24 * digit),
        0,
        24,
        24,
        312 + (24 * i),
        48,
        24,
        24
      )
    })
  }

  updateKeys(keys) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(312, 96, 48, 24)
    let digits = _util_util__WEBPACK_IMPORTED_MODULE_0__["splitNum"](keys)
    digits.forEach((digit, i) => {
      this.ctx.drawImage(
        this.numbers,
        0 + (24 * digit),
        0,
        24,
        24,
        312 + (24 * i),
        96,
        24,
        24
      )
    })
  }

  updateBombCount(bombs) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(312, 120, 48, 24)
    let digits = _util_util__WEBPACK_IMPORTED_MODULE_0__["splitNum"](bombs)
    digits.forEach((digit, i) => {
      this.ctx.drawImage(
        this.numbers,
        0 + (24 * digit),
        0,
        24,
        24,
        312 + (24 * i),
        120,
        24,
        24
      )
    })
  }

  updateSlotA(itemCode) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(456, 72, 24, 48)
    this.ctx.drawImage(
      this.primaryitems,
      0 + (24 * itemCode),
      0,
      24,
      48,
      456,
      72,
      24,
      48
    )
  }

  updateSlotB(item) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(384, 72, 24, 48)
    // this.ctx.drawImage(
    //   this.primaryitems
    // )
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Hud);

/***/ }),

/***/ "./src/player/player.js":
/*!******************************!*\
  !*** ./src/player/player.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sword_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sword.js */ "./src/player/sword.js");


class Player {
  constructor(spriteCtx) {
    this.ctx = spriteCtx;

    this.sprite = new Image();
    this.sprite.src = "./assets/images/player/link.png"
    this.ouch = new Audio("./assets/sfx/link-hurt.wav");

    // setInterval(() => {
    //   this.ouch.play()
    // }, 1);
    this.pos = { x: 336, y: 432, width: 48, height: 48, direction: 0, }

    this.hitbox = { x: this.pos.x + 12, y: this.pos.y + 12, width: 24, height: 24 }

    this.tracebox = {
      topLeft: [this.pos.x + 9, this.pos.y + 24],
      topRight: [this.pos.x + 39, this.pos.y + 24],
      bottomLeft: [this.pos.x + 9, this.pos.y + 45],
      bottomRight: [this.pos.x + 39, this.pos.y + 45],
    }

    this.frames = {
      run: 0,
      attack: 0,
      cooldown: 0,
      invincibility: 0,
      knockback: 0,
    }

    this.hp = 6.0;

    this.attacks = [];
  }

  reset() {
    this.hp = 6.0;
    this.attacks = [];
    this.pos = { x: 336, y: 432, width: 48, height: 48, direction: 0, }
    this.hitbox = { x: this.pos.x + 12, y: this.pos.y + 12, width: 24, height: 24 }
    this.tracebox = {
      topLeft: [this.pos.x + 9, this.pos.y + 24],
      topRight: [this.pos.x + 39, this.pos.y + 24],
      bottomLeft: [this.pos.x + 9, this.pos.y + 45],
      bottomRight: [this.pos.x + 39, this.pos.y + 45],
    }
    this.frames = {
      run: 0,
      attack: 0,
      cooldown: 0,
      invincibility: 0,
      knockback: 0,
    }
  }

  clear() {
    this.ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    if (this.frames.run <= 0) this.frames.run = 16;
    if (this.frames.cooldown) this.frames.cooldown--
    if (this.frames.knockback) this.frames.knockback--
    if (this.frames.invincibility) this.frames.invincibility--
    this.frames.attack ? this.frames.attack-- : this.attacks.splice(0, 1)
  }

  render() {
    if (this.hp <= 0) return;
    if (this.frames.attack && this.frames.invincibility) {
      this.drawImage(this.pos.direction + 240, 288 + (48 * (this.frames.invincibility % 3)));
    } else if (this.frames.attack && !this.frames.invincibility) {
      this.drawImage(this.pos.direction, 96);
    } else if (!this.frames.attack && this.frames.invincibility && this.frames.run < 9) {
      this.drawImage(this.pos.direction + 240, 0 + 48 * ((this.frames.invincibility % 3)));
    } else if (!this.frames.attack && this.frames.invincibility && this.frames.run >= 9) {
      this.drawImage(this.pos.direction + 240, 144);
    } else if (!this.frames.attack && !this.frames.invincibility && this.frames.run < 9) {
      this.drawImage(this.pos.direction, 0);
    } else if (!this.frames.attack && !this.frames.invincibility && this.frames.run >= 9) {
      this.drawImage(this.pos.direction, 48);
    }
  }

  drawImage(sourceX, sourceY) {
    this.ctx.drawImage(
      this.sprite,
      sourceX,
      sourceY,
      48,
      48,
      this.pos.x,
      this.pos.y,
      48,
      48
    )
  }

  setDirection(direction) {
    switch (direction) {
      case 'up':
        this.pos.direction = 96
        break;
      case 'right':
        this.pos.direction = 144
        break;
      case 'down':
        this.pos.direction = 0
        break;
      case 'left':
        this.pos.direction = 48
        break;
    }
  }

  move(x, y, direction) {
    if (this.hp <= 0) return;
    if (this.frames.cooldown) return;
    this.frames.run--
    this.setDirection(direction)
    this.pos.x += x;
    this.pos.y += y;
    this.hitbox.x += x;
    this.hitbox.y += y;
    this.tracebox.topLeft[0] += x, this.tracebox.topLeft[1] += y
    this.tracebox.topRight[0] += x, this.tracebox.topRight[1] += y
    this.tracebox.bottomLeft[0] += x, this.tracebox.bottomLeft[1] += y
    this.tracebox.bottomRight[0] += x, this.tracebox.bottomRight[1] += y
  }


  takeDamage(damage = 1) {
    if (this.hp <= 0) return;
    if (!this.frames.invincibility) {
      Object.assign(this.frames, { invincibility: 45, knockback: 8 })
      this.ouch.play()
      this.hp -= damage
      this.attacks.pop()
    }
  }

  attack() {
    if (this.hp <= 0) return;
    if (this.frames.cooldown || this.frames.knockback) return;
    this.frames.cooldown = 18;
    this.frames.attack = 15;
    this.attacks.push(new _sword_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.pos, this.ctx))
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./src/player/sword.js":
/*!*****************************!*\
  !*** ./src/player/sword.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Sword {
  constructor(pos, ctx) {
    this.ctx = ctx
    this.sprite = new Image();
    this.sprite.src = "./assets/images/player/attacks.png"
    this.swordSfx = new Audio("./assets/sfx/sword.wav");
    this.swordSfx.play()

    this.direction = pos.direction

    if (this.direction === 96) { // up
      this.pos = { x: pos.x, y: pos.y - 36 }
      this.hitBox = { x: pos.x + 18, y: pos.y - 36, width: 9, height: 48}
    } else if (this.direction === 144) { // right
      this.pos = { x: pos.x + 36, y: pos.y }
      this.hitBox = { x: pos.x + 36, y: pos.y + 24, width: 48, height: 9 }
    } else if (this.direction === 0) { // down
      this.pos = { x: pos.x, y: pos.y + 36 }
      this.hitBox = { x: pos.x + 21, y: pos.y + 36, width: 9, height: 48 }
    } else if (this.direction === 48) { // left
      this.pos = { x: pos.x - 36, y: pos.y }
      this.hitBox = { x: pos.x - 36, y: pos.y + 24, width: 48, height: 9 }
    }
  }

  clear() {
    this.ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {}

  draw() {
    this.ctx.drawImage(
      this.sprite,
      this.direction,
      0,
      48,
      48,
      this.pos.x,
      this.pos.y,
      48,
      48,
      )

      // hurtbox debugger //
      // ctx.fillStyle = 'red';
      // ctx.fillRect(
      //   this.hitBox.x,
      //   this.hitBox.y,
      //   this.hitBox.width,
      //   this.hitBox.height)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Sword);

/***/ }),

/***/ "./src/units/octorok.js":
/*!******************************!*\
  !*** ./src/units/octorok.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ "./src/util/util.js");
/* harmony import */ var _unit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unit */ "./src/units/unit.js");


class Octorok extends _unit__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(pixelPos, grid, ctx) {
    let type = _util_util__WEBPACK_IMPORTED_MODULE_0__["random"](0, 4)
    super(pixelPos, grid, (type * 96), ctx)
    
    // unit stats
    this.hp = (type === 0 || type === 2) ? 1 : 2;
    // this.ap = 1;

    this.speed = _util_util__WEBPACK_IMPORTED_MODULE_0__["random"](1,3)
    //start action cycle
    this.updateAction();
  }
  
}

/* harmony default export */ __webpack_exports__["default"] = (Octorok);

/***/ }),

/***/ "./src/units/spark.js":
/*!****************************!*\
  !*** ./src/units/spark.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Spark {
  constructor(pos, ctx) {
    this.ctx = ctx
    this.sprite = new Image();
    this.sprite.src = "./assets/images/effects.png"

    this.pos = {
      x: pos.x,
      y: pos.y,
      width: 48,
      height: 48,
    }

    this.frameData = {
      run: 0,
      invincibility: 100,
    }
  }

  takeDamage() {}

  clear() {
    this.ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    this.frameData.run++
  }

  draw() {
    this.ctx.drawImage(
      this.sprite,
      96 + (48 * Math.floor(this.frameData.run / 2)),
      0,
      48,
      48,
      this.pos.x,
      this.pos.y,
      48,
      48
    )
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Spark);

/***/ }),

/***/ "./src/units/spawn.js":
/*!****************************!*\
  !*** ./src/units/spawn.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ "./src/util/util.js");


class Spawn {
  constructor(pixelPos, ctx) {
    this.ctx = ctx
    this.sprite = new Image();
    this.sprite.src = "./assets/images/effects.png"
    this.pos = {
      x: pixelPos[0],
      y: pixelPos[1],
      width: 48,
      height: 48,
    }
    this.pixelPos = pixelPos;
    this.runCycle = _util_util__WEBPACK_IMPORTED_MODULE_0__["random"](20,150);

    this.frameData = {
      // run: 0,
      invincibility: 100,
    }
  }

  takeDamage() {}

  clear() {
    this.ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    this.runCycle --
  }

  draw() {
    this.ctx.drawImage(
      this.sprite,
      this.runCycle >= 8 ? 0 : 48,
      0,
      48,
      48,
      this.pos.x,
      this.pos.y,
      48,
      48
    )
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Spawn);

/***/ }),

/***/ "./src/units/unit.js":
/*!***************************!*\
  !*** ./src/units/unit.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/util */ "./src/util/util.js");


class Unit {
  constructor(pixelPos, grid, startFrame, ctx) {
    this.ctx = ctx;
    this.sprite = new Image();
    this.sprite.src = "./assets/images/units/overworld-enemies.png"
    this.ouch = new Audio("./assets/sfx/hit-enemy.wav");

    this.grid = grid;

    this.pos = {
      x: pixelPos[0],
      y: pixelPos[1],
      row: ((pixelPos[1] - 168) / 48),
      col: (pixelPos[0] / 48),
      width: 48,
      height: 48
    }

    this.frameData = {
      run: 0,
      action: 48,
      direction: 0,
      frame: startFrame,
      invincibility: 0,
    }

  }

  takeDamage(damage = 1) {
    if (this.frameData.invincibility) return;
    this.hp -= damage;
    this.frameData.invincibility = 20;
    this.ouch.play();
  }

  clear() {
    this.ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    if (this.frameData.invincibility) this.frameData.invincibility--
    if (this.frameData.action <= 0) this.updateAction();

    if (this.frameData.direction === 96) { // north
      this.pos.y -= 1 * this.speed
    } else if (this.frameData.direction === 144) { // east
      this.pos.x += 1 * this.speed
    } else if (this.frameData.direction === 0) { // south
      this.pos.y += 1 * this.speed
    } else if (this.frameData.direction === 48) { // west
      this.pos.x -= 1 * this.speed
    }
    this.frameData.run += 1 * this.speed;
    this.frameData.action -= 1 * this.speed;
  }

  draw() {
    let currentFrame = this.frameData.run < 14 ? this.frameData.frame : this.frameData.frame + 48;
    if (this.frameData.run > 25) this.frameData.run = 0;
    // if (this.attacking) this.frameData.frame = 153;
    this.ctx.drawImage(
      this.sprite,
      this.frameData.direction,
      currentFrame,
      48,
      48,
      this.pos.x,
      this.pos.y,
      48,
      48
    )
  }

  checkAvailableActions() {
    let neighbors = [];
    if (this.pos.row > 0 && this.grid[this.pos.row - 1][this.pos.col] === 1020) {
      neighbors.push([96, 0, -1]); // north
    }
    if (this.grid[this.pos.row][this.pos.col + 1] === 1020) {
      neighbors.push([144, 1, 0]); // east
    }
    if (this.pos.row < 10 && this.grid[this.pos.row + 1][this.pos.col] === 1020) {
      neighbors.push([0, 0, 1]); // south
    }
    if (this.grid[this.pos.row][this.pos.col - 1] === 1020) {
      neighbors.push([48, -1, 0]); // west
    }
    return neighbors;
  }

  updateAction() {
    let possibleActions = this.checkAvailableActions();
    this.frameData.action = 48;
    let action = _util_util__WEBPACK_IMPORTED_MODULE_0__["sample"](possibleActions);
    this.frameData.direction = action[0];
    this.pos.col += action[1];
    this.pos.row += action[2];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Unit);

/***/ }),

/***/ "./src/util/constants.js":
/*!*******************************!*\
  !*** ./src/util/constants.js ***!
  \*******************************/
/*! exports provided: FPS, BORDERTOP, BORDERLEFT, BORDERRIGHT, BORDERBOTTOM, WALL, WATER, VIEWWIDTH, VIEWHEIGHT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FPS", function() { return FPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BORDERTOP", function() { return BORDERTOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BORDERLEFT", function() { return BORDERLEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BORDERRIGHT", function() { return BORDERRIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BORDERBOTTOM", function() { return BORDERBOTTOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WALL", function() { return WALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WATER", function() { return WATER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEWWIDTH", function() { return VIEWWIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEWHEIGHT", function() { return VIEWHEIGHT; });
const FPS = 60;



// Borders that trigger screen transition
const BORDERTOP = 172;
const BORDERLEFT = 0;
const BORDERRIGHT = 720;
const BORDERBOTTOM = 648;

// Terrain values
const WALL = 765;
const WATER = 503;

// Screen scroll distance
const VIEWWIDTH = 768;
const VIEWHEIGHT = 528;

/***/ }),

/***/ "./src/util/input.js":
/*!***************************!*\
  !*** ./src/util/input.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util/util.js");


class Input {
  constructor() {
    this.movement = [];
    this.attack = 
    document.addEventListener('keyup', e => this.onKeyUp(e));
    document.addEventListener('keydown', e => this.onKeyDown(e));
  }

  getInput() {
    if (this.attack) {
      this.attack = false;
      return 'attack'
    } else {
      return this.movement[0]
    }
  }

  onKeyDown(event) {
    switch(event.keyCode) {
      case 38:
      case 87:
        event.preventDefault()
        if (!this.movement.includes('up')) this.movement.unshift('up')
        break;
      case 39:
      case 68:
        event.preventDefault()
        if (!this.movement.includes('right')) this.movement.unshift('right')
        break;
      case 40:
      case 83:
        event.preventDefault()
        if (!this.movement.includes('down')) this.movement.unshift('down')
        break;
      case 37:
      case 65:
        event.preventDefault()
        if (!this.movement.includes('left')) this.movement.unshift('left')
        break;
      case 32:
        event.preventDefault()
        if (!this.fired) {
          this.attack = true; 
          this.fired = true;
        }
        break;
    }
  }

  onKeyUp() {
    switch (event.keyCode) {
      case 38:
      case 87:
        _util__WEBPACK_IMPORTED_MODULE_0__["removeElement"](this.movement, 'up')
        break;
      case 39:
      case 68:
        _util__WEBPACK_IMPORTED_MODULE_0__["removeElement"](this.movement, 'right')
        break;
      case 40:
      case 83:
        _util__WEBPACK_IMPORTED_MODULE_0__["removeElement"](this.movement, 'down')
        break;
      case 37:
      case 65:
        _util__WEBPACK_IMPORTED_MODULE_0__["removeElement"](this.movement, 'left')
        break;
      case 32:
        this.fired = false;
        break;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Input);

/***/ }),

/***/ "./src/util/util.js":
/*!**************************!*\
  !*** ./src/util/util.js ***!
  \**************************/
/*! exports provided: equalArr, sumArr, getMapPixel, sumMapPixel, scanMapTile, sample, random, checkCollision, knockbackcheck, removeElement, splitNum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalArr", function() { return equalArr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sumArr", function() { return sumArr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMapPixel", function() { return getMapPixel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sumMapPixel", function() { return sumMapPixel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scanMapTile", function() { return scanMapTile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sample", function() { return sample; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkCollision", function() { return checkCollision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "knockbackcheck", function() { return knockbackcheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeElement", function() { return removeElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitNum", function() { return splitNum; });
function equalArr(arr1,arr2) {
  for (let i = 0; i - arr1.length - 1; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function sumArr(arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

function getMapPixel(ctx, x, y) {
  const pixel = ctx.getImageData(x, y, 1, 1);
  return [pixel.data[0], pixel.data[1], pixel.data[2]];
}

function sumMapPixel(ctx, x, y) {
  const pixel = ctx.getImageData(x, y, 1, 1);
  return (pixel.data[0] + pixel.data[1] + pixel.data[2]);
}

function scanMapTile(ctx, x, y) {
  const tile = ctx.getImageData(x+23, y+23, 2, 2);
  return sumArr(tile.data)
}

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkCollision(hitbox1, hitbox2) {
  if (
    hitbox1.x < hitbox2.x + hitbox2.width &&
    hitbox1.x + hitbox1.width > hitbox2.x &&
    hitbox1.y < hitbox2.y + hitbox2.height &&
    hitbox1.y + hitbox1.height > hitbox2.y
  ) {
    return true;
  }
  return false;
}

function knockbackcheck(pixel1, pixel2) {
  let pixel1value = util.sumArr(pixel1)
  let pixel2value = util.sumArr(pixel2)
  if (pixel1value === constants.WALL || pixel1value === constants.WATER) return true;
  if (pixel2value === constants.WALL || pixel2value === constants.WATER) return true;
  return false;
}

function removeElement(arr, el) {
  let idx = arr.indexOf(el)
  if (idx > -1) arr.splice(idx, 1)
}

function splitNum(num) {
  let str = num.toString();
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(parseInt(str[i]));
  }
  return arr;
}

/***/ }),

/***/ "./zelda.js":
/*!******************!*\
  !*** ./zelda.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/game */ "./src/game.js");


const menuCanvas = document.getElementById('menu-canvas');
const hudCtx = menuCanvas.getContext('2d');
menuCanvas.width = 768
menuCanvas.height = 696

const spriteCanvas = document.getElementById('sprite-canvas');
const spriteCtx = spriteCanvas.getContext('2d');
spriteCanvas.width = 768
spriteCanvas.height = 696

const mapCanvas = document.getElementById('map-canvas');
const boardCtx = mapCanvas.getContext('2d')
mapCanvas.width = 768
mapCanvas.height = 696

const collisionCanvas = document.getElementById('collision-canvas');
const collisionCtx = collisionCanvas.getContext('2d')
collisionCanvas.width = 768
collisionCanvas.height = 696


const game = new _src_game__WEBPACK_IMPORTED_MODULE_0__["default"](hudCtx, spriteCtx, boardCtx, collisionCtx)

window.addEventListener('load',() => {
  game.init();
}, false);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map