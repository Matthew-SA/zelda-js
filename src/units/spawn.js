import * as util from '../util'

class Spawn {
  constructor(pos) {
    this.pos = [pos[0], pos[1]];
    this.sprite = new Image();
    this.sprite.src = "../assets/images/units/spawn.png"
    this.runCycle = util.random(0,150);
  }

  draw(ctx) {
    ctx.drawImage(
      this.sprite,
      0,
      0,
      48,
      48,
      this.pos[0],
      this.pos[1],
      48,
      48
    )
  }

  clear(ctx) {
    ctx.clearRect(this.pos[0], this.pos[1], 48, 48);
  }
}

export default Spawn;