import * as util from '../util/util'

class Spawn {
  constructor(pixelPos) {
    this.pixelPos = pixelPos;
    this.sprite = new Image();
    this.sprite.src = "./assets/images/units/spawn.png"
    this.runCycle = util.random(0,150);
  }

  step() {}

  draw(ctx) {
    ctx.drawImage(
      this.sprite,
      0,
      0,
      48,
      48,
      this.pixelPos[0],
      this.pixelPos[1],
      48,
      48
    )
  }

  clear(ctx) {
    ctx.clearRect(this.pixelPos[0], this.pixelPos[1], 48, 48);
  }
}

export default Spawn;