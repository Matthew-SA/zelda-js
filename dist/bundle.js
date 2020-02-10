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

/***/ "./node_modules/keymaster/keymaster.js":
/*!*********************************************!*\
  !*** ./node_modules/keymaster/keymaster.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//     keymaster.js
//     (c) 2011-2013 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.

;(function(global){
  var k,
    _handlers = {},
    _mods = { 16: false, 18: false, 17: false, 91: false },
    _scope = 'all',
    // modifier keys
    _MODIFIERS = {
      '⇧': 16, shift: 16,
      '⌥': 18, alt: 18, option: 18,
      '⌃': 17, ctrl: 17, control: 17,
      '⌘': 91, command: 91
    },
    // special keys
    _MAP = {
      backspace: 8, tab: 9, clear: 12,
      enter: 13, 'return': 13,
      esc: 27, escape: 27, space: 32,
      left: 37, up: 38,
      right: 39, down: 40,
      del: 46, 'delete': 46,
      home: 36, end: 35,
      pageup: 33, pagedown: 34,
      ',': 188, '.': 190, '/': 191,
      '`': 192, '-': 189, '=': 187,
      ';': 186, '\'': 222,
      '[': 219, ']': 221, '\\': 220
    },
    code = function(x){
      return _MAP[x] || x.toUpperCase().charCodeAt(0);
    },
    _downKeys = [];

  for(k=1;k<20;k++) _MAP['f'+k] = 111+k;

  // IE doesn't support Array#indexOf, so have a simple replacement
  function index(array, item){
    var i = array.length;
    while(i--) if(array[i]===item) return i;
    return -1;
  }

  // for comparing mods before unassignment
  function compareArray(a1, a2) {
    if (a1.length != a2.length) return false;
    for (var i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
  }

  var modifierMap = {
      16:'shiftKey',
      18:'altKey',
      17:'ctrlKey',
      91:'metaKey'
  };
  function updateModifierKey(event) {
      for(k in _mods) _mods[k] = event[modifierMap[k]];
  };

  // handle keydown event
  function dispatch(event) {
    var key, handler, k, i, modifiersMatch, scope;
    key = event.keyCode;

    if (index(_downKeys, key) == -1) {
        _downKeys.push(key);
    }

    // if a modifier key, set the key.<modifierkeyname> property to true and return
    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
    if(key in _mods) {
      _mods[key] = true;
      // 'assignKey' from inside this closure is exported to window.key
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
      return;
    }
    updateModifierKey(event);

    // see if we need to ignore the keypress (filter() can can be overridden)
    // by default ignore key presses if a select, textarea, or input is focused
    if(!assignKey.filter.call(this, event)) return;

    // abort if no potentially matching shortcuts found
    if (!(key in _handlers)) return;

    scope = getScope();

    // for each potential shortcut
    for (i = 0; i < _handlers[key].length; i++) {
      handler = _handlers[key][i];

      // see if it's in the current scope
      if(handler.scope == scope || handler.scope == 'all'){
        // check if modifiers match if any
        modifiersMatch = handler.mods.length > 0;
        for(k in _mods)
          if((!_mods[k] && index(handler.mods, +k) > -1) ||
            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
        // call the handler and stop the event if neccessary
        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
          if(handler.method(event, handler)===false){
            if(event.preventDefault) event.preventDefault();
              else event.returnValue = false;
            if(event.stopPropagation) event.stopPropagation();
            if(event.cancelBubble) event.cancelBubble = true;
          }
        }
      }
    }
  };

  // unset modifier keys on keyup
  function clearModifier(event){
    var key = event.keyCode, k,
        i = index(_downKeys, key);

    // remove key from _downKeys
    if (i >= 0) {
        _downKeys.splice(i, 1);
    }

    if(key == 93 || key == 224) key = 91;
    if(key in _mods) {
      _mods[key] = false;
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
    }
  };

  function resetModifiers() {
    for(k in _mods) _mods[k] = false;
    for(k in _MODIFIERS) assignKey[k] = false;
  };

  // parse and assign shortcut
  function assignKey(key, scope, method){
    var keys, mods;
    keys = getKeys(key);
    if (method === undefined) {
      method = scope;
      scope = 'all';
    }

    // for each shortcut
    for (var i = 0; i < keys.length; i++) {
      // set modifier keys if any
      mods = [];
      key = keys[i].split('+');
      if (key.length > 1){
        mods = getMods(key);
        key = [key[key.length-1]];
      }
      // convert to keycode and...
      key = key[0]
      key = code(key);
      // ...store handler
      if (!(key in _handlers)) _handlers[key] = [];
      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
    }
  };

  // unbind all handlers for given key in current scope
  function unbindKey(key, scope) {
    var multipleKeys, keys,
      mods = [],
      i, j, obj;

    multipleKeys = getKeys(key);

    for (j = 0; j < multipleKeys.length; j++) {
      keys = multipleKeys[j].split('+');

      if (keys.length > 1) {
        mods = getMods(keys);
        key = keys[keys.length - 1];
      }

      key = code(key);

      if (scope === undefined) {
        scope = getScope();
      }
      if (!_handlers[key]) {
        return;
      }
      for (i = 0; i < _handlers[key].length; i++) {
        obj = _handlers[key][i];
        // only clear handlers if correct scope and mods match
        if (obj.scope === scope && compareArray(obj.mods, mods)) {
          _handlers[key][i] = {};
        }
      }
    }
  };

  // Returns true if the key with code 'keyCode' is currently down
  // Converts strings into key codes.
  function isPressed(keyCode) {
      if (typeof(keyCode)=='string') {
        keyCode = code(keyCode);
      }
      return index(_downKeys, keyCode) != -1;
  }

  function getPressedKeyCodes() {
      return _downKeys.slice(0);
  }

  function filter(event){
    var tagName = (event.target || event.srcElement).tagName;
    // ignore keypressed in any elements that support keyboard data input
    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
  }

  // initialize key.<modifier> to false
  for(k in _MODIFIERS) assignKey[k] = false;

  // set current scope (default 'all')
  function setScope(scope){ _scope = scope || 'all' };
  function getScope(){ return _scope || 'all' };

  // delete all handlers for a given scope
  function deleteScope(scope){
    var key, handlers, i;

    for (key in _handlers) {
      handlers = _handlers[key];
      for (i = 0; i < handlers.length; ) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);
        else i++;
      }
    }
  };

  // abstract key logic for assign and unassign
  function getKeys(key) {
    var keys;
    key = key.replace(/\s/g, '');
    keys = key.split(',');
    if ((keys[keys.length - 1]) == '') {
      keys[keys.length - 2] += ',';
    }
    return keys;
  }

  // abstract mods logic for assign and unassign
  function getMods(key) {
    var mods = key.slice(0, key.length - 1);
    for (var mi = 0; mi < mods.length; mi++)
    mods[mi] = _MODIFIERS[mods[mi]];
    return mods;
  }

  // cross-browser events
  function addEvent(object, event, method) {
    if (object.addEventListener)
      object.addEventListener(event, method, false);
    else if(object.attachEvent)
      object.attachEvent('on'+event, function(){ method(window.event) });
  };

  // set the handlers globally on document
  addEvent(document, 'keydown', function(event) { dispatch(event) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
  addEvent(document, 'keyup', clearModifier);

  // reset modifiers to false whenever the window is (re)focused.
  addEvent(window, 'focus', resetModifiers);

  // store previously defined key
  var previousKey = global.key;

  // restore previously defined key and return reference to our key object
  function noConflict() {
    var k = global.key;
    global.key = previousKey;
    return k;
  }

  // set window.key and window.key.set/get/deleteScope, and the default filter
  global.key = assignKey;
  global.key.setScope = setScope;
  global.key.getScope = getScope;
  global.key.deleteScope = deleteScope;
  global.key.filter = filter;
  global.key.isPressed = isPressed;
  global.key.getPressedKeyCodes = getPressedKeyCodes;
  global.key.noConflict = noConflict;
  global.key.unbind = unbindKey;

  if(true) module.exports = assignKey;

})(this);


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _menu_menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu/menu.js */ "./src/menu/menu.js");
/* harmony import */ var _player_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player/player */ "./src/player/player.js");
/* harmony import */ var _units_spawn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./units/spawn */ "./src/units/spawn.js");
/* harmony import */ var _units_spark__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./units/spark */ "./src/units/spark.js");
/* harmony import */ var _units_octorok__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./units/octorok */ "./src/units/octorok.js");
/* harmony import */ var _maps_overworld__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./maps/overworld */ "./src/maps/overworld.js");
/* harmony import */ var _util_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/constants */ "./src/util/constants.js");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util/util */ "./src/util/util.js");









// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles

class Game {
  constructor() {
    this.menu = new _menu_menu_js__WEBPACK_IMPORTED_MODULE_0__["default"];
    this.player = new _player_player__WEBPACK_IMPORTED_MODULE_1__["default"];
    this.overworld = new _maps_overworld__WEBPACK_IMPORTED_MODULE_5__["default"];
    
    // game sounds
    this.hitEnemy = new Audio("./assets/sfx/hit-enemy.wav");
    this.destroyEnemy = new Audio("./assets/sfx/destroy-enemy.wav");

    // game scroll logic
    this.scrolling = false;
    this.scrollQueue = 0;

    // npc placement
    this.units = [];
    this.grid = null; // collection of grid squares with color data of center 4 pixels.
    this.openSpaces = null; // Array of subarrays.  Each contain a x/y pixel position pair.
    this.enemyCount = 0;

  }
  
  clearUnits(ctx) {
    for (let i = 0; i < this.units.length; i++) {
      this.units[i].clear(ctx);
    }
  }

  clearAttacks(ctx) {
    for (let i = 0; i < this.player.attacks.length; i++) {
      this.player.attacks[i].clear(ctx)
    }
  }

  stepUnits() {
    for (let i = 0; i < this.units.length; i++) {
      if (this.units[i] instanceof _units_spawn__WEBPACK_IMPORTED_MODULE_2__["default"] && this.units[i].runCycle <= 0) {
        this.units[i] = new _units_octorok__WEBPACK_IMPORTED_MODULE_4__["default"](this.units[i].pixelPos, this.grid);
      }
      this.units[i].step();
      this.checkCollisionsAgainstPlayer(this.units[i])
      for (let j = 0; j < this.player.attacks.length; j++) {
        this.checkCollisionAgainstOther(this.player.attacks[j], this.units[i])
      }
      if (this.units[i] instanceof _units_spark__WEBPACK_IMPORTED_MODULE_3__["default"] && this.units[i].runCycle > 16) {
        this.units.splice(this.units.indexOf(this.units[i]), 1)
      }
    }
  }

