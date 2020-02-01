class Player {
  constructor() {
    this.lastPos = [336, 432];
    this.pos = [336, 432];
    this.sprite = new Image();
    this.sprite.src = "../assets/images/link.png"
    this.runCycle = 0;
    this.direction = 0
    this.frame = 0;
    this.attacking = false;
    this.frozen = false;
    this.tracebox = {
      topLeft: [this.pos[0] + 6, this.pos[1] + 24],
      topRight: [this.pos[0] + 42, this.pos[1] + 24],
      bottomLeft: [this.pos[0] + 6, this.pos[1] + 45],
      bottomRight: [this.pos[0] + 42, this.pos[1] + 45],
    }
  }

  updateTraceBox(x,y) {
    this.tracebox.topLeft[0] += x, this.tracebox.topLeft[1] += y
    this.tracebox.topRight[0] += x, this.tracebox.topRight[1] += y
    this.tracebox.bottomLeft[0] += x, this.tracebox.bottomLeft[1] += y
    this.tracebox.bottomRight[0] += x, this.tracebox.bottomRight[1] += y
  }

  drawFrame(ctx) {
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

  drawDebugBox(ctx) {
    ctx.beginPath()
    ctx.fillRect(this.tracebox.topLeft[0], this.tracebox.topLeft[1], 48, 36)
    ctx.fillstyle = 'black'
    ctx.fill();
  }

  drawPlayer(ctx) {
    if (this.runCycle < 9) {
      this.frame = 0;
    } else {
      this.frame = 51;
    }
    if (this.runCycle > 15) this.runCycle = 0;
    if (this.attacking) {
      this.frame = 153; 
    }
    this.drawFrame(ctx)
    this.lastPos[0] = this.pos[0];
    this.lastPos[1] = this.pos[1];
  }

  clearPlayer(ctx) {
    ctx.beginPath();
    ctx.clearRect(this.lastPos[0], this.lastPos[1], 48, 48);
  }

  clearDebugBox(ctx) {
    ctx.beginPath();
    ctx.clearRect(this.lastPos[0] - 12 , this.lastPos[1] - 12, 60, 60);
  }
  

  drawSword(ctx) {
    this.attacking = true;
    let swordX = this.pos[0]
    let swordY = this.pos[1]
    if (this.direction === 0) {
      swordY += 48;
    } else if (this.direction === 51) {
      swordX -= 48;
    } else if (this.direction === 102) {
      swordY -= 48
    } else if (this.direction === 153) {
      swordX += 48;
    }
    ctx.drawImage(
      this.sprite,
      this.direction,
      204,
      48,
      48,
      swordX,
      swordY,
      48,
      48
    )
    setTimeout(() => {
      this.attacking = false;
      ctx.clearRect(swordX, swordY, 48, 48);
    },250)
  }

  freezePlayer(time) {
    this.frozen = true;
    setTimeout(() => {
      this.frozen = false;
    }, time)
  }
  
}

export default Player;