import key from 'keymaster'
import Menu from './menu.js'
import Player from './player'
import World from './world.js'
import * as constants from './constants'
import * as util from './util'


// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles

class GameView {
  constructor(menuCtx, spriteCtx, worldCtx, collisionCtx) {
    // this.lastTime;
    // this.game = game;
    this.menuCtx = menuCtx;
    this.spriteCtx = spriteCtx;
    this.worldCtx = worldCtx;
    this.collisionCtx = collisionCtx;
    this.menu = new Menu;
    this.player = new Player;
    this.world = new World;
    this.lastInput = {'a': null, 'w': null, 'd': null, 's': null};
    this.currentInput = null;
    this.scrollQueue = 0;
  }

  init() {
    setTimeout(() => {
      this.world.drawWorld(this.worldCtx)
      this.world.drawCollisionMap(this.collisionCtx)
      this.menu.draw(this.menuCtx)
      this.player.draw(this.spriteCtx);
      requestAnimationFrame(() => this.gameLoop())
    }, 30);
  }
  
  checkBorder() {
    if (this.player.pos[1] < constants.BORDERTOP) {
      this.player.frozen = true;
      this.scrollQueue = 528;
    }
    if (this.player.pos[0] > constants.BORDERRIGHT) {
      this.player.frozen = true;
      this.scrollQueue = 768;
    }
    if (this.player.pos[1] > constants.BORDERBOTTOM) {
      this.player.frozen = true;
      this.scrollQueue = 528;
    }
    if (this.player.pos[0] < constants.BORDERLEFT) {
      this.player.frozen = true;
      this.scrollQueue = 768;
    }
  }

  scroll() {
    if (this.scrollQueue) {
      this.world.drawWorld(this.worldCtx)
      this.scrollQueue -= 8;
      if (this.player.direction === 102) {
        this.world.pos[1] -= 8;
        this.player.movePlayerPos(0,8)
      } else if (this.player.direction === 153) {
        this.world.pos[0] += 8;
        this.player.movePlayerPos(-8, 0)
      } else if (this.player.direction === 0) {
        this.world.pos[1] += 8;
        this.player.movePlayerPos(0, -8)
      } else if (this.player.direction === 51) {
        this.world.pos[0] -= 8;
        this.player.movePlayerPos(8, 0)
      }
    } else {
      this.world.drawCollisionMap(this.collisionCtx)
    }
  }

  // scroll() {
  //   if (this.moveQueueX <= 0) {
  //     this.player.frozen = false;
  //     this.scrolling.east = false;
  //     this.moveQueueX = 768;
  //     this.world.drawCollisionMap(this.collisionCtx)
  //   } else {
  //     this.scrolling.east = true;
  //     this.player.frozen = true;
  //     this.world.pos[0] += 8;
  //     this.moveQueueX -= 8;
  //     this.player.movePlayerPos(-8, 0)
  //     this.world.drawWorld(this.worldCtx)
  //   }
  // }

  gameLoop() {
    // let now = Date.now();
    // let dt = (now - lastTime) / 1000.0;
    this.checkBorder();
    this.scroll();
    this.getLastInput();
    this.checkKey();
    if (this.currentInput) {
      this.player.runCycle++;
      this.player.draw(this.spriteCtx);
    }
    // if (this.playerScrolling.north || this.player.pos[1] < constants.BORDERTOP) {
    //   if (this.moveQueueY <= 0) {
    //     this.player.frozen = false;
    //     this.playerScrolling.north = false;
    //     this.moveQueueY = 528; //*
    //     this.world.drawCollisionMap(this.collisionCtx)
    //   } else {
    //     this.playerScrolling.north = true;
    //     this.player.frozen = true;
    //     this.world.pos[1] -= 8; //*
    //     this.moveQueueY -= 8; //*
    //     this.player.movePlayerPos(0,8) //*
    //     this.world.drawWorld(this.worldCtx)
    //   }
    // }
    // if (this.playerScrolling.east || this.player.pos[0] > constants.BORDERRIGHT) {
    //   if (this.moveQueueX <= 0) {
    //     this.player.frozen = false;
    //     this.playerScrolling.east = false;
    //     this.moveQueueX = 768;
    //     this.world.drawCollisionMap(this.collisionCtx)
    //   } else {
    //     this.playerScrolling.east = true;
    //     this.player.frozen = true;
    //     this.world.pos[0] += 8;
    //     this.moveQueueX -= 8;
    //     this.player.movePlayerPos(-8, 0)
    //     this.world.drawWorld(this.worldCtx)
    //   }
    // }
    // if (this.playerScrolling.south || this.player.pos[1] > constants.BORDERBOTTOM) {
    //   if (this.moveQueueY <= 0) {
    //     this.player.frozen = false;
    //     this.playerScrolling.south = false;
    //     this.moveQueueY = 528;
    //     this.world.drawCollisionMap(this.collisionCtx)
    //   } else {
    //     this.playerScrolling.south = true;
    //     this.player.frozen = true;
    //     this.world.pos[1] += 8;
    //     this.moveQueueY -= 8;
    //     this.player.movePlayerPos(0, -8)
    //     this.world.drawWorld(this.worldCtx)
    //   }
    // }
    // if (this.playerScrolling.west || this.player.pos[0] < constants.BORDERLEFT) {
    //   if (this.moveQueueX <= 0) {
    //     this.player.frozen = false;
    //     this.playerScrolling.west = false;
    //     this.moveQueueX = 768;
    //     this.world.drawCollisionMap(this.collisionCtx)
    //   } else {
    //     this.playerScrolling.west = true;
    //     this.player.frozen = true;
    //     this.world.pos[0] -= 8;
    //     this.moveQueueX -= 8;
    //     this.player.movePlayerPos(8, 0)
    //     this.world.drawWorld(this.worldCtx)
    //   }
    // }
    window.requestAnimationFrame(() => this.gameLoop())
  }

  moveGameView(x,y) {

  }

  getMapPixel(x,y) {
    const pixel = this.collisionCtx.getImageData(x, y, 1, 1)
    // console.log([pixel.data[0], pixel.data[1], pixel.data[2]])
    return [pixel.data[0], pixel.data[1], pixel.data[2]]
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
      const topPixel = this.getMapPixel(this.player.tracebox.topLeft[0], this.player.tracebox.topLeft[1] - 3)
      const bottomPixel = this.getMapPixel(this.player.tracebox.topRight[0], this.player.tracebox.topRight[1] - 3)
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'east') {
      const topPixel = this.getMapPixel(this.player.tracebox.topRight[0] + 3, this.player.tracebox.topRight[1])
      const bottomPixel = this.getMapPixel(this.player.tracebox.bottomRight[0] + 3, this.player.tracebox.bottomRight[1])
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'south') {
      const topPixel = this.getMapPixel(this.player.tracebox.bottomLeft[0], this.player.tracebox.bottomLeft[1] + 3)
      const bottomPixel = this.getMapPixel(this.player.tracebox.bottomRight[0], this.player.tracebox.bottomRight[1] + 3)
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'west') {
      const topPixel = this.getMapPixel(this.player.tracebox.topLeft[0] - 3, this.player.tracebox.topRight[1])
      const bottomPixel = this.getMapPixel(this.player.tracebox.bottomLeft[0] - 3, this.player.tracebox.bottomLeft[1])
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
    if (this.scrolling.east) return;
    if (this.player.frozen) return;
    if (this.player.attacking) return;

    const entry = Object.entries(this.lastInput).reduce((accum, entry) => (entry[1] > accum[1] ? entry : accum), ['', null])
    this.currentInput = entry[0]
    if (key.isPressed('/')) {
      this.currentInput = 'attack'
      this.player.drawSword(this.spriteCtx);
      setTimeout(() => {
        this.player.draw(this.spriteCtx);
      }, 250)
    }
    if ((this.currentInput === 'w')) {
      this.player.direction = 102 // 'up'
      if (this.impassableTerrain('north')) return
      this.player.movePlayerPos(0, -4)
    }
    if ((this.currentInput === 'd')) {
      this.player.direction = 153 // 'right'
      if (this.impassableTerrain('east')) return
      this.player.movePlayerPos(4, 0)
    }
    if ((this.currentInput === 's')) {
      this.player.direction = 0 // 'down'
      if (this.impassableTerrain('south')) return
      this.player.movePlayerPos(0, 4)
    }
    if ((this.currentInput === 'a')) {
      this.player.direction = 51 // 'left'
      if (this.impassableTerrain('west')) return
      this.player.movePlayerPos(-4, 0)
    }
  }
}


export default GameView;