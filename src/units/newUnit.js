class NewUnit {
  constructor() {
    this.pos = {
      x: pos.x,
      y: pos.y,
      row: ((pos.y - 168) / 48),
      col: (pos.x / 48),
      direction: pos.direction,
      width: 48,
      height: 48
    }

    this.frames = {
      run: 0,
      attack: 0,
      cooldown: 0,
      invincibility: 0,
      knockback: 0,
    }
  }

  clear() {
    this.ctx.clearRect(this.pos.x, this.pos.y, 48, 48);
  }

}

export default NewUnit