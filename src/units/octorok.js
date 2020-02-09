import * as util from '../util'

class Octorok {
  constructor(pos, grid) {
    this.lastPos = pos
    this.pos = pos;
    this.grid = grid;
    this.gridRow = ((pos[1] - 168) / 48)
    this.gridCol = pos[0] / 48
    this.sprite = new Image();
    this.sprite.src = "./assets/images/units/octorok.png"
    this.runCycle = 0;
    this.actionCycle = 48;
    this.direction = 0
    this.frame = 0;
    this.queueMovement();
    console.log(this.gridRow)
    console.log(this.gridCol)
  }

  step() {
    if (this.actionCycle <= 0) {
      this.gridRow = Math.floor((this.pos[1] - 168) / 48);
      this.gridCol = Math.floor(this.pos[0] / 48);
      this.queueMovement();
    }
    if (this.direction === 102) { // north
      this.pos[1] -= 1
    } else if (this.direction === 153) { // east
      this.pos[0] += 1
    } else if (this.direction === 0) { // south
      this.pos[1] += 1
    } else if (this.direction === 51) { // west
      this.pos[0] -= 1
    }
    this.actionCycle -= 1
  }

  checkAvailableActions() {
    let neighbors = [];
    this.gridRow = Math.floor(this.gridRow)
    this.gridCol = Math.floor(this.gridCol)
    if (this.gridRow > 0) {
      if (this.grid[this.gridRow - 1][this.gridCol] === 0) neighbors.push(102); // north
    }
    if (this.grid[this.gridRow][this.gridCol + 1] === 0) neighbors.push(153); // east
    if (this.gridRow < 10) {
      if (this.grid[this.gridRow + 1][this.gridCol] === 0) neighbors.push(0); // south
    }
    if (this.grid[this.gridRow][this.gridCol - 1] === 0) neighbors.push(51); // west
    return neighbors;
  }

  queueMovement() {
    let actions = this.checkAvailableActions();
    this.actionCycle = 48;
    this.direction = util.sample(actions);
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