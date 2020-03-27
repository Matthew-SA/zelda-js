class Menu {
  constructor() {
    this.pos = { x: 0, y: 0 }
    this.image = new Image();
    this.image.src = "./assets/images/menu.png"
  }

  draw(ctx) {
    ctx.drawImage(
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
  }
}

export default Menu;