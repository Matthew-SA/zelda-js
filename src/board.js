// Hud height is scaled up: 168
// map screens are 768 x 528 (256 x 176)
// world is a 16 x 8 grid

class Board {
  constructor(worldCtx, collisionCtx) {
    this.worldCtx = worldCtx
    this.collisionCtx = collisionCtx
    this.overworld = new Image();
    this.overworld.src = './assets/images/maps/overworld.png'
    this.collisionMap = new Image();
    this.collisionMap.src = './assets/images/maps/overworld-collision.png'
    
    // this.music = new Audio("./assets/sfx/overworld.mp3");
    // this.music.autoplay();
    // this.music.loop = true;
    // this.music.play();
    
    this.pos = { x: 5376, y: 3528 }
  }

  setLocation(playerPos, worldPos, map, collisionMap) {

  }

  scroll(direction) {

  }


  getMapPos() {
    return { x: this.pos.x / 768, y: (this.pos.y + 168) / 528}
  }

  render() {
    this.drawWorld();
    this.drawCollisionMap();
  }

  drawWorld() {
    this.worldCtx.drawImage(
      this.overworld,
      this.pos.x, // x axis anchor point
      this.pos.y, // y axis anchor point
      768,
      696,
      0,
      0,
      768,
      696
    )
  }

  drawCollisionMap() {
    this.collisionCtx.drawImage(
      this.collisionMap,
      this.pos.x, // x axis anchor point
      this.pos.y, // y axis anchor point
      768,
      696,
      0,
      0,
      768,
      696
    )
  }
}

export default Board;

