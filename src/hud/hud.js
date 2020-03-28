class Hud {
  constructor(ctx) {
    this.ctx = ctx;
    this.pos = { x: 0, y: 0 }
    this.image = new Image();
    this.image.src = "./assets/images/menu.png"
    this.heartSprite = new Image();
    this.heartSprite.src = "./assets/images/items/hearts.png"

    this.maxHearts = 3;
    this.hearts = 3;
    this.money = 0;
    this.keys = 0;
    this.bombs = 0;
    this.slotA = null;
    this.slotB = null;
  }

  draw() {
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
    this.updateHearts(this.hearts)
  }

  updateHearts(hp) {
    this.ctx.fillstyle = 'black'
    this.ctx.fillRect(528, 96, 192, 48)
    for (let i = 0; i < this.maxHearts; i++) {
      if (i < hp) {
        this.ctx.drawImage(
          this.heartSprite,
          24,
          0,
          24,
          24,
          528 + (24 * i),
          96,
          24,
          24,
        )
      } else {
        this.ctx.drawImage(
          this.heartSprite,
          72,
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
  }
}

export default Hud;