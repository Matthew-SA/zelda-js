class Sword {
  constructor(pos) {
    this.sprite = new Image();
    this.sprite.src = "./assets/images/player/attacks.png"
    this.swordSfx = new Audio("./assets/sfx/sword.wav");
    this.swordSfx.play()

    if (pos.direction === 96) { // up
      this.pos = {
        x: pos.x, y: pos.y - 36,
        hurtBoxX: pos.x + 18, hurtBoxY: pos.y - 36,
        width: 9, height: 48, direction: 96,
      }
    } else if (pos.direction === 144) { // right
      this.pos = {
        x: pos.x + 36, y: pos.y,
        hurtBoxX: pos.x + 36, hurtBoxY: pos.y + 24,
        width: 48, height: 9, direction: 144
      }
    } else if (pos.direction === 0) { // down
      this.pos = {
        x: pos.x, y: pos.y + 36,
        hurtBoxX: pos.x + 21, hurtBoxY: pos.y + 36,
        width: 9, height: 48, direction: 0,
      }
    } else if (pos.direction === 48) { // left
      this.pos = {
        x: pos.x - 36, y: pos.y,
        hurtBoxX: pos.x - 36, hurtBoxY: pos.y + 24,
        width: 48, height: 9, direction: 48
      }
    }
  }

  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {}

  draw(ctx) {
    ctx.drawImage(
      this.sprite,
      this.pos.direction,
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
      //   this.pos.hurtBoxX,
      //   this.pos.hurtBoxY,
      //   this.pos.width,
      //   this.pos.height)
  }
}

export default Sword;