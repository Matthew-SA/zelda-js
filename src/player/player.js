import Sword from './sword.js'

class Player {
  constructor() {
    this.sprite = new Image();
    this.sprite.src = "./assets/images/player/link.png"
    this.ouch = new Audio("./assets/sfx/link-hurt.wav");

    this.pos = { x: 336, y: 432, width: 48, height: 48, direction: 0, }

    this.hitbox = { x: this.pos.x + 12, y: this.pos.y + 12, width: 24, height: 24 }

    this.tracebox = {
      topLeft: [this.pos.x + 9, this.pos.y + 24],
      topRight: [this.pos.x + 39, this.pos.y + 24],
      bottomLeft: [this.pos.x + 9, this.pos.y + 45],
      bottomRight: [this.pos.x + 39, this.pos.y + 45],
    }

    this.frameData = {
      run: 0,
      attack: 0,
      cooldown: 0,
      invincibility: 0,
      knockback: 0,
    }

    this.hp = 3;

    this.attacks = [];
  }
  
  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    if (this.frameData.run > 15) this.frameData.run = 0;
    if (this.frameData.cooldown) this.frameData.cooldown--
    if (this.frameData.knockback) this.frameData.knockback--
    if (this.frameData.invincibility) this.frameData.invincibility--
    this.frameData.attack ? this.frameData.attack-- : this.attacks.splice(0,1)
  }

  draw(ctx) {
    if (this.frameData.attack) {
      ctx.drawImage(
        this.sprite,
        this.frameData.invincibility ? this.pos.direction + 240 : this.pos.direction,
        this.frameData.invincibility ? 288 + (48 * (this.frameData.invincibility % 3)) : 96, // attack sprite pose
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
        this.frameData.invincibility ? this.pos.direction + 240 : this.pos.direction,
        this.frameData.invincibility ? this.frameData.run < 9 ? 0 + (48 * (this.frameData.invincibility % 3)) : 144 + (48 * (this.frameData.invincibility % 3)) : this.frameData.run < 9 ? 0 : 48,
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
    this.frameData.cooldown = 20;
    this.frameData.attack = 15;
    this.attacks.push(new Sword(this.pos))
  }
  
  move(x,y) {
    this.pos.x += x;
    this.pos.y += y;
    this.hitbox.x += x;
    this.hitbox.y += y;
    this.tracebox.topLeft[0] += x, this.tracebox.topLeft[1] += y
    this.tracebox.topRight[0] += x, this.tracebox.topRight[1] += y
    this.tracebox.bottomLeft[0] += x, this.tracebox.bottomLeft[1] += y
    this.tracebox.bottomRight[0] += x, this.tracebox.bottomRight[1] += y
  }

  takeDamage() {
    if (!this.frameData.invincibility) {
      // console.log(this.hp)
      this.frameData.invincibility = 45;
      this.ouch.play()
      this.frameData.cooldown = 8;
      this.frameData.knockback = 8;
      this.hp--
      this.attacks.pop()
    }
  }
}

export default Player;