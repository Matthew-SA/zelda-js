import key from 'keymaster'
import Menu from './menu/menu.js'
import Player from './player/player'
import Spawn from './units/spawn'
import Spark from './units/spark'
import Octorok from './units/octorok'
import Overworld from './maps/overworld'
import * as constants from './util/constants'
import * as util from './util/util'

// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles
// TODO: remove keymaster dependancy!

class Game {
  constructor() {
    this.menu = new Menu;
    this.player = new Player;
    this.overworld = new Overworld;

    // game sounds
    this.unitDeath = new Audio("./assets/sfx/destroy-enemy.wav");

    // game scroll logic
    this.scrolling = false;
    this.scrollQueue = 0;

    // npc placement
    this.units = [];
    this.grid = null; // collection of grid squares with color data of center 4 pixels.
    this.openSpaces = null; // Array of subarrays.  Each contain a x/y pixel position pair.
    this.enemyCount = 0;

    this.lastInput = { 'a': null, 'w': null, 'd': null, 's': null };
    this.currentInput = null;

  }
  
  clearUnits(ctx) {
    this.units.forEach(unit => unit.clear(ctx))
  }

  clearAttacks(ctx) {
    this.player.attacks.forEach(attack => attack.clear(ctx))
  }

  stepUnits(collisionCtx) {
    if (this.currentInput) this.player.frameData.run++;
    if (this.player.frameData.knockback) {
      this.getKnockedBackFrom(this.player.pos.direction, collisionCtx)
    }
    for (let i = 0; i < this.units.length; i++) {
      if (this.units[i] instanceof Spawn && this.units[i].runCycle <= 0) {
        this.units[i] = new Octorok(this.units[i].pixelPos, this.grid);
      }
      this.units[i].step();
      this.checkCollisionsAgainstPlayer(this.units[i])

      this.player.attacks.forEach(attack => {
        if (util.checkCollision(attack.hitBox, this.units[i].pos)) this.damageUnit(this.units[i])
      })

      if (this.units[i] instanceof Spark && this.units[i].runCycle > 16) {
        this.units.splice(this.units.indexOf(this.units[i]), 1)
      }
    }
  }

  stepAttacks() {
    for (let i = 0; i < this.player.attacks.length; i++) {
    }
  }

  checkCollisionsAgainstPlayer(other) {
    if (other instanceof Spawn || other instanceof Spark) return;
    if (util.checkCollision(this.player.hitbox, other.pos)) this.damagePlayer();
  }

  damageUnit(unit, damage) {
    unit.takeDamage(damage);
    if (unit.hp <= 0) this.killUnit(unit)
  }

  damagePlayer(damage) {
    this.player.takeDamage()
  }

  killUnit(unit) {
    this.unitDeath.play();
    this.units.splice(this.units.indexOf(unit), 1)
    this.units.push(new Spark(unit.pos))
  }

  getKnockedBackFrom(direction, ctx) {
    if (!this.player.frameData.knockback) return;
    if (direction === 96 && this.player.pos.y < 634 && !this.impassableTerrain(0,ctx)) {
      this.player.move(0, 12)
    } else if (direction === 144 && this.player.pos.x > 14 && !this.impassableTerrain(48, ctx)) {
      this.player.move(-12, 0)
    } else if (direction === 0 && this.player.pos.y > 188 && !this.impassableTerrain(96, ctx)) {
      this.player.move(0, -12)
    } else if (direction === 48 && this.player.pos.x < 706 && !this.impassableTerrain(144, ctx)) {
      this.player.move(12, 0)
    }
  }

  drawUnits(ctx) {
    this.units.forEach(unit => unit.draw(ctx))
  }

  drawAttacks(ctx) {
    this.player.attacks.forEach(attack => attack.draw(ctx))
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
        if (this.scrollQueue > 48) this.player.move(0, 8)
      }
      if (this.player.pos.direction === 144) {
        this.overworld.pos[0] += 8;
        if (this.scrollQueue > 48) this.player.move(-8, 0)
      }
      if (this.player.pos.direction === 0) {
        this.overworld.pos[1] += 8;
        if (this.scrollQueue > 48) this.player.move(0, -8)
      }
      if (this.player.pos.direction === 48) {
        this.overworld.pos[0] -= 8;
        if (this.scrollQueue > 48) this.player.move(8, 0)
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
    // this.enemyCount = (util.random(1, 6)) // reload enemy count for next screen.
    this.enemyCount = 1// stress test!
  }

