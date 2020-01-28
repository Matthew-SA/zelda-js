class Player {
  constructor() {
    this.pos = [0,0]
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.fillStyle = "green"
    ctx.fillRect(this.pos[0], this.pos[1], 50, 50)
  }
}

export default Player;