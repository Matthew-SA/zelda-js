import Octorok from "./units/octorok";

// Hud height is scaled up: 168
// map screens are 768 x 528 (256 x 176)
// world is a 16 x 8 grid

class Overworld {
  constructor() {
    this.lastPos = [5376, 3528];
    this.pos = [5376,3528];
    this.overworld = new Image();
    this.overworld.src = '../assets/images/overworld.png'
    this.collisionMap = new Image();
    this.collisionMap.src = '../assets/images/overworld-collision.png'
  }

  drawWorld(ctx) {
    ctx.drawImage(
      this.overworld,
      this.pos[0], // x axis anchor point
      this.pos[1], // y axis anchor point
      768,
      696,
      0,
      0,
      768,
      696
    )
  }

  drawCollisionMap(ctx) {
    ctx.drawImage(
      this.collisionMap,
      this.pos[0], // x axis anchor point
      this.pos[1], // y axis anchor point
      768,
      696,
      0,
      0,
      768,
      696
    )
  }
}

export default Overworld;
