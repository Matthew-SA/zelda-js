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

    this.frames = {
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
    if (this.frames.run > 15) this.frames.run = 0;
    if (this.frames.cooldown) this.frames.cooldown--
    if (this.frames.knockback) this.frames.knockback--
    if (this.frames.invincibility) this.frames.invincibility--
    this.frames.attack ? this.frames.attack-- : this.attacks.splice(0,1)
  }

  draw(ctx) {
    if (this.frames.attack) {
      ctx.drawImage(
        this.sprite,
        this.frames.invincibility ? this.pos.direction + 240 : this.pos.direction,
        this.frames.invincibility ? 288 + (48 * (this.frames.invincibility % 3)) : 96, // attack sprite pose
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
        this.frames.invincibility ? this.pos.direction + 240 : this.pos.direction,
        this.frames.invincibility ? this.frames.run < 9 ? 0 + (48 * (this.frames.invincibility % 3)) : 144 + (48 * (this.frames.invincibility % 3)) : this.frames.run < 9 ? 0 : 48,
        48,
        48,
        this.pos.x,
        this.pos.y,
        48,
        48
      )
    }
  }

  setDirection(direction) {
    switch (direction) {
      case 'up':
        this.pos.direction = 96
        break;
      case 'right':
        this.pos.direction = 144
        break;
      case 'down':
        this.pos.direction = 0
        break;
      case 'left':
        this.pos.direction = 48
        break;
    }
  }
          
  move(x, y, direction) {
    if (this.frames.cooldown) return;
    this.frames.run++
    this.setDirection(direction)
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
    if (!this.frames.invincibility) {
      Object.assign(this.frames, {invincibility: 45, knockback: 8})
      this.ouch.play()
      this.hp--
      this.attacks.pop()
    }
  }

  attack() {
    if (this.frames.cooldown || this.frames.knockback) return;
    this.frames.cooldown = 18;
    this.frames.attack = 15;
    this.attacks.push(new Sword(this.pos))
  }
}

export default Player;