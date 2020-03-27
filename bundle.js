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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/input */ "./src/util/input.js");
/* harmony import */ var _menu_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu/menu.js */ "./src/menu/menu.js");
/* harmony import */ var _player_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player/player */ "./src/player/player.js");
/* harmony import */ var _units_spawn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./units/spawn */ "./src/units/spawn.js");
/* harmony import */ var _units_spark__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./units/spark */ "./src/units/spark.js");
/* harmony import */ var _units_octorok__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./units/octorok */ "./src/units/octorok.js");
/* harmony import */ var _maps_overworld__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./maps/overworld */ "./src/maps/overworld.js");
/* harmony import */ var _util_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util/constants */ "./src/util/constants.js");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/util */ "./src/util/util.js");










// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles
// TODO: remove keymaster dependancy!

class Game {
  constructor() {
    this.menu = new _menu_menu_js__WEBPACK_IMPORTED_MODULE_1__["default"];
    this.player = new _player_player__WEBPACK_IMPORTED_MODULE_2__["default"];
    this.overworld = new _maps_overworld__WEBPACK_IMPORTED_MODULE_6__["default"];

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
  }
  
  clearUnits(ctx) {
    this.units.forEach(unit => unit.clear(ctx))
  }

  clearAttacks(ctx) {
    this.player.attacks.forEach(attack => attack.clear(ctx))
  }

