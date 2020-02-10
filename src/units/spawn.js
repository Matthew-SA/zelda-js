import * as util from '../util/util'

class Spawn {
  constructor(pixelPos) {
    this.pos = {
      x: pixelPos[0],
      y: pixelPos[1],
      width: 48,
      height: 48,
    }
    this.pixelPos = pixelPos;
    this.sprite = new Image();
    this.sprite.src = "./assets/images/effects.png"
    this.runCycle = util.random(20,150);

    this.invincibilityFrames = 100;
  }

  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    this.runCycle --
  }

  draw(ctx) {
    ctx.drawImage(
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