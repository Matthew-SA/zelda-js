class Player {
  constructor() {
    this.lastPos = [0,0]
    this.pos = [0,0]
  }

  draw(ctx) {
    ctx.clearRect(this.lastPos[0], this.lastPos[1], 50, 50);
    ctx.beginPath()
    ctx.fillStyle = "green"
    ctx.fillRect(this.pos[0], this.pos[1], 50, 50)
    this.lastPos[0] = this.pos[0];
    this.lastPos[1] =this.pos[1];
  }
}

export default Player;