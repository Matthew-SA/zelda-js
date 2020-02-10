class Sword {
  constructor(pos) {
    this.sprite = new Image();
    this.sprite.src = "./assets/images/player/attacks.png"
    this.swordSfx = new Audio("./assets/sfx/sword.wav");
    this.swordSfx.play()

    if (pos.direction === 96) {
      this.pos = {
        x: pos.x, y: pos.y - 36,
        width: 48, height: 48, direction: 96,
      }
    } else if (pos.direction === 144) {
      this.pos = {
        x: pos.x + 36, y: pos.y,
        width: 48, height: 48, direction: 144
      }
    } else if (pos.direction === 0) {
      this.pos = {
        x: pos.x, y: pos.y + 36,
        width: 48, height: 48, direction: 0,
      }
    } else if (pos.direction === 48) {
      this.pos = {
        x: pos.x - 36, y: pos.y,
        width: 48, height: 48, direction: 48
      }
    }
  }

  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
    if (this.cooldown) ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
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
        48
      )
      this.attackFrame--
  }

}

export default Sword;