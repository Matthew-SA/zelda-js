class Spark {
  constructor(pos) {
    this.sprite = new Image();
    this.sprite.src = "./assets/images/effects.png"

    this.pos = {
      x: pos.x,
      y: pos.y,
      width: 48,
      height: 48,
    }

    this.runCycle = 0;
    this.invincibilityFrames = 100;
  }

  clear(ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    this.runCycle++
  }

  draw(ctx) {
    ctx.drawImage(
      this.sprite,
      96 + (48 * Math.floor(this.runCycle / 2)),
      0,
      48,
      48,
      this.pos.x,
      this.pos.y,
      48,
      48
    )
  }
}

export default Spark;