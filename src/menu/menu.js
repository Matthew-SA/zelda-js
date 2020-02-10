class Menu {
  constructor() {
    this.lastpos = [0,0]
    this.pos = [0,0]
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
      this.pos[0],
      this.pos[1],
      768,
      696
    )
  }
}

export default Menu;