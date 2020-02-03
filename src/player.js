class Player {
  constructor() {
    this.lastPos = [336, 432];
    this.pos = [336, 432];
    this.sprite = new Image();
    this.sprite.src = "../assets/images/link.png"
    this.runCycle = 0;
    this.direction = 0
    this.frame = 0;
    this.attackFrame = 0;
    this.cooldown = 0;
    this.tracebox = {
      topLeft: [this.pos[0] + 9, this.pos[1] + 24],
      topRight: [this.pos[0] + 39, this.pos[1] + 24],
      bottomLeft: [this.pos[0] + 9, this.pos[1] + 45],
      bottomRight: [this.pos[0] + 39, this.pos[1] + 45],
    }
    this.swordX
    this.swordY
  }

  update(x,y) {
    // this.lastPos[0] = this.pos[0];
    // this.lastPos[1] = this.pos[1];
    this.pos[0] += x;
    this.pos[1] += y;
    this.tracebox.topLeft[0] += x, this.tracebox.topLeft[1] += y
    this.tracebox.topRight[0] += x, this.tracebox.topRight[1] += y
    this.tracebox.bottomLeft[0] += x, this.tracebox.bottomLeft[1] += y
    this.tracebox.bottomRight[0] += x, this.tracebox.bottomRight[1] += y
  }

  draw(ctx) {
    if (this.cooldown) this.cooldown--
    if (this.runCycle < 9) {
      this.frame = 0;
    } else {
      this.frame = 51;
    }
    if (this.runCycle > 15) this.runCycle = 0;
    if (this.attackFrame) {
      ctx.drawImage(
        this.sprite,
        this.direction,
        153,
        48,
        48,
        this.pos[0],
        this.pos[1],
        48,
        48
      )
      this.swordX = this.pos[0]
      this.swordY = this.pos[1]
      if (this.direction === 0) {
        this.swordY += 48;
      } else if (this.direction === 51) {
        this.swordX -= 48;
      } else if (this.direction === 102) {
       this.swordY -= 48
      } else if (this.direction === 153) {
        this.swordX += 48;
      }
      ctx.drawImage(
        this.sprite,
        this.direction,
        204,
        48,
        48,
        this.swordX,
        this.swordY,
        48,
        48
      )
      this.attackFrame--
    } else {
      ctx.drawImage(
        this.sprite,
        this.direction,
        this.frame,
        48,
        48,
        this.pos[0],
        this.pos[1],
        48,
        48
      )
    }
    this.lastPos[0] = this.pos[0];
    this.lastPos[1] = this.pos[1];
  }

  clear(ctx) {
    ctx.clearRect(this.lastPos[0], this.lastPos[1], 48, 48);
    if (this.cooldown) ctx.clearRect(this.swordX, this.swordY, 48, 48);
  }
}

export default Player;