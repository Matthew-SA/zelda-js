import Menu from './menu.js'
import Player from './player'
import Spawn from './units/spawn'
import Octorok from './units/octorok'
import Overworld from './maps/overworld'
import * as constants from './util/constants'
import * as util from './util/util'

// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles

class Game {
  constructor() {
    this.menu = new Menu;
    this.player = new Player;
    this.overworld = new Overworld;
    
    // game scroll logic
    this.scrolling = false;
    this.scrollQueue = 0;

    // npc placement
    this.units = [];
    this.grid = null; // collection of grid squares with color data of center 4 pixels.
    this.openSpaces = null; // Array of subarrays.  Each contain a x/y pixel position pair.
    this.enemyCount = 0;

  }
  
  clearUnits(ctx) {
    for (let i = 0; i < this.units.length; i++) {
      this.units[i].clear(ctx);
    }
    this.player.clear(ctx);
  }

  stepUnits(ctx) {
    for (let i = 0; i < this.units.length; i++) {
      this.units[i].runCycle++
      this.checkCollisions(this.units[i])
      if (this.units[i] instanceof Spawn && this.units[i].runCycle >= 160) {
        this.units[i].clear(ctx)
        this.units[i] = new Octorok(this.units[i].pixelPos, this.grid);
      }
      this.units[i].step();
    }
  }

  drawUnits(ctx) {
    for (let i = 0; i < this.units.length; i++ ) {
      this.units[i].draw(ctx)
    }
    this.player.draw(ctx);
  }

  checkCollisions(other) {
    const playerHitbox = {
      x: this.player.pos.x + 2,
      y: this.player.pos.y + 2,
      width: 44,
      height: 44,
    }
    // console.log(playerHitbox)
    console.log
    if (playerHitbox.x < other.pos.x + other.pos.width &&
      playerHitbox.x + playerHitbox.width > other.pos.x &&
      playerHitbox.y < other.pos.y + other.pos.height &&
      playerHitbox.y + playerHitbox.height > other.pos.y) {
      console.log('collision detected!')
    }
  }

  scanGrid(ctx) {
    let newGrid = [];
    let openSpaces = [];
    for (let y = 168; y < 696; y += 48) {
      let row = [];
      for (let x = 0; x < 768; x += 48) {
        let value = util.scanMapTile(ctx, x, y);
        row.push(value);
        if (value === 1020) openSpaces.push([x, y]);
      }
      newGrid.push(row);
    }
    this.openSpaces = openSpaces;
    this.grid = newGrid;
  }

  spawnUnits() {
    for (let i = 0; i < this.enemyCount; i++) {
      let pixelPos = this.openSpaces[Math.floor(Math.random() * this.openSpaces.length)];
      this.units.push(new Spawn(pixelPos));
    }
  }
  

  hatchSpawn(spawn) {
    new Octorok(spawn.pixelPos[0], spawn.pixelPos[1])
  }
  

  // Scrolling logic below
  scroll(worldCtx, collisionCtx) {
    if (!this.scrolling) return;
    if (this.scrollQueue <= 0) {
      this.scrolling = false;
      this.overworld.drawCollisionMap(collisionCtx)
      this.scanGrid(collisionCtx);
      this.spawnUnits();
    } else {
      if (this.player.direction === 102) {
        this.overworld.pos[1] -= 8;
        if (this.scrollQueue > 48) this.player.step(0, 8)
      }
      if (this.player.direction === 153) {
        this.overworld.pos[0] += 8;
        if (this.scrollQueue > 48) this.player.step(-8, 0)
      }
      if (this.player.direction === 0) {
        this.overworld.pos[1] += 8;
        if (this.scrollQueue > 48) this.player.step(0, -8)
      }
      if (this.player.direction === 51) {
        this.overworld.pos[0] -= 8;
        if (this.scrollQueue > 48) this.player.step(8, 0)
      }
      this.scrollQueue -= 8;
      this.overworld.drawWorld(worldCtx)
    }
  }

  checkBorder(ctx) {
    if (this.player.pos.y < constants.BORDERTOP || this.player.pos.y > constants.BORDERBOTTOM) {
      this.scrolling = true;
      this.destroyUnits(ctx)
      this.scrollQueue = 528;
    }
    if (this.player.pos.x > constants.BORDERRIGHT || this.player.pos.x < constants.BORDERLEFT) {
      this.scrolling = true;
      this.destroyUnits(ctx)
      this.scrollQueue = 768;
    }
  }

  destroyUnits(ctx) {
    this.clearUnits(ctx);
    this.units = [];
    this.enemyCount = (util.random(1, 6)) // reload enemy count for next screen.
  }
}


export default Game;