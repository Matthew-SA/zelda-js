class Sword {
  constructor(pos, ctx) {
    this.ctx = ctx
    this.sprite = new Image();
    this.sprite.src = "./assets/images/player/attacks.png"
    this.swordSfx = new Audio("./assets/sfx/sword.wav");
    this.swordSfx.play()

    this.direction = pos.direction

    if (this.direction === 96) { // up
      this.pos = { x: pos.x, y: pos.y - 36 }
      this.hitBox = { x: pos.x + 18, y: pos.y - 36, width: 9, height: 48}
    } else if (this.direction === 144) { // right
      this.pos = { x: pos.x + 36, y: pos.y }
      this.hitBox = { x: pos.x + 36, y: pos.y + 24, width: 48, height: 9 }
    } else if (this.direction === 0) { // down
      this.pos = { x: pos.x, y: pos.y + 36 }
      this.hitBox = { x: pos.x + 21, y: pos.y + 36, width: 9, height: 48 }
    } else if (this.direction === 48) { // left
      this.pos = { x: pos.x - 36, y: pos.y }
      this.hitBox = { x: pos.x - 36, y: pos.y + 24, width: 48, height: 9 }
    }
  }

  clear() {
    this.ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {}

  draw() {
    this.ctx.drawImage(
      this.sprite,
      this.direction,
      0,
      48,
      48,
      this.pos.x,
      this.pos.y,
      48,
      48,
      )

      // hurtbox debugger //
      // ctx.fillStyle = 'red';
      // ctx.fillRect(
      //   this.hitBox.x,
      //   this.hitBox.y,
      //   this.hitBox.width,
      //   this.hitBox.height)
  }
}

export default Sword;