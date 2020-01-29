class Menu {
  constructor() {
    this.lastpos = [0,0]
    this.pos = [0,0]
    this.image = new Image();
    this.image.src = "../images/menu.png"
  }

  drawMenu(ctx) {
    ctx.drawImage(
      this.image,
      0,
      504,
      768,
      672,
      this.pos[0],
      this.pos[1],
      768,
      672
    )
  }
}

export default Menu;