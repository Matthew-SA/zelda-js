import key from 'keymaster'
import Player from './player'

const FPS = 60;

class GameView {
  constructor(ctx) {
    // this.game = game;
    this.ctx = ctx;
    this.player = new Player
    this.lastInput = null;
  }

  start() {
    const gameLoop = setInterval(() => {
      // this.ctx.clearRect(0, 0, 800, 700);
      this.getLastInput();
      this.checkKey();
      // this.game.step();
      // this.game.draw(this.ctx);
      this.player.draw(this.ctx);
    }, 1000 / FPS)
  }

  getLastInput() {
    if (key.isPressed('w')) {
      this.lastInput = 'w'
    }
    if (key.isPressed('a')) {
      this.lastInput = 'a'
    }
    if (key.isPressed('s')) {
      this.lastInput = 's'
    }
    if (key.isPressed('d')) {
      this.lastInput = 'd'
    }
  }

  checkKey() {
    if (this.lastInput === 'w') {
      this.player.pos[1] -= 2
    }
    if (this.lastInput === 'a') {
      this.player.pos[0] -= 2
    }
    if (this.lastInput === 's') {
      this.player.pos[1] += 2
    }
    if (this.lastInput === 'd') {
      this.player.pos[0] += 2
    }
  }
  // checkKey() {
  //   if (key.isPressed('w')) {
  //     this.player.pos[1] -= 2
  //   }
  //   if (key.isPressed('a')) {
  //     this.player.pos[0] -= 2
  //   }
  //   if (key.isPressed('s')) {
  //     this.player.pos[1] += 2
  //   }
  //   if (key.isPressed('d')) {
  //     this.player.pos[0] += 2
  //   }
  // }
}

export default GameView;