import * as util from '../util/util'

class Octorok {
  constructor(pixelPos, grid) {
    this.sprite = new Image();
    this.sprite.src = "./assets/images/units/octorok.png"
    
    this.grid = grid;
    
    // unit stats
    this.hp = 1;
    this.ap = 1;

    //position data
    this.lastPixelPos = pixelPos;
    this.pixelPos = pixelPos;
    this.pos = [
      (this.pixelPos[0] / 48), 
      ((this.pixelPos[1] - 168) / 48)
    ];
    
    // frame data
    this.runCycle = 0;
    this.actionCycle = 48;
    this.direction = 0;
    this.frame = 0;
    this.speed = util.random(1,3)
    
    //start action cycle
    this.updateAction();
  }
  
  clear(ctx) {
    ctx.clearRect(this.lastPixelPos[0], this.lastPixelPos[1], 48, 48);
  }

  step() {
    this.lastPixelPos = this.pixelPos;

    if (this.actionCycle <= 0) this.updateAction();

    if (this.direction === 102) { // north
      this.pixelPos[1] -= 1 * this.speed
    } else if (this.direction === 153) { // east
      this.pixelPos[0] += 1 * this.speed
    } else if (this.direction === 0) { // south
      this.pixelPos[1] += 1 * this.speed
    } else if (this.direction === 51) { // west
      this.pixelPos[0] -= 1 * this.speed
    }
    this.actionCycle -= 1 * this.speed
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
      this.pixelPos[0],
      this.pixelPos[1],
      48,
      48
      )
    }

  checkAvailableActions() {
    let neighbors = [];
    if (this.pos[1] > 0 && this.grid[this.pos[1] - 1][this.pos[0]] === 1020) {
      neighbors.push([102, 0, -1]); // north
    }
    if (this.grid[this.pos[1]][this.pos[0] + 1] === 1020) {
      neighbors.push([153, 1, 0]); // east
    }
    if (this.pos[1] < 10 && this.grid[this.pos[1] + 1][this.pos[0]] === 1020) {
      neighbors.push([0, 0, 1]); // south
    }
    if (this.grid[this.pos[1]][this.pos[0] - 1] === 1020) {
      neighbors.push([51, -1, 0]); // west
    }
    return neighbors;
  }

  updateAction() {
    let possibleActions = this.checkAvailableActions();
    this.actionCycle = 48;
    let action = util.sample(possibleActions);
    this.direction = action[0];
    this.pos[0] += action[1];
    this.pos[1] += action[2];
  }
}

export default Octorok;