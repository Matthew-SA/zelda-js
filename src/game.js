import Menu from './menu/menu.js'
import Player from './player/player'
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
    
    // game sounds
    this.hitEnemy = new Audio("./assets/sfx/hit-enemy.wav");
    this.destroyEnemy = new Audio("./assets/sfx/destroy-enemy.wav");

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
      if (this.units[i] instanceof Spawn && this.units[i].runCycle <= 0) {
        this.units[i] = new Octorok(this.units[i].pixelPos, this.grid);
      }
      this.units[i].step();
      this.checkCollisionsAgainstPlayer(this.units[i])
      this.checkCollisionAgainstOther(this.units[i])
    }
  }

  drawUnits(ctx) {
    for (let i = 0; i < this.units.length; i++ ) {
      this.units[i].draw(ctx)
    }
    this.player.draw(ctx);
  }

  checkCollisionsAgainstPlayer(other) {
    const playerHitbox = {
      x: this.player.pos.x + 2,
      y: this.player.pos.y + 2,
      width: 44,
      height: 44,
    }
    if (playerHitbox.x < other.pos.x + other.pos.width &&
      playerHitbox.x + playerHitbox.width > other.pos.x &&
      playerHitbox.y < other.pos.y + other.pos.height &&
      playerHitbox.y + playerHitbox.height > other.pos.y) {
      console.log('ouch!')
    }
  }

  checkCollisionAgainstOther(other) {
    if (!this.player.swordHitBox) return
    if (this.player.swordHitBox.x < other.pos.x + other.pos.width &&
      this.player.swordHitBox.x + this.player.swordHitBox.width > other.pos.x &&
      this.player.swordHitBox.y < other.pos.y + other.pos.height &&
      this.player.swordHitBox.y + this.player.swordHitBox.height > other.pos.y) {
      this.damageUnit(other);
    }
  }

  damageUnit(unit) {
    if (unit.invincibilityFrames) return;
    unit.hp -= 1
    if (unit.hp) {
      this.hitEnemy.play();
    } else {
      this.destroyEnemy.play();
      this.units.splice(this.units.indexOf(unit), 1)
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

  setSpawns() {
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
      this.setSpawns();
    } else {
      if (this.player.pos.direction === 96) {
        this.overworld.pos[1] -= 8;
        if (this.scrollQueue > 48) this.player.step(0, 8)
      }
      if (this.player.pos.direction === 144) {
        this.overworld.pos[0] += 8;
        if (this.scrollQueue > 48) this.player.step(-8, 0)
      }
      if (this.player.pos.direction === 0) {
        this.overworld.pos[1] += 8;
        if (this.scrollQueue > 48) this.player.step(0, -8)
      }
      if (this.player.pos.direction === 48) {
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
    // this.enemyCount = 100 // stress test!
  }
}


export default Game;