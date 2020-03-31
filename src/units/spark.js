class Spark {
  constructor(pos, ctx) {
    this.ctx = ctx
    this.sprite = new Image();
    this.sprite.src = "./assets/images/effects.png"

    this.pos = {
      x: pos.x,
      y: pos.y,
      width: 48,
      height: 48,
    }

    this.frameData = {
      run: 0,
      invincibility: 100,
    }
  }

  takeDamage() {}

  clear() {
    this.ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

  step() {
    this.frameData.run++
  }

  draw() {
    this.ctx.drawImage(
      this.sprite,
      96 + (48 * Math.floor(this.frameData.run / 2)),
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