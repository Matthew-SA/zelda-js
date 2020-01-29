import key from 'keymaster'
import Menu from './menu.js'
import Player from './player'
import World from './world.js'

const FPS = 60;

class GameView {
  constructor(menuCtx, spriteCtx, worldCtx) {
    // this.game = game;
    this.menuCtx = menuCtx;
    this.spriteCtx = spriteCtx;
    this.worldCtx = worldCtx;
    this.menu = new Menu;
    this.player = new Player;
    this.world = new World;
    this.lastInput ={'a': null, 'w': null, 'd': null, 's': null};
    this.currentInput = null;
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
        console.log("animating!")
      }
    }, 1000 / FPS)
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
    if (this.player.attacking) {
      return;
    }
    const entry = Object.entries(this.lastInput).reduce((accum, entry) => (entry[1] > accum[1] ? entry : accum), ['', null])
    this.currentInput = entry[0]
    if (this.currentInput === 'w') {
      this.player.pos[1] -= 3
      this.player.direction = 102 // 'up'
    }
    if (this.currentInput === 'a') {
      this.player.pos[0] -= 3
      this.player.direction = 51 // 'left'
    }
    if (this.currentInput === 's') {
      this.player.pos[1] += 3
      this.player.direction = 0 // 'down'
    }
    if (this.currentInput === 'd') {
      this.player.pos[0] += 3
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