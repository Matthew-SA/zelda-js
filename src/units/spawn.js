import * as util from '../util/util'

class Spawn {
  constructor(pixelPos, ctx) {
    this.ctx = ctx
    this.sprite = new Image();
    this.sprite.src = "./assets/images/effects.png"
    this.pos = {
      x: pixelPos[0],
      y: pixelPos[1],
      width: 48,
      height: 48,
    }
    this.pixelPos = pixelPos;
    this.runCycle = util.random(20,150);

    this.frameData = {
      // run: 0,
      invincibility: 100,
    }
  }

  takeDamage() {}

  clear() {
    this.ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    this.runCycle --
  }

  draw() {
    this.ctx.drawImage(
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

export default Spawn;