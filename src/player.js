class Player {
  constructor() {
    this.lastPos = [0,0]
    this.pos = [0,0]
    this.sprite = new Image();
    this.sprite.src = "../images/link.png"
    this.runCycle = 0;
    this.direction = 0
    this.frame = 0;
    this.attacking = false;
    this.drawFrame = this.drawFrame.bind(this);
    this.that = this;
  }

  // draw(ctx, direction) {
  //   ctx.clearRect(this.lastPos[0], this.lastPos[1], 48, 48);
  //   ctx.beginPath()
  //   ctx.drawImage(this.sprite, direction, 0, 48, 48, this.pos[0], this.pos[1], 48, 48)
  //   this.lastPos[0] = this.pos[0];
  //   this.lastPos[1] = this.pos[1];
  // }

  drawFrame(ctx, direction, frame) {
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


  stepPlayer(ctx) {
    if (this.runCycle < 9) {
      this.frame = 0;
    } else {
      this.frame = 51;
    }
    if (this.runCycle > 16) this.runCycle = 0;
    if (this.attacking) {
      this.frame = 153; 
    }
    this.drawFrame(ctx, this.direction, this.frame)
    this.lastPos[0] = this.pos[0];
    this.lastPos[1] = this.pos[1];
  }

  clearPlayer(ctx) {
    ctx.beginPath();
    ctx.clearRect(this.lastPos[0], this.lastPos[1], 48, 48);
  }

  attack(ctx) {
    this.attacking = true;
    setTimeout((ctx) => {
      this.attacking = false;
    },250)
  }
}

export default Player;