  // collision layer check below
  checkIfBarrier(pixel1, pixel2) {
    let pixel1value = util.sumArr(pixel1)
    let pixel2value = util.sumArr(pixel2)
    if (pixel1value === constants.WALL || pixel1value === constants.WATER) return true;
    if (pixel2value === constants.WALL || pixel2value === constants.WATER) return true;
    return false;
  }

  impassableTerrain(direction, ctx) {
    if (direction === 96) {
      const topPixel = util.getMapPixel(
        ctx,
        this.player.tracebox.topLeft[0],
        this.player.tracebox.topLeft[1] - 3)
      const bottomPixel = util.getMapPixel(
        ctx,
        this.player.tracebox.topRight[0],
        this.player.tracebox.topRight[1] - 3)
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 144) {
      const topPixel = util.getMapPixel(
        ctx,
        this.player.tracebox.topRight[0] + 3,
        this.player.tracebox.topRight[1])
      const bottomPixel = util.getMapPixel(
        ctx,
        this.player.tracebox.bottomRight[0] + 3,
        this.player.tracebox.bottomRight[1])
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 0) {
      const topPixel = util.getMapPixel(
        ctx,
        this.player.tracebox.bottomLeft[0],
        this.player.tracebox.bottomLeft[1] + 3)
      const bottomPixel = util.getMapPixel(
        ctx,
        this.player.tracebox.bottomRight[0],
        this.player.tracebox.bottomRight[1] + 3)
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 48) {
      const topPixel = util.getMapPixel(
        ctx,
        this.player.tracebox.topLeft[0] - 3,
        this.player.tracebox.topRight[1])
      const bottomPixel = util.getMapPixel(
        ctx,
        this.player.tracebox.bottomLeft[0] - 3,
        this.player.tracebox.bottomLeft[1])
      return this.checkIfBarrier(topPixel, bottomPixel)
    }
  }

  // player input below
  getLastInput() {
    if (key.isPressed('w') && this.lastInput.w === null) {
      this.lastInput.w = Date.now();
    } else if (!key.isPressed('w') && this.lastInput.w !== null) {
      this.lastInput.w = null;
    }

    if (key.isPressed('d') && this.lastInput.d === null) {
      this.lastInput.d = Date.now();
    } else if (!key.isPressed('d') && this.lastInput.d !== null) {
      this.lastInput.d = null;
    }

    if (key.isPressed('s') && this.lastInput.s === null) {
      this.lastInput.s = Date.now();
    } else if (!key.isPressed('s') && this.lastInput.s !== null) {
      this.lastInput.s = null;
    }

    if (key.isPressed('a') && this.lastInput.a === null) {
      this.lastInput.a = Date.now();
    } else if (!key.isPressed('a') && this.lastInput.a !== null) {
      this.lastInput.a = null;
    }
  }

  checkKey(ctx) {
    if (this.scrolling) return;
    if (this.player.frameData.cooldown) return;

    const entry = Object.entries(this.lastInput).reduce((accum, entry) => (entry[1] > accum[1] ? entry : accum), ['', null])
    this.currentInput = entry[0]
    if (key.isPressed('/')) {
      this.player.attack();
      this.currentInput = 'attack';
    }
    if ((this.currentInput === 'w')) {
      this.player.pos.direction = 96 // 'up'
      return this.impassableTerrain(96,ctx) ? null : this.player.move(0, -4)
    }
    if ((this.currentInput === 'd')) {
      this.player.pos.direction = 144 // 'right'
      return this.impassableTerrain(144, ctx) ? null : this.player.move(4, 0)
    }
    if ((this.currentInput === 's')) {
      this.player.pos.direction = 0 // 'down'
      return this.impassableTerrain(0, ctx) ? null : this.player.move(0, 4)
    }
    if ((this.currentInput === 'a')) {
      this.player.pos.direction = 48 // 'left'
      return this.impassableTerrain(48, ctx) ? null : this.player.move(-4, 0)
    }
  }
}




export default Game;