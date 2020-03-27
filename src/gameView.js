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


export default GameView;