  stepUnits(collisionCtx) {
    if (this.player.frames.knockback) this.knockBackPlayer(collisionCtx)

    this.units.forEach((unit, i) => {
      if (unit instanceof _units_spawn__WEBPACK_IMPORTED_MODULE_3__["default"] && unit.runCycle <= 0) {
        this.units[i] = new _units_octorok__WEBPACK_IMPORTED_MODULE_5__["default"](unit.pixelPos, this.grid)
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

  damageUnit(unit, damage) {
    unit.takeDamage(damage);
    if (unit.hp <= 0) this.killUnit(unit)
  }

  damagePlayer(damage) {
    this.player.takeDamage()
  }

  killUnit(unit) {
    this.unitDeath.play();
    this.units.splice(this.units.indexOf(unit), 1)
    this.units.push(new _units_spark__WEBPACK_IMPORTED_MODULE_4__["default"](unit.pos))
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

  drawUnits(ctx) {
    this.units.forEach(unit => unit.draw(ctx))
  }

  drawAttacks(ctx) {
    this.player.attacks.forEach(attack => attack.draw(ctx))
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
      this.units.push(new _units_spawn__WEBPACK_IMPORTED_MODULE_3__["default"](pixelPos));
    }
  }
  
  // Scrolling logic below
  scroll(worldCtx, collisionCtx) {
    if (!this.scrolling) return;
    if (this.scrollQueue <= 0) {
      this.scrolling = false;
      this.overworld.drawCollisionMap(collisionCtx)
      this.scanGrid(collisionCtx);
      this.setSpawns();
    } else {
      let playerDirection = this.player.pos.direction
      if (playerDirection === 96) {
        this.overworld.pos.y -= 8;
        if (this.scrollQueue > 48) this.player.move(0, 8)
      }
      if (playerDirection === 144) {
        this.overworld.pos.x += 8;
        if (this.scrollQueue > 48) this.player.move(-8, 0)
      }
      if (playerDirection === 0) {
        this.overworld.pos.y += 8;
        if (this.scrollQueue > 48) this.player.move(0, -8)
      }
      if (playerDirection === 48) {
        this.overworld.pos.x -= 8;
        if (this.scrollQueue > 48) this.player.move(8, 0)
      }
      this.scrollQueue -= 8;
      this.overworld.drawWorld(worldCtx)
    }
  }

  checkBorder(ctx) {
    if (this.player.pos.y < _util_constants__WEBPACK_IMPORTED_MODULE_7__["BORDERTOP"] || this.player.pos.y > _util_constants__WEBPACK_IMPORTED_MODULE_7__["BORDERBOTTOM"]) {
      this.scrolling = true;
      this.destroyUnits(ctx)
      this.scrollQueue = 528;
    }
    if (this.player.pos.x > _util_constants__WEBPACK_IMPORTED_MODULE_7__["BORDERRIGHT"] || this.player.pos.x < _util_constants__WEBPACK_IMPORTED_MODULE_7__["BORDERLEFT"]) {
      this.scrolling = true;
      this.destroyUnits(ctx)
      this.scrollQueue = 768;
    }
  }

  destroyUnits(ctx) {
    this.clearUnits(ctx);
    this.units = [];
    // this.enemyCount = (Util.random(1, 6)) // reload enemy count for next screen.
    this.enemyCount = 2// stress test!
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

/***/ "./src/gameView.js":
/*!*************************!*\
  !*** ./src/gameView.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _util_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/constants */ "./src/util/constants.js");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/util */ "./src/util/util.js");





// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles

class GameView {
  constructor(menuCtx, spriteCtx, worldCtx, collisionCtx) {
    // this.lastTime;
    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"];
    this.menuCtx = menuCtx;
    this.spriteCtx = spriteCtx;
    this.worldCtx = worldCtx;
    this.collisionCtx = collisionCtx;
    this.menu = this.game.menu;
    this.player = this.game.player;
    this.overworld = this.game.overworld;
  }

  // start primary game loop
  init() {
    this.overworld.drawWorld(this.worldCtx)
    this.overworld.drawCollisionMap(this.collisionCtx)
    this.menu.draw(this.menuCtx)
    this.player.draw(this.spriteCtx);
    requestAnimationFrame(() => this.gameLoop())
  }

  // primary game loop  TODO: add pixel /sec to ensure proper gameplay at all FPS
  gameLoop() {
    // let now = Date.now();
    // let dt = (now - lastTime) / 1000.0;
    this.clear(this.spriteCtx)
    this.step(this.spriteCtx, this.worldCtx, this.collisionCtx);
    this.draw(this.spriteCtx)
    requestAnimationFrame(() => this.gameLoop())
  }

  clear(ctx) {
    this.game.clearUnits(ctx);
    this.game.clearAttacks(ctx);
    this.game.player.clear(ctx)
  }

  step(spriteCtx, worldCtx, collisionCtx) {
    this.game.checkBorder(spriteCtx);
    this.game.scroll(worldCtx, collisionCtx);
    this.game.processInput(collisionCtx);
    this.game.stepUnits(collisionCtx);
    this.player.step();
  }

  draw(ctx) {
    this.game.drawUnits(ctx);
    this.game.drawAttacks(ctx);
    this.player.draw(ctx);
  }
}


/* harmony default export */ __webpack_exports__["default"] = (GameView);

/***/ }),

/***/ "./src/maps/overworld.js":
/*!*******************************!*\
  !*** ./src/maps/overworld.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Hud height is scaled up: 168
// map screens are 768 x 528 (256 x 176)
// world is a 16 x 8 grid

class Overworld {
  constructor() {
    this.overworld = new Image();
    this.overworld.src = './assets/images/maps/overworld.png'
    this.collisionMap = new Image();
    this.collisionMap.src = './assets/images/maps/overworld-collision.png'
    
    // this.music = new Audio("./assets/sfx/overworld.mp3");
    // this.music.autoplay();
    // this.music.loop = true;
    // this.music.play();
    
    // this.pos = [5376,3528];
    this.pos = { x: 5376, y: 3528 }
  }

  drawWorld(ctx) {
    ctx.drawImage(
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

  drawCollisionMap(ctx) {
    ctx.drawImage(
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

/* harmony default export */ __webpack_exports__["default"] = (Overworld);



/***/ }),

