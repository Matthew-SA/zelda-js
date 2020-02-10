import key from 'keymaster'
import Game from './game'
import * as constants from './util/constants'
import * as util from './util/util'


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
    let pixel1value = util.sumArr(pixel1)
    let pixel2value = util.sumArr(pixel2)
    if (pixel1value === constants.WALL || pixel1value === constants.WATER) return true;
    if (pixel2value === constants.WALL || pixel2value === constants.WATER) return true;
    return false;
  }

  impassableTerrain(direction) {
    if (direction === 'north') {
      const topPixel = util.getMapPixel(
        this.collisionCtx,
        this.player.tracebox.topLeft[0], 
        this.player.tracebox.topLeft[1] - 3)
      const bottomPixel = util.getMapPixel(
        this.collisionCtx,
        this.player.tracebox.topRight[0],
        this.player.tracebox.topRight[1] - 3)
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'east') {
      const topPixel = util.getMapPixel(
        this.collisionCtx,
        this.player.tracebox.topRight[0] + 3,
        this.player.tracebox.topRight[1])
      const bottomPixel = util.getMapPixel(
        this.collisionCtx,
        this.player.tracebox.bottomRight[0] + 3,
        this.player.tracebox.bottomRight[1])
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'south') {
      const topPixel = util.getMapPixel(
        this.collisionCtx,
        this.player.tracebox.bottomLeft[0],
        this.player.tracebox.bottomLeft[1] + 3)
      const bottomPixel = util.getMapPixel(
        this.collisionCtx,
        this.player.tracebox.bottomRight[0],
        this.player.tracebox.bottomRight[1] + 3)
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'west') {
      const topPixel = util.getMapPixel(
        this.collisionCtx,
        this.player.tracebox.topLeft[0] - 3,
        this.player.tracebox.topRight[1])
      const bottomPixel = util.getMapPixel(
        this.collisionCtx,
        this.player.tracebox.bottomLeft[0] - 3, 
        this.player.tracebox.bottomLeft[1])
      return this.checkIfBarrier(topPixel, bottomPixel)
    }
  }

  // player input below
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
    if (this.game.scrolling) return;
    if (this.player.cooldown) return;

    const entry = Object.entries(this.lastInput).reduce((accum, entry) => (entry[1] > accum[1] ? entry : accum), ['', null])
    this.currentInput = entry[0]
    if (key.isPressed('/')) {
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


export default GameView;