import * as util from '../util/util'

class Octorok {
  constructor(pixelPos, grid) {
    this.sprite = new Image();
    this.sprite.src = "./assets/images/units/overworld-enemies.png"
    
    this.grid = grid;
    
    // unit stats
    this.hp = 1;
    this.ap = 1;

    //position data
    this.pos = { 
      x: pixelPos[0], 
      y: pixelPos[1], 
      row: ((pixelPos[1] - 168) / 48),
      col: (pixelPos[0] / 48), 
      width: 48, 
      height: 48 
    }
    // this.lastPos = Object.assign({}, this.pos)
    
    // frame data
    this.runCycle = 0;
    this.actionCycle = 48;
    this.direction = 0;
    this.frame = 0;
    this.speed = util.random(1,3)
    this.invincibilityFrames = 0;
    //start action cycle
    this.updateAction();
  }
  
  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    
    if (this.actionCycle <= 0) this.updateAction();
    
    if (this.direction === 96) { // north
      this.pos.y -= 1 * this.speed
    } else if (this.direction === 144) { // east
      this.pos.x += 1 * this.speed
    } else if (this.direction === 0) { // south
      this.pos.y += 1 * this.speed
    } else if (this.direction === 48) { // west
      this.pos.x -= 1 * this.speed
    }
    this.runCycle += 1 * this.speed;
    this.actionCycle -= 1 * this.speed;
  }
  
  draw(ctx) {
    if (this.runCycle < 14) {
      this.frame = 0;
    } else {
      this.frame = 48;
    }
    if (this.runCycle > 25) this.runCycle = 0;
    if (this.attacking) this.frame = 153;
    ctx.drawImage(
      this.sprite,
      this.direction,
      this.frame,
      48,
      48,
      this.pos.x,
      this.pos.y,
      48,
      48
      )
      // this.lastPos.x = this.pos.x;
      // this.lastPos.y = this.pos.y;
    }

  checkAvailableActions() {
    let neighbors = [];
    if (this.pos.row > 0 && this.grid[this.pos.row - 1][this.pos.col] === 1020) {
      neighbors.push([96, 0, -1]); // north
    }
    if (this.grid[this.pos.row][this.pos.col + 1] === 1020) {
      neighbors.push([144, 1, 0]); // east
    }
    if (this.pos.row < 10 && this.grid[this.pos.row + 1][this.pos.col] === 1020) {
      neighbors.push([0, 0, 1]); // south
    }
    if (this.grid[this.pos.row][this.pos.col - 1] === 1020) {
      neighbors.push([48, -1, 0]); // west
    }
    return neighbors;
  }

  updateAction() {
    let possibleActions = this.checkAvailableActions();
    this.actionCycle = 48;
    let action = util.sample(possibleActions);
    this.direction = action[0];
    this.pos.col += action[1];
    this.pos.row += action[2];
  }
}

export default Octorok;