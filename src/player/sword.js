class Sword {
  constructor(pos) {
    this.sprite = new Image();
    this.sprite.src = "./assets/images/player/attacks.png"
    this.swordSfx = new Audio("./assets/sfx/sword.wav");
    this.swordSfx.play()

    if (pos.direction === 96) { // up
      this.pos = { x: pos.x, y: pos.y - 36 }
      this.hitBox = { x: pos.x + 18, y: pos.y - 36, width: 9, height: 48}
      this.direction = 96;
    } else if (pos.direction === 144) { // right
      this.pos = { x: pos.x + 36, y: pos.y }
      this.hitBox = { x: pos.x + 36, y: pos.y + 24, width: 48, height: 9 }
      this.direction = 144;
    } else if (pos.direction === 0) { // down
      this.pos = { x: pos.x, y: pos.y + 36 }
      this.hitBox = { x: pos.x + 21, y: pos.y + 36, width: 9, height: 48 }
      this.direction = 0;
    } else if (pos.direction === 48) { // left
      this.pos = { x: pos.x - 36, y: pos.y }
      this.hitBox = { x: pos.x - 36, y: pos.y + 24, width: 48, height: 9 }
      this.direction = 48;
    }
  }

  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {}

  draw(ctx) {
    ctx.drawImage(
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