class World {
  constructor() {
    this.lastPos = [0,0];
    this.pos = [0,0];
    this.world = new Image();
    this.world.src = '../images/overworld.png'
  }

  drawWorld(ctx) {
    ctx.drawImage(
      this.world,
      5376, // x axis anchor point
      3528, // y axis anchor point
      768,
      672,
      0,
      0,
      768,
      672
    )
  }
}

// Hud height is scaled up: 168
// map screens are 768 x 528 (256 x 176)
// viewable screen is 768 x 504 (256 x 168)
// world is a 16 x 8 grid
// start is at 
export default World;
