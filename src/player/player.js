import Sword from './sword.js'

class Player {
  constructor(spriteCtx) {
    this.ctx = spriteCtx;

    this.sprite = new Image();
    this.sprite.src = "./assets/images/player/link.png"
    this.ouch = new Audio("./assets/sfx/link-hurt.wav");

    // setInterval(() => {
    //   this.ouch.play()
    // }, 1);
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

    this.hp = 6.0;

    this.attacks = [];
  }

  reset() {
    this.hp = 6.0;
    this.attacks = [];
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
  }

  clear() {
    this.ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    if (this.frames.run <= 0) this.frames.run = 16;
    if (this.frames.cooldown) this.frames.cooldown--
    if (this.frames.knockback) this.frames.knockback--
    if (this.frames.invincibility) this.frames.invincibility--
    this.frames.attack ? this.frames.attack-- : this.attacks.splice(0, 1)
  }

  render() {
    if (this.hp <= 0) return;
    if (this.frames.attack && this.frames.invincibility) {
      this.drawImage(this.pos.direction + 240, 288 + (48 * (this.frames.invincibility % 3)));
    } else if (this.frames.attack && !this.frames.invincibility) {
      this.drawImage(this.pos.direction, 96);
    } else if (!this.frames.attack && this.frames.invincibility && this.frames.run < 9) {
      this.drawImage(this.pos.direction + 240, 0 + 48 * ((this.frames.invincibility % 3)));
    } else if (!this.frames.attack && this.frames.invincibility && this.frames.run >= 9) {
      this.drawImage(this.pos.direction + 240, 144);
    } else if (!this.frames.attack && !this.frames.invincibility && this.frames.run < 9) {
      this.drawImage(this.pos.direction, 0);
    } else if (!this.frames.attack && !this.frames.invincibility && this.frames.run >= 9) {
      this.drawImage(this.pos.direction, 48);
    }
  }

  drawImage(sourceX, sourceY) {
    this.ctx.drawImage(
      this.sprite,
      sourceX,
      sourceY,
      48,
      48,
      this.pos.x,
      this.pos.y,
      48,
      48
    )
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
    if (this.hp <= 0) return;
    if (this.frames.cooldown) return;
    this.frames.run--
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


  takeDamage(damage = 1) {
    if (this.hp <= 0) return;
    if (!this.frames.invincibility) {
      Object.assign(this.frames, { invincibility: 45, knockback: 8 })
      this.ouch.play()
      this.hp -= damage
      this.attacks.pop()
    }
  }

  attack() {
    if (this.hp <= 0) return;
    if (this.frames.cooldown || this.frames.knockback) return;
    this.frames.cooldown = 18;
    this.frames.attack = 15;
    this.attacks.push(new Sword(this.pos, this.ctx))
  }
}

export default Player;