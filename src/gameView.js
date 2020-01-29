import key from 'keymaster'
import Player from './player'

const FPS = 60;

class GameView {
  constructor(ctx) {
    // this.game = game;
    this.ctx = ctx;
    this.player = new Player(ctx)
    this.lastInput ={'a': null, 'w': null, 'd': null, 's': null};
    this.currentInput = null;
  }

  init() {
    // this.player.draw(this.ctx, this.playerDirection);
    // console.log("ctx", this.ctx)
    // console.log("playerDirection", this.playerDirection)
    setTimeout(() => {
      this.player.stepPlayer(this.ctx);
      console.log('start!')
      this.start();
    }, 30);
    // this.player.draw(this.ctx, this.playerDirection);
  }

  start() {
    const gameLoop = setInterval(() => {
      this.getLastInput();
      this.checkKey();
      // if (this.player.attacking) {}
      if (this.currentInput) {
        this.player.runCycle ++; 
        this.player.clearPlayer(this.ctx);
        this.player.stepPlayer(this.ctx);
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
      this.player.attack(this.ctx);
      setTimeout(() => {
        this.player.clearPlayer(this.ctx);
        this.player.stepPlayer(this.ctx);
      }, 250)
      console.log('attack!');
    }
  }
}

export default GameView;