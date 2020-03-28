class Hud {
  constructor(ctx) {
    this.ctx = ctx;
    this.pos = { x: 0, y: 0 }
    this.image = new Image();
    this.image.src = "./assets/images/menu.png"
    this.heartSprite = new Image();
    this.heartSprite.src = "./assets/images/items/hearts.png"

    this.maxHearts = 3;
    this.money = 0;
    this.keys = 0;
    this.bombs = 0;
    this.slotA = null;
    this.slotB = null;
  }

  render() {
    this.ctx.drawImage(
      this.image,
      0,
      528,
      768,
      696,
      this.pos.x,
      this.pos.y,
      768,
      696
    )
    this.updateHearts(3)
    this.updateMiniMap({ x: 15, y: 7})
  }

  updateHearts(hp) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(528, 96, 192, 48)
    for (let i = 0; i < this.maxHearts; i++) {
      this.ctx.drawImage(
        this.heartSprite,
        i < hp ? 24 : 72,
        0,
        24,
        24,
        528 + (24 * i),
        96,
        24,
        24,
      )
    }
  }

  updateMiniMap(gridPos) {
    // header
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(48, 24, 192, 48)
    //  minimap
    this.ctx.fillStyle = 'grey'
    this.ctx.fillRect(48, 48, 192, 96)
    // player dot
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(51 + (gridPos.x * 12),48 + (gridPos.y * 12),9,9)
  }
}

export default Hud;