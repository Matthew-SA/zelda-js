import * as util from '../util'

class Octorok {
  constructor(pos, grid) {
    this.lastPos = [pos[0], pos[1]];
    this.pos = [pos[0], pos[1]];
    this.sprite = new Image();
    this.sprite.src = "../assets/images/units/octorok.png"
    this.runCycle = 0;
    this.actionCycle = util.random(0,150);
    this.direction = 0
    this.frame = 0;
    this.actions = ['north','east','south','west']
    this.grid = grid;
  }

  step() {
    if (this.actionCycle <= 0)

    this.actionCycle--
  }

  getNeighbors() {
    
  }
  update(x, y) {
    this.pos[0] += x;
    this.pos[1] += y;
  }

  draw(ctx) {
    if (this.runCycle < 14) {
      this.frame = 0;
    } else {
      this.frame = 51;
    }
    if (this.runCycle > 25) this.runCycle = 0;
    if (this.attacking) this.frame = 153;
    ctx.drawImage(
      this.sprite,
      this.direction,
      this.frame,
      48,
      48,
      this.pos[0],
      this.pos[1],
      48,
      48
    )
    this.lastPos[0] = this.pos[0];
    this.lastPos[1] = this.pos[1];
  }

  clear(ctx) {
    ctx.clearRect(this.lastPos[0], this.lastPos[1], 48, 48);
  }
}

export default Octorok;