  stepAttacks() {
    for (let i = 0; i < this.player.attacks.length; i++) {
      // TODO: ADD MORE ATTACKS!
    }
  }

  checkCollisionsAgainstPlayer(other) {
    const playerHitbox = {
      x: this.player.pos.x + 2,
      y: this.player.pos.y + 2,
      width: 44,
      height: 44,
    }
    if (playerHitbox.x < other.pos.x + other.pos.width &&
      playerHitbox.x + playerHitbox.width > other.pos.x &&
      playerHitbox.y < other.pos.y + other.pos.height &&
      playerHitbox.y + playerHitbox.height > other.pos.y) {
      console.log('ouch!')
    }
  }

  checkCollisionAgainstOther(attack, other) {
    if (attack.pos.hurtBoxX < other.pos.x + other.pos.width &&
      attack.pos.hurtBoxX + attack.pos.width > other.pos.x &&
      attack.pos.hurtBoxY < other.pos.y + other.pos.height &&
      attack.pos.hurtBoxY + attack.pos.height > other.pos.y) {
      this.damageUnit(other);
    }
  }

  damageUnit(unit) {
    if (unit.invincibilityFrames) return;
    unit.hp -= 1
    if (unit.hp) {
      this.hitEnemy.play();
    } else {
      this.destroyEnemy.play();
      this.units.splice(this.units.indexOf(unit), 1)
      this.units.push(new _units_spark__WEBPACK_IMPORTED_MODULE_3__["default"](unit.pos))
    }
  }

  drawUnits(ctx) {
    for (let i = 0; i < this.units.length; i++ ) {
      this.units[i].draw(ctx)
    }
  }

  drawAttacks(ctx) {
    for (let i = 0; i < this.player.attacks.length; i++) {
      this.player.attacks[i].draw(ctx)
    }
  }


  scanGrid(ctx) {
    let newGrid = [];
    let openSpaces = [];
    for (let y = 168; y < 696; y += 48) {
      let row = [];
      for (let x = 0; x < 768; x += 48) {
        let value = _util_util__WEBPACK_IMPORTED_MODULE_7__["scanMapTile"](ctx, x, y);
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
      this.units.push(new _units_spawn__WEBPACK_IMPORTED_MODULE_2__["default"](pixelPos));
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
      if (this.player.pos.direction === 96) {
        this.overworld.pos[1] -= 8;
        if (this.scrollQueue > 48) this.player.move(0, 8)
      }
      if (this.player.pos.direction === 144) {
        this.overworld.pos[0] += 8;
        if (this.scrollQueue > 48) this.player.move(-8, 0)
      }
      if (this.player.pos.direction === 0) {
        this.overworld.pos[1] += 8;
        if (this.scrollQueue > 48) this.player.move(0, -8)
      }
      if (this.player.pos.direction === 48) {
        this.overworld.pos[0] -= 8;
        if (this.scrollQueue > 48) this.player.move(8, 0)
      }
      this.scrollQueue -= 8;
      this.overworld.drawWorld(worldCtx)
    }
  }

  checkBorder(ctx) {
    if (this.player.pos.y < _util_constants__WEBPACK_IMPORTED_MODULE_6__["BORDERTOP"] || this.player.pos.y > _util_constants__WEBPACK_IMPORTED_MODULE_6__["BORDERBOTTOM"]) {
      this.scrolling = true;
      this.destroyUnits(ctx)
      this.scrollQueue = 528;
    }
    if (this.player.pos.x > _util_constants__WEBPACK_IMPORTED_MODULE_6__["BORDERRIGHT"] || this.player.pos.x < _util_constants__WEBPACK_IMPORTED_MODULE_6__["BORDERLEFT"]) {
      this.scrolling = true;
      this.destroyUnits(ctx)
      this.scrollQueue = 768;
    }
  }

  destroyUnits(ctx) {
    this.clearUnits(ctx);
    this.units = [];
    this.enemyCount = (_util_util__WEBPACK_IMPORTED_MODULE_7__["random"](1, 6)) // reload enemy count for next screen.
    // this.enemyCount = 100 // stress test!
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
/* harmony import */ var keymaster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! keymaster */ "./node_modules/keymaster/keymaster.js");
/* harmony import */ var keymaster__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(keymaster__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _util_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/constants */ "./src/util/constants.js");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/util */ "./src/util/util.js");






// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles

class GameView {
  constructor(menuCtx, spriteCtx, worldCtx, collisionCtx) {
    // this.lastTime;
    this.game = new _game__WEBPACK_IMPORTED_MODULE_1__["default"];
    this.menuCtx = menuCtx;
    this.spriteCtx = spriteCtx;
    this.worldCtx = worldCtx;
    this.collisionCtx = collisionCtx;
    this.menu = this.game.menu;
    this.player = this.game.player;
    this.overworld = this.game.overworld;
    this.lastInput = {'a': null, 'w': null, 'd': null, 's': null};
    this.currentInput = null;
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
    this.game.checkBorder(this.spriteCtx);
    this.game.scroll(this.worldCtx, this.collisionCtx);
    this.getLastInput();
    this.checkKey();

    this.game.clearUnits(this.spriteCtx);
    this.game.clearAttacks(this.spriteCtx);
    this.player.clear(this.spriteCtx);

    this.game.stepUnits();
    this.game.stepAttacks();
    this.player.step();

    this.game.drawUnits(this.spriteCtx);
    this.game.drawAttacks(this.spriteCtx);
    this.player.draw(this.spriteCtx);
    this.player.sword

    if (this.currentInput) this.player.runCycle++;
    window.requestAnimationFrame(() => this.gameLoop())
  }

  // collision layer check below
  checkIfBarrier(pixel1, pixel2) {
    let pixel1value = _util_util__WEBPACK_IMPORTED_MODULE_3__["sumArr"](pixel1)
    let pixel2value = _util_util__WEBPACK_IMPORTED_MODULE_3__["sumArr"](pixel2)
    if (pixel1value === _util_constants__WEBPACK_IMPORTED_MODULE_2__["WALL"] || pixel1value === _util_constants__WEBPACK_IMPORTED_MODULE_2__["WATER"]) return true;
    if (pixel2value === _util_constants__WEBPACK_IMPORTED_MODULE_2__["WALL"] || pixel2value === _util_constants__WEBPACK_IMPORTED_MODULE_2__["WATER"]) return true;
    return false;
  }

  impassableTerrain(direction) {
    if (direction === 'north') {
      const topPixel = _util_util__WEBPACK_IMPORTED_MODULE_3__["getMapPixel"](
        this.collisionCtx,
        this.player.tracebox.topLeft[0], 
        this.player.tracebox.topLeft[1] - 3)
      const bottomPixel = _util_util__WEBPACK_IMPORTED_MODULE_3__["getMapPixel"](
        this.collisionCtx,
        this.player.tracebox.topRight[0],
        this.player.tracebox.topRight[1] - 3)
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'east') {
      const topPixel = _util_util__WEBPACK_IMPORTED_MODULE_3__["getMapPixel"](
        this.collisionCtx,
        this.player.tracebox.topRight[0] + 3,
        this.player.tracebox.topRight[1])
      const bottomPixel = _util_util__WEBPACK_IMPORTED_MODULE_3__["getMapPixel"](
        this.collisionCtx,
        this.player.tracebox.bottomRight[0] + 3,
        this.player.tracebox.bottomRight[1])
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'south') {
      const topPixel = _util_util__WEBPACK_IMPORTED_MODULE_3__["getMapPixel"](
        this.collisionCtx,
        this.player.tracebox.bottomLeft[0],
        this.player.tracebox.bottomLeft[1] + 3)
      const bottomPixel = _util_util__WEBPACK_IMPORTED_MODULE_3__["getMapPixel"](
        this.collisionCtx,
        this.player.tracebox.bottomRight[0],
        this.player.tracebox.bottomRight[1] + 3)
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'west') {
      const topPixel = _util_util__WEBPACK_IMPORTED_MODULE_3__["getMapPixel"](
        this.collisionCtx,
        this.player.tracebox.topLeft[0] - 3,
        this.player.tracebox.topRight[1])
      const bottomPixel = _util_util__WEBPACK_IMPORTED_MODULE_3__["getMapPixel"](
        this.collisionCtx,
        this.player.tracebox.bottomLeft[0] - 3, 
        this.player.tracebox.bottomLeft[1])
      return this.checkIfBarrier(topPixel, bottomPixel)
    }
  }

  // player input below
  getLastInput() {
    if (keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('w') && this.lastInput.w === null) {
      this.lastInput.w = Date.now();
    } else if (!keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('w') && this.lastInput.w !== null) {
      this.lastInput.w = null;
    }

    if (keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('d') && this.lastInput.d === null) {
      this.lastInput.d = Date.now();
    } else if (!keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('d') && this.lastInput.d !== null) {
      this.lastInput.d = null;
    }
    
    if (keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('s') && this.lastInput.s === null) {
      this.lastInput.s = Date.now();
    } else if (!keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('s') && this.lastInput.s !== null) {
      this.lastInput.s = null;
    }

    if (keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('a') && this.lastInput.a === null) {
      this.lastInput.a = Date.now();
    } else if (!keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('a') && this.lastInput.a !== null) {
      this.lastInput.a = null;
    }
  }

  checkKey() {
    if (this.game.scrolling) return;
    if (this.player.cooldown) return;

    const entry = Object.entries(this.lastInput).reduce((accum, entry) => (entry[1] > accum[1] ? entry : accum), ['', null])
    this.currentInput = entry[0]
    if (keymaster__WEBPACK_IMPORTED_MODULE_0___default.a.isPressed('/')) {
      this.currentInput = 'attack'
      this.player.attack();
    }
    if ((this.currentInput === 'w')) {
      this.player.pos.direction = 96 // 'up'
      if (this.impassableTerrain('north')) return
      this.player.move(0, -4)
    }
    if ((this.currentInput === 'd')) {
      this.player.pos.direction = 144 // 'right'
      if (this.impassableTerrain('east')) return
      this.player.move(4, 0)
    }
    if ((this.currentInput === 's')) {
      this.player.pos.direction = 0 // 'down'
      if (this.impassableTerrain('south')) return
      this.player.move(0, 4)
    }
    if ((this.currentInput === 'a')) {
      this.player.pos.direction = 48 // 'left'
      if (this.impassableTerrain('west')) return
      this.player.move(-4, 0)
    }
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

    this.lastPos = [5376, 3528];
    this.pos = [5376,3528];
    
  }

  drawWorld(ctx) {
    ctx.drawImage(
      this.overworld,
      this.pos[0], // x axis anchor point
      this.pos[1], // y axis anchor point
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
      this.pos[0], // x axis anchor point
      this.pos[1], // y axis anchor point
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
    this.lastpos = [0,0]
    this.pos = [0,0]
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
      this.pos[0],
      this.pos[1],
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
    this.swordSound = new Audio("./assets/sfx/sword.wav");

    this.lastPos = { x: 336, y: 432, width: 48, height: 48, direction: 0, }
    this.pos = { x: 336, y: 432, width: 48, height: 48, direction: 0, }
    this.tracebox = {
      topLeft: [this.pos.x + 9, this.pos.y + 24],
      topRight: [this.pos.x + 39, this.pos.y + 24],
      bottomLeft: [this.pos.x + 9, this.pos.y + 45],
      bottomRight: [this.pos.x + 39, this.pos.y + 45],
    }

    this.runCycle = 0;
    this.frame = 0;

    this.attackFrame = 0;
    this.cooldown = 0;
    this.attacks = [];
  }

  clear(ctx) {
    ctx.clearRect(this.lastPos.x, this.lastPos.y, 48, 48);
  }

  step() {
    if (this.runCycle > 15) this.runCycle = 0;
    if (this.cooldown) this.cooldown--
    this.attackFrame ? this.attackFrame-- : this.attacks.splice(0,1)
    this.lastPos.x = this.pos.x;
    this.lastPos.y = this.pos.y;
  }

  draw(ctx) {
    if (this.attackFrame) {
      ctx.drawImage(
        this.sprite,
        this.pos.direction,
        96, // attack sprite pose
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
        this.pos.direction,
        this.runCycle < 9 ? 0 : 48,
        48,
        48,
        this.pos.x,
        this.pos.y,
        48,
        48
      )
    }
  }

  attack() {
    this.attackFrame = 15;
    this.cooldown = 18;
    this.attacks.push(new _sword_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.pos))
  }
  
  move(x,y) {
    this.pos.x += x;
    this.pos.y += y;
    this.tracebox.topLeft[0] += x, this.tracebox.topLeft[1] += y
    this.tracebox.topRight[0] += x, this.tracebox.topRight[1] += y
    this.tracebox.bottomLeft[0] += x, this.tracebox.bottomLeft[1] += y
    this.tracebox.bottomRight[0] += x, this.tracebox.bottomRight[1] += y
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

    if (pos.direction === 96) { // up
      this.pos = {
        x: pos.x, y: pos.y - 36,
        hurtBoxX: pos.x + 18, hurtBoxY: pos.y - 36,
        width: 9, height: 48, direction: 96,
      }
    } else if (pos.direction === 144) { // right
      this.pos = {
        x: pos.x + 36, y: pos.y,
        hurtBoxX: pos.x + 36, hurtBoxY: pos.y + 24,
        width: 48, height: 9, direction: 144
      }
    } else if (pos.direction === 0) { // down
      this.pos = {
        x: pos.x, y: pos.y + 36,
        hurtBoxX: pos.x + 21, hurtBoxY: pos.y + 36,
        width: 9, height: 48, direction: 0,
      }
    } else if (pos.direction === 48) { // left
      this.pos = {
        x: pos.x - 36, y: pos.y,
        hurtBoxX: pos.x - 36, hurtBoxY: pos.y + 24,
        width: 48, height: 9, direction: 48
      }
    }
  }

  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
    if (this.cooldown) ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {}

  draw(ctx) {
    ctx.drawImage(
      this.sprite,
      this.pos.direction,
      0,
      48,
      48,
      this.pos.x,
      this.pos.y,
      48,
      48,
      )
      this.attackFrame--

      // hurtbox debugger //
      // ctx.fillStyle = 'red';
      // ctx.fillRect(
      //   this.pos.hurtBoxX,
      //   this.pos.hurtBoxY,
      //   this.pos.width,
      //   this.pos.height)
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


class Octorok {
  constructor(pixelPos, grid) {
    this.sprite = new Image();
    this.sprite.src = "./assets/images/units/overworld-enemies.png"
    
    this.grid = grid;
    
    // unit stats
    this.hp = 1;
    this.ap = 1;

    //position data
    this.pos = { 
      x: pixelPos[0], 
      y: pixelPos[1], 
      row: ((pixelPos[1] - 168) / 48),
      col: (pixelPos[0] / 48), 
      width: 48, 
      height: 48 
    }
    this.lastPos = Object.assign({}, this.pos)
    
    // frame data
    this.runCycle = 0;
    this.actionCycle = 48;
    this.direction = 0;
    this.frame = 0;
    this.speed = _util_util__WEBPACK_IMPORTED_MODULE_0__["random"](1,3)
    this.invincibilityFrames = 0;
    //start action cycle
    this.updateAction();
  }
  
  clear(ctx) {
    ctx.clearRect(this.lastPos.x, this.lastPos.y, 48, 48);
  }

  step() {
    
    if (this.actionCycle <= 0) this.updateAction();
    
    if (this.direction === 96) { // north
      this.pos.y -= 1 * this.speed
    } else if (this.direction === 144) { // east
      this.pos.x += 1 * this.speed
    } else if (this.direction === 0) { // south
      this.pos.y += 1 * this.speed
    } else if (this.direction === 48) { // west
      this.pos.x -= 1 * this.speed
    }
    this.runCycle += 1 * this.speed;
    this.actionCycle -= 1 * this.speed;
  }
  
  draw(ctx) {
    if (this.runCycle < 14) {
      this.frame = 0;
    } else {
      this.frame = 48;
    }
    if (this.runCycle > 25) this.runCycle = 0;
    if (this.attacking) this.frame = 153;
    ctx.drawImage(
      this.sprite,
      this.direction,
      this.frame,
      48,
      48,
      this.pos.x,
      this.pos.y,
      48,
      48
      )
      this.lastPos.x = this.pos.x;
      this.lastPos.y = this.pos.y;
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
    this.actionCycle = 48;
    let action = _util_util__WEBPACK_IMPORTED_MODULE_0__["sample"](possibleActions);
    this.direction = action[0];
    this.pos.col += action[1];
    this.pos.row += action[2];
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

    this.runCycle = 0;
    this.invincibilityFrames = 100;
  }

  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    this.runCycle++
  }

  draw(ctx) {
    ctx.drawImage(
      this.sprite,
      96 + (48 * Math.floor(this.runCycle / 2)),
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

    this.invincibilityFrames = 100;
  }

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

/***/ "./src/util/util.js":
/*!**************************!*\
  !*** ./src/util/util.js ***!
  \**************************/
/*! exports provided: equalArr, sumArr, getMapPixel, sumMapPixel, scanMapTile, sample, random */
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
  // console.log([pixel.data[0], pixel.data[1], pixel.data[2]]);
  return [pixel.data[0], pixel.data[1], pixel.data[2]];
}

function sumMapPixel(ctx, x, y) {
  const pixel = ctx.getImageData(x, y, 1, 1);
  return (pixel.data[0] + pixel.data[1] + pixel.data[2]);
}

function scanMapTile(ctx, x, y) {
  const tile = ctx.getImageData(x+23, y+23, 2, 2);
  // if (sumArr(tile.data) === 1020) return true;
  // return false;
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