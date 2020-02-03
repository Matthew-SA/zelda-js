import key from 'keymaster'
import Game from './game'
import * as constants from './constants'
import * as util from './util'


// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles

class GameView {
  constructor(menuCtx, spriteCtx, worldCtx, collisionCtx) {
    // this.lastTime;
    this.game = new Game;
    this.menuCtx = menuCtx;
    this.spriteCtx = spriteCtx;
    this.worldCtx = worldCtx;
    this.collisionCtx = collisionCtx;
    this.menu = this.game.menu;
    this.player = this.game.player;
    this.overworld = this.game.overworld;
    this.lastInput = {'a': null, 'w': null, 'd': null, 's': null};
    this.currentInput = null;
    this.scrolling = false;
    this.scrollQueue = 0;
  }

  // start primary game loop
  init() {
    setTimeout(() => {
      this.overworld.drawWorld(this.worldCtx)
      this.overworld.drawCollisionMap(this.collisionCtx)
      this.menu.draw(this.menuCtx)
      this.player.draw(this.spriteCtx);
      requestAnimationFrame(() => this.gameLoop())
    }, 30);
  }
  
  // primary game loop  TODO: add pixel /sec to ensure proper gameplay at all FPS
  gameLoop() {
    // let now = Date.now();
    // let dt = (now - lastTime) / 1000.0;
    this.checkBorder();
    this.scroll();
    this.getLastInput();
    this.checkKey();
    this.game.incrementUnitRunCycle(this.spriteCtx);
    this.game.clearUnits(this.spriteCtx);
    this.game.drawUnits(this.spriteCtx);
    if (this.currentInput) this.player.runCycle++;
    window.requestAnimationFrame(() => this.gameLoop())
  }

  // check if map border has been crossed by player
  checkBorder() {
    if (this.player.pos[1] < constants.BORDERTOP) {
      this.scrolling = true;
      this.game.destroyUnits(this.spriteCtx)
      this.scrollQueue = 528;
    }
    if (this.player.pos[0] > constants.BORDERRIGHT) {
      this.scrolling = true;
      this.game.destroyUnits(this.spriteCtx)
      this.scrollQueue = 768;
    }
    if (this.player.pos[1] > constants.BORDERBOTTOM) {
      this.scrolling = true;
      this.game.destroyUnits(this.spriteCtx)
      this.scrollQueue = 528;
    }
    if (this.player.pos[0] < constants.BORDERLEFT) {
      this.scrolling = true;
      this.game.destroyUnits(this.spriteCtx)
      this.scrollQueue = 768;
    }
  }

  // if scrolling, move screen and player
  // if player is past a certain distance, stop scrolling player
  // when scrolling is finished, update collision map
  scroll() {
    if (!this.scrolling) return;
    if (this.scrollQueue <= 0) {
      this.scrolling = false;
      this.overworld.drawCollisionMap(this.collisionCtx)
      this.scanGrid();
      this.game.spawnUnits();
    } else {
      if (this.player.direction === 102) {
        this.overworld.pos[1] -= 8;
        if (this.scrollQueue > 48) this.player.update(0, 8)
      }
      if (this.player.direction === 153) {
        this.overworld.pos[0] += 8;
        if (this.scrollQueue > 48) this.player.update(-8, 0)
      }
      if (this.player.direction === 0) {
        this.overworld.pos[1] += 8;
        if (this.scrollQueue > 48) this.player.update(0, -8)
      }
      if (this.player.direction === 51) {
        this.overworld.pos[0] -= 8;
        if (this.scrollQueue > 48) this.player.update(8, 0)
      }
      this.scrollQueue -= 8;
      this.overworld.drawWorld(this.worldCtx)
    }
  }

  scanGrid() {
    let newGrid = [];
    let openSpaces = [];
    for (let y = 192; y < 696; y += 48) {
      let row = [];
      for (let x = 24; x < 768; x += 48) {
        let value = util.sumMapPixel(x-24, y-24, this.collisionCtx);
        row.push(value);
        if (!value) openSpaces.push([x-24,y-24]);
      }
      newGrid.push(row);
    }
    this.game.openSpaces = openSpaces;
    this.game.grid = newGrid;
  }

  checkIfBarrier(pixel1, pixel2) {
    let pixel1value = util.sumArr(pixel1)
    let pixel2value = util.sumArr(pixel2)
    if (pixel1value === constants.WALL || pixel1value === constants.WATER) return true;
    if (pixel2value === constants.WALL || pixel2value === constants.WATER) return true;
    return false;
  }

  impassableTerrain(direction) {
    if (direction === 'north') {
      const topPixel = util.getMapPixel(
        this.player.tracebox.topLeft[0], 
        this.player.tracebox.topLeft[1] - 3,
        this.collisionCtx);
      const bottomPixel = util.getMapPixel(
        this.player.tracebox.topRight[0],
        this.player.tracebox.topRight[1] - 3,
        this.collisionCtx);
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'east') {
      const topPixel = util.getMapPixel(
        this.player.tracebox.topRight[0] + 3,
        this.player.tracebox.topRight[1],
        this.collisionCtx);
      const bottomPixel = util.getMapPixel(
        this.player.tracebox.bottomRight[0] + 3,
        this.player.tracebox.bottomRight[1],
        this.collisionCtx);
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'south') {
      const topPixel = util.getMapPixel(
        this.player.tracebox.bottomLeft[0],
        this.player.tracebox.bottomLeft[1] + 3,
        this.collisionCtx);
      const bottomPixel = util.getMapPixel(
        this.player.tracebox.bottomRight[0],
        this.player.tracebox.bottomRight[1] + 3,
        this.collisionCtx);
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'west') {
      const topPixel = util.getMapPixel(
        this.player.tracebox.topLeft[0] - 3,
        this.player.tracebox.topRight[1],
        this.collisionCtx);
      const bottomPixel = util.getMapPixel(
        this.player.tracebox.bottomLeft[0] - 3, 
        this.player.tracebox.bottomLeft[1],
        this.collisionCtx);
      return this.checkIfBarrier(topPixel, bottomPixel)
    }
  }

  getLastInput() {
    if (key.isPressed('w') && this.lastInput.w === null) {
      this.lastInput.w = Date.now();
    } else if (!key.isPressed('w') && this.lastInput.w !== null) {
      this.lastInput.w = null;
    }

    if (key.isPressed('d') && this.lastInput.d === null) {
      this.lastInput.d = Date.now();
    } else if (!key.isPressed('d') && this.lastInput.d !== null) {
      this.lastInput.d = null;
    }
    
    if (key.isPressed('s') && this.lastInput.s === null) {
      this.lastInput.s = Date.now();
    } else if (!key.isPressed('s') && this.lastInput.s !== null) {
      this.lastInput.s = null;
    }

    if (key.isPressed('a') && this.lastInput.a === null) {
      this.lastInput.a = Date.now();
    } else if (!key.isPressed('a') && this.lastInput.a !== null) {
      this.lastInput.a = null;
    }
  }

  checkKey() {
    if (this.scrolling) return;
    if (this.player.cooldown) return;

    const entry = Object.entries(this.lastInput).reduce((accum, entry) => (entry[1] > accum[1] ? entry : accum), ['', null])
    this.currentInput = entry[0]
    if (key.isPressed('/')) {
      this.currentInput = 'attack'
      this.player.attackFrame = 15;
      this.player.cooldown = 18;
    }
    if ((this.currentInput === 'w')) {
      this.player.direction = 102 // 'up'
      if (this.impassableTerrain('north')) return
      this.player.update(0, -4)
    }
    if ((this.currentInput === 'd')) {
      this.player.direction = 153 // 'right'
      if (this.impassableTerrain('east')) return
      this.player.update(4, 0)
    }
    if ((this.currentInput === 's')) {
      this.player.direction = 0 // 'down'
      if (this.impassableTerrain('south')) return
      this.player.update(0, 4)
    }
    if ((this.currentInput === 'a')) {
      this.player.direction = 51 // 'left'
      if (this.impassableTerrain('west')) return
      this.player.update(-4, 0)
    }
  }
}


export default GameView;