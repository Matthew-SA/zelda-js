import * as util from '../util/util'

class Octorok {
  constructor(pixelPos, grid) {
    this.sprite = new Image();
    this.sprite.src = "./assets/images/units/overworld-enemies.png"
    
    this.ouch = new Audio("./assets/sfx/hit-enemy.wav");

    this.grid = grid;
    
    // unit stats
    this.hp = 5;
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
    
    // frame data
    this.frameData ={
      run: 0,
      action: 48,
      direction: 0,
      frame: 0,
      invincibility: 0,
    }

    this.speed = util.random(1,3)
    //start action cycle
    this.updateAction();
  }
  
  takeDamage() {
    if (this.frameData.invincibility) return;
    this.hp -= 1;
    this.frameData.invincibility = 20;
    this.ouch.play();
  }

  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    console.log(this.frameData.invinciblity)
    if (this.frameData.invincibility) this.frameData.invincibility--
    if (this.frameData.action <= 0) this.updateAction();
    
    if (this.frameData.direction === 96) { // north
      this.pos.y -= 1 * this.speed
    } else if (this.frameData.direction === 144) { // east
      this.pos.x += 1 * this.speed
    } else if (this.frameData.direction === 0) { // south
      this.pos.y += 1 * this.speed
    } else if (this.frameData.direction === 48) { // west
      this.pos.x -= 1 * this.speed
    }
    this.frameData.run += 1 * this.speed;
    this.frameData.action -= 1 * this.speed;
  }
  
  draw(ctx) {
    if (this.frameData.run < 14) {
      this.frameData.frame = 0;
    } else {
      this.frameData.frame = 48;
    }
    if (this.frameData.run > 25) this.frameData.run = 0;
    if (this.attacking) this.frameData.frame = 153;
    ctx.drawImage(
      this.sprite,
      this.frameData.direction,
      this.frameData.frame,
      48,
      48,
      this.pos.x,
      this.pos.y,
      48,
      48
      )
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
    this.frameData.action = 48;
    let action = util.sample(possibleActions);
    this.frameData.direction = action[0];
    this.pos.col += action[1];
    this.pos.row += action[2];
  }
}

export default Octorok;