/***/ "./src/menu/menu.js":
/*!**************************!*\
  !*** ./src/menu/menu.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Menu {
  constructor() {
    this.pos = { x: 0, y: 0 }
    this.image = new Image();
    this.image.src = "./assets/images/menu.png"
  }

  draw(ctx) {
    ctx.drawImage(
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
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Menu);

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
  constructor() {
    this.sprite = new Image();
    this.sprite.src = "./assets/images/player/link.png"
    this.ouch = new Audio("./assets/sfx/link-hurt.wav");

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

    this.hp = 3;

    this.attacks = [];
  }
  
  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    if (this.frames.run > 15) this.frames.run = 0;
    if (this.frames.cooldown) this.frames.cooldown--
    if (this.frames.knockback) this.frames.knockback--
    if (this.frames.invincibility) this.frames.invincibility--
    this.frames.attack ? this.frames.attack-- : this.attacks.splice(0,1)
  }

  draw(ctx) {
    if (this.frames.attack) {
      ctx.drawImage(
        this.sprite,
        this.frames.invincibility ? this.pos.direction + 240 : this.pos.direction,
        this.frames.invincibility ? 288 + (48 * (this.frames.invincibility % 3)) : 96, // attack sprite pose
        48,
        48,
        this.pos.x,
        this.pos.y,
        48,
        48
      )
    } else {
      ctx.drawImage(
        this.sprite,
        this.frames.invincibility ? this.pos.direction + 240 : this.pos.direction,
        this.frames.invincibility ? this.frames.run < 9 ? 0 + (48 * (this.frames.invincibility % 3)) : 144 + (48 * (this.frames.invincibility % 3)) : this.frames.run < 9 ? 0 : 48,
        48,
        48,
        this.pos.x,
        this.pos.y,
        48,
        48
      )
    }
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
    if (this.frames.cooldown) return;
    this.frames.run++
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
          
          
  takeDamage(damage=1) {
    if (!this.frames.invincibility) {
      Object.assign(this.frames, {invincibility: 45, knockback: 8})
      this.ouch.play()
      this.hp -= damage
      this.attacks.pop()
      console.log(this.hp)
    }
  }

  attack() {
    if (this.frames.cooldown || this.frames.knockback) return;
    this.frames.cooldown = 18;
    this.frames.attack = 15;
    this.attacks.push(new _sword_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.pos))
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
  constructor(pos) {
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

  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {}

  draw(ctx) {
    ctx.drawImage(
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
  constructor(pixelPos, grid) {
    super(pixelPos, grid, 96 * 5)
    
    // unit stats
    this.hp = 1;
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
  constructor(pos) {
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

  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    this.frameData.run++
  }

  draw(ctx) {
    ctx.drawImage(
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
  constructor(pixelPos) {
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

  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    this.runCycle --
  }

  draw(ctx) {
    ctx.drawImage(
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
  constructor(pixelPos, grid, startFrame) {
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

  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
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

  draw(ctx) {
    let currentFrame = this.frameData.run < 14 ? this.frameData.frame : this.frameData.frame + 48;
    if (this.frameData.run > 25) this.frameData.run = 0;
    // if (this.attacking) this.frameData.frame = 153;
    ctx.drawImage(
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
      case 87:
        if (!this.movement.includes('up')) this.movement.unshift('up')
        break;
      case 68:
        if (!this.movement.includes('right')) this.movement.unshift('right')
        break;
      case 83:
        if (!this.movement.includes('down')) this.movement.unshift('down')
        break;
      case 65:
        if (!this.movement.includes('left')) this.movement.unshift('left')
        break;
      case 32:
        if (!this.fired) {
          this.attack = true; 
          this.fired = true;
        }
        break;
    }
  }

  onKeyUp() {
    switch (event.keyCode) {
      case 87:
        _util__WEBPACK_IMPORTED_MODULE_0__["removeElement"](this.movement, 'up')
        break;
      case 68:
        _util__WEBPACK_IMPORTED_MODULE_0__["removeElement"](this.movement, 'right')
        break;
      case 83:
        _util__WEBPACK_IMPORTED_MODULE_0__["removeElement"](this.movement, 'down')
        break;
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
/*! exports provided: equalArr, sumArr, getMapPixel, sumMapPixel, scanMapTile, sample, random, checkCollision, knockbackcheck, removeElement */
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

/***/ }),

/***/ "./zelda.js":
/*!******************!*\
  !*** ./zelda.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_gameView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/gameView */ "./src/gameView.js");


const menuCanvas = document.getElementById('menu-canvas');
const menuCtx = menuCanvas.getContext('2d');
menuCanvas.width = 768
menuCanvas.height = 696

const spriteCanvas = document.getElementById('sprite-canvas');
const spriteCtx = spriteCanvas.getContext('2d');
spriteCanvas.width = 768
spriteCanvas.height = 696

const mapCanvas = document.getElementById('map-canvas');
const worldCtx = mapCanvas.getContext('2d')
mapCanvas.width = 768
mapCanvas.height = 696

const collisionCanvas = document.getElementById('collision-canvas');
const collisionCtx = collisionCanvas.getContext('2d')
collisionCanvas.width = 768
collisionCanvas.height = 696


//TODO - truly split render logic.
//TODO - drop keymaster dependancy.

// const background = new Image();
// background.src = "./images/board.jpg";

// background.onload = function () {
//   ctx.drawImage(background, 0, 0);
// }
// document.addEventListener('keyup', () => console.log('key up!'));
// document.addEventListener('keydown', () => console.log('key down!'));

const gameView = new _src_gameView__WEBPACK_IMPORTED_MODULE_0__["default"](menuCtx, spriteCtx, worldCtx, collisionCtx)

window.addEventListener('load',() => {
  gameView.init();
}, false);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map