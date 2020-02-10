import Sword from './sword.js'

class Player {
  constructor() {
    this.sprite = new Image();
    this.sprite.src = "./assets/images/player/link.png"
    this.swordSound = new Audio("./assets/sfx/sword.wav");

    this.lastPos = { x: 336, y: 432, width: 48, height: 48, direction: 0, }
    this.pos = { x: 336, y: 432, width: 48, height: 48, direction: 0, }
    this.tracebox = {
      topLeft: [this.pos.x + 9, this.pos.y + 24],
      topRight: [this.pos.x + 39, this.pos.y + 24],
      bottomLeft: [this.pos.x + 9, this.pos.y + 45],
      bottomRight: [this.pos.x + 39, this.pos.y + 45],
    }

    this.runCycle = 0;
    this.frame = 0;

    this.attackFrame = 0;
    this.cooldown = 0;
    this.attacks = [];
  }

  clear(ctx) {
    ctx.clearRect(this.lastPos.x, this.lastPos.y, 48, 48);
  }

  step() {
    if (this.runCycle > 15) this.runCycle = 0;
    if (this.cooldown) this.cooldown--
    this.attackFrame ? this.attackFrame-- : this.attacks.splice(0,1)
    this.lastPos.x = this.pos.x;
    this.lastPos.y = this.pos.y;
  }

  draw(ctx) {
    if (this.attackFrame) {
      ctx.drawImage(
        this.sprite,
        this.pos.direction,
        96, // attack sprite pose
        48,
        48,
        this.pos.x,
        this.pos.y,
        48,
        48
      )
    } else {
      ctx.drawImage(
        this.sprite,
        this.pos.direction,
        this.runCycle < 9 ? 0 : 48,
        48,
        48,
        this.pos.x,
        this.pos.y,
        48,
        48
      )
    }
  }

  attack() {
    this.attackFrame = 15;
    this.cooldown = 18;
    this.attacks.push(new Sword(this.pos))
  }
  
  move(x,y) {
    // this.lastPos[0] = this.pos[0];
    // this.lastPos[1] = this.pos[1];
    this.pos.x += x;
    this.pos.y += y;
    this.tracebox.topLeft[0] += x, this.tracebox.topLeft[1] += y
    this.tracebox.topRight[0] += x, this.tracebox.topRight[1] += y
    this.tracebox.bottomLeft[0] += x, this.tracebox.bottomLeft[1] += y
    this.tracebox.bottomRight[0] += x, this.tracebox.bottomRight[1] += y
  }
}

export default Player;