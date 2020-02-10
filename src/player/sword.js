class Sword {
  constructor(position, direction) {
    this.sprite = new Image();
    this.sprite.src = "./assets/images/player/attacks.png"
    this.swordSfx = new Audio("./assets/sfx/sword.wav");
    this.swordSfx.play()

    if (direction === 96) {
      this.pos = {
        x: position.x, y: position.y - 48,
        width: 48, height: 48, direction: 96,
      }
    } else if (direction === 144) {
      this.pos = {
        x: position.x + 48, y: position.y,
        width: 48, height: 48, direction: 144
      }
    } else if (direction === 0) {
      this.pos = {
        x: position.x, y: position.y + 48,
        width: 48, height: 48, direction: 0,
      }
    } else if (direction === 48) {
      this.pos = {
        x: position.x - 48, y: position.y,
        width: 48, height: 48, direction: 48
      }
    }
  }


  draw(ctx) {
      ctx.drawImage(
        this.sprite,
        this.direction,
        204,
        48,
        48,
        this.pos.x,
        this.pos.y,
        48,
        48
      )
      this.attackFrame--
  }

  clear(ctx) {
    ctx.clearRect(this.lastPos.x, this.lastPos.y, 48, 48);
    if (this.cooldown) ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }
}

export default Sword;