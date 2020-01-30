import key from 'keymaster'
import Menu from './menu.js'
import Player from './player'
import World from './world.js'
import * as constants from './constants'

// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles

class GameView {
  constructor(menuCtx, spriteCtx, worldCtx) {
    // this.game = game;
    this.menuCtx = menuCtx;
    this.spriteCtx = spriteCtx;
    this.worldCtx = worldCtx;
    this.menu = new Menu;
    this.player = new Player;
    this.world = new World;
    this.lastInput = {'a': null, 'w': null, 'd': null, 's': null};
    this.playerScrolling = {'north': false, 'east': false, 'south': false, 'west': false};
    this.currentInput = null;
    this.moveQueueX = 768;
    this.moveQueueY = 528;
  }

  init() {
    setTimeout(() => {
      this.world.drawWorld(this.worldCtx)
      this.menu.drawMenu(this.menuCtx)
      this.player.drawPlayer(this.spriteCtx);
      console.log('start!')
      this.start();
    }, 10)
  }

  start() {
    const gameLoop = setInterval(() => {
      this.getLastInput();
      this.checkKey();
      if (this.currentInput) {
        this.player.runCycle ++; 
        this.player.clearPlayer(this.spriteCtx);
        this.player.drawPlayer(this.spriteCtx);
      }
      if (this.playerScrolling.north || this.player.pos[1] < constants.BORDERTOP) {
        if (this.moveQueueY <= 0) {
          this.player.frozen = false;
          this.playerScrolling.north = false;
          this.moveQueueY = 528;
        } else {
          this.playerScrolling.north = true;
          this.player.frozen = true;
          this.world.pos[1] -= 8;
          this.player.pos[1] += 8;
          this.moveQueueY -= 8;
          this.world.drawWorld(this.worldCtx)
        }
      }
      if (this.playerScrolling.east || this.player.pos[0] > constants.BORDERRIGHT) {
        if (this.moveQueueX <= 0) {
          this.player.frozen = false;
          this.playerScrolling.east = false;
          this.moveQueueX = 768;
        } else {
          this.playerScrolling.east = true;
          this.player.frozen = true;
          this.world.pos[0] += 8;
          this.player.pos[0] -= 8;
          this.moveQueueX -= 8;
          this.world.drawWorld(this.worldCtx)
        }
      }
      if (this.playerScrolling.south || this.player.pos[1] > constants.BORDERBOTTOM) {
        if (this.moveQueueY <= 0) {
          this.player.frozen = false;
          this.playerScrolling.south = false;
          this.moveQueueY = 528;
        } else {
          this.playerScrolling.south = true;
          this.player.frozen = true;
          this.world.pos[1] += 8;
          this.player.pos[1] -= 8;
          this.moveQueueY -= 8;
          this.world.drawWorld(this.worldCtx)
        }
      }
      if (this.playerScrolling.west || this.player.pos[0] < constants.BORDERLEFT) {
        if (this.moveQueueX <= 0) {
          this.player.frozen = false;
          this.playerScrolling.west = false;
          this.moveQueueX = 768;
        } else {
          this.playerScrolling.west = true;
          this.player.frozen = true;
          this.world.pos[0] -= 8;
          this.player.pos[0] += 8;
          this.moveQueueX -= 8;
          this.world.drawWorld(this.worldCtx)
        }
      }
    }, 1000 / constants.FPS)
  }

  getLastInput() {
    if (key.isPressed('w') && this.lastInput.w === null) {
      this.lastInput.w = Date.now();
    } else if (!key.isPressed('w') && this.lastInput.w !== null) {
      this.lastInput.w = null;
    }

    if (key.isPressed('a') && this.lastInput.a === null) {
      this.lastInput.a = Date.now();
    } else if (!key.isPressed('a') && this.lastInput.a !== null) {
      this.lastInput.a = null;
    }

    if (key.isPressed('s') && this.lastInput.s === null) {
      this.lastInput.s = Date.now();
    } else if (!key.isPressed('s') && this.lastInput.s !== null) {
      this.lastInput.s = null;
    }

    if (key.isPressed('d') && this.lastInput.d === null) {
      this.lastInput.d = Date.now();
    } else if (!key.isPressed('d') && this.lastInput.d !== null) {
      this.lastInput.d = null;
    }
  }

  checkKey() {
    if (this.player.frozen) return;
    if (this.player.attacking) return;

    const entry = Object.entries(this.lastInput).reduce((accum, entry) => (entry[1] > accum[1] ? entry : accum), ['', null])
    this.currentInput = entry[0]
    if (this.currentInput === 'w') {
      this.player.pos[1] -= 3
      // this.playerPosition[1] -= 3  // track center of player position?
      this.player.direction = 102 // 'up'
    }
    if (this.currentInput === 'a') {
      this.player.pos[0] -= 3
      // this.playerPosition[0] -= 3  // track center of player position?
      this.player.direction = 51 // 'left'
    }
    if (this.currentInput === 's') {
      this.player.pos[1] += 3
      // this.playerPosition[1] += 3  // track center of player position?
      this.player.direction = 0 // 'down'
    }
    if (this.currentInput === 'd') {
      this.player.pos[0] += 3
      // this.playerPosition[0] += 3  // track center of player position?
      this.player.direction = 153 // 'right'
    }
    if (key.isPressed('/')) {
      this.currentInput = 'attack'
      this.player.drawSword(this.spriteCtx);
      setTimeout(() => {
        this.player.clearPlayer(this.spriteCtx);
        this.player.drawPlayer(this.spriteCtx);
      }, 250)
    }
  }
}

export default GameView;