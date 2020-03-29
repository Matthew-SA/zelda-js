import Game from './game'

// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles

class GameView {
  constructor(hudCtx, spriteCtx, worldCtx, collisionCtx) {
    // this.lastTime;
    this.spriteCtx = spriteCtx;
    this.collisionCtx = collisionCtx;
    this.game = new Game(hudCtx, spriteCtx, worldCtx, collisionCtx);
    this.hud = this.game.hud;
    this.player = this.game.player;
    this.overworld = this.game.overworld;
  }

  // start primary game loop
  init() {
    this.overworld.render();
    this.hud.render()
    this.player.render();
    this.hud.renderStartpage();
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
    this.game.player.clear()
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
    this.player.render();
  }
}


export default GameView;