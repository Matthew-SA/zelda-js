import Input from './util/input'
import Hud from './hud/hud.js'
import Player from './player/player'
import Spawn from './units/spawn'
import Spark from './units/spark'
import Octorok from './units/octorok'
import Board from './board'
import * as constants from './util/constants'
import * as Util from './util/util'

// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles
// TODO: remove keymaster dependancy!

class Game {
  constructor(hudCtx, spriteCtx, boardCtx, collisionCtx) {
    this.hud = new Hud(hudCtx);
    this.player = new Player(spriteCtx);
    this.board = new Board(boardCtx, collisionCtx);
    this.spriteCtx = spriteCtx;
    this.collisionCtx = collisionCtx;

    this.startmusic = new Audio("./assets/sfx/overworldstart.ogg")
    this.startmusic.volume = 0.2
    this.music = new Audio("./assets/sfx/overworld.ogg");
    this.music.volume = 0.2;
    // this.music.autoplay();
    // this.music.loop = true;
    // this.music.play();

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

    this.input = new Input;

    this.muted = false;
    this.live = false;
    document.addEventListener('keydown', e => {
      if (e.keyCode === 13 && !this.live) {
        this.live = true;
        this.hud.clearStartPage();
        this.startmusic.play();
        setTimeout(() => {
          this.music.play();
          this.music.loop = true;
        }, 6410);
        // this.music.play();
        // this.music.loop = true;
      }
      if (this.player.hp <= 0 && e.keyCode === 13) {
        this.destroyUnits();
        this.player.reset();
        this.board.pos = { x: 5376, y: 3528 }
        this.board.render();
        this.hud.render()
        this.player.render();
        this.hud.clearStartPage();
        this.hud.death = false;
        this.startmusic.play();
        setTimeout(() => {
          this.music.play();
          this.music.loop = true;
        }, 6410);
      }
      if (e.keyCode === 77) {
        if (this.muted) {
          this.startmusic.volume = .2
          this.music.volume = .2
          this.muted = false;
        } else {
          this.startmusic.volume = 0
          this.music.volume = 0
          this.muted = true;
        }
      }
    });
  }
  
  init() {
    this.board.render();
    this.hud.render()
    this.player.render();
    this.hud.renderStartPage();
    requestAnimationFrame(() => this.gameLoop())
  }

  gameLoop() {
    // let now = Date.now();
    // let dt = (now - lastTime) / 1000.0;
    this.clear()
    this.step(this.collisionCtx);
    this.draw()
    requestAnimationFrame(() => this.gameLoop())
  }

  clear() {
    this.clearUnits();
    this.clearAttacks();
    this.player.clear();
  }

  step(collisionCtx) {
    this.checkBorder();
    this.scroll(collisionCtx);
    this.processInput(collisionCtx);
    this.stepUnits(collisionCtx);
    this.player.step();
  }

  draw() {
    if (this.player.hp <= 0) {
      this.hud.renderDeathPage();
      this.music.pause();
      this.music.currentTime = 0;
    }
    this.drawUnits();
    this.drawAttacks();
    this.player.render();
  }

  clearUnits() {
    this.units.forEach(unit => unit.clear())
  }

  clearAttacks() {
    this.player.attacks.forEach(attack => attack.clear())
  }

  stepUnits(collisionCtx) {
    if (this.player.frames.knockback) this.knockBackPlayer(collisionCtx)

    this.units.forEach((unit, i) => {
      if (unit instanceof Spawn && unit.runCycle <= 0) {
        this.units[i] = new Octorok(unit.pixelPos, this.grid, this.spriteCtx)
      }

      unit.step();
      this.checkCollisionsAgainstPlayer(unit);

      this.player.attacks.forEach(attack => {
        if (Util.checkCollision(attack.hitBox, unit.pos)) this.damageUnit(unit)
      })

      // if (unit instanceof Spark && unit.runCycle > 16) {
      //   this.units.splice(this.units.indexOf(i), 1)
      // }
    })
  }

  checkCollisionsAgainstPlayer(unit) {
    if (unit instanceof Spawn || unit instanceof Spark) return;
    if (Util.checkCollision(this.player.hitbox, unit.pos)) this.damagePlayer();
  }

  damagePlayer(damage) {
    if (this.player.hp <= 0) return;
    this.player.takeDamage();
    this.hud.updateHearts(this.player.hp)
    if (this.player.hp <= 0) this.killPlayer();
  }

  killPlayer() {
    this.unitDeath.play();
    this.units.push(new Spark(this.player.pos, this.spriteCtx))
    // Object.assign({x: null, y: null}, this.player.pos)
  }

  damageUnit(unit, damage) {
    unit.takeDamage(damage);
    if (unit.hp <= 0) this.killUnit(unit)
  }


  killUnit(unit) {
    this.unitDeath.play();
    this.units.splice(this.units.indexOf(unit), 1)
    this.units.push(new Spark(unit.pos, this.spriteCtx))
  }

  knockBackPlayer(ctx) {
    // if (!this.player.frames.knockback) return;
    let faceDirection = this.player.pos.direction
    let x = this.player.pos.x
    let y = this.player.pos.y

    if (faceDirection === 96 && y < 634 && !this.impassableTerrain('down',ctx)) {
      this.player.move(0, 12)
    } else if (faceDirection === 144 && x > 14 && !this.impassableTerrain('left', ctx)) {
      this.player.move(-12, 0)
    } else if (faceDirection === 0 && y > 188 && !this.impassableTerrain('up', ctx)) {
      this.player.move(0, -12)
    } else if (faceDirection === 48 && x < 706 && !this.impassableTerrain('right', ctx)) {
      this.player.move(12, 0)
    }
  }

  drawUnits() {
    this.units.forEach(unit => unit.draw())
  }

  drawAttacks() {
    this.player.attacks.forEach(attack => attack.draw())
  }

  scanGrid(ctx) {
    let newGrid = [];
    let openSpaces = [];
    for (let y = 168; y < 696; y += 48) {
      let row = [];
      for (let x = 0; x < 768; x += 48) {
        let value = Util.scanMapTile(ctx, x, y);
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
      this.units.push(new Spawn(pixelPos, this.spriteCtx));
    }
  }
  
  // Scrolling logic below
  scroll(collisionCtx) {
    if (!this.scrolling) return;
    if (this.scrollQueue <= 0) {
      this.hud.updateMiniMap(this.board.getMapPos())
      this.scrolling = false;
      this.board.drawCollisionMap(collisionCtx)
      this.scanGrid(collisionCtx);
      this.setSpawns();
    } else {
      let playerDirection = this.player.pos.direction
      if (playerDirection === 96) {
        this.board.pos.y -= 8;
        if (this.scrollQueue > 48) this.player.move(0, 8)
      }
      if (playerDirection === 144) {
        this.board.pos.x += 8;
        if (this.scrollQueue > 48) this.player.move(-8, 0)
      }
      if (playerDirection === 0) {
        this.board.pos.y += 8;
        if (this.scrollQueue > 48) this.player.move(0, -8)
      }
      if (playerDirection === 48) {
        this.board.pos.x -= 8;
        if (this.scrollQueue > 48) this.player.move(8, 0)
      }
      this.scrollQueue -= 8;
      this.board.drawWorld()
    }
  }

  checkBorder() {
    if (this.player.pos.y < constants.BORDERTOP || this.player.pos.y > constants.BORDERBOTTOM) {
      this.scrolling = true;
      this.destroyUnits()
      this.scrollQueue = 528;
    }
    if (this.player.pos.x > constants.BORDERRIGHT || this.player.pos.x < constants.BORDERLEFT) {
      this.scrolling = true;
      this.destroyUnits()
      this.scrollQueue = 768;
    }
  }

  destroyUnits() {
    this.clearUnits();
    this.units = [];
    this.enemyCount = (Util.random(1, 6)) // reload enemy count for next screen.
  }

  // collision layer check below
  checkIfBarrier(pixel1, pixel2) {
    let pixel1value = Util.sumArr(pixel1)
    let pixel2value = Util.sumArr(pixel2)
    if (pixel1value === constants.WALL || pixel1value === constants.WATER) return true;
    if (pixel2value === constants.WALL || pixel2value === constants.WATER) return true;
    return false;
  }

  impassableTerrain(direction, ctx) {
    if (direction === 'up') {
      const topPixel = Util.getMapPixel(
        ctx,
        this.player.tracebox.topLeft[0],
        this.player.tracebox.topLeft[1] - 3)
      const bottomPixel = Util.getMapPixel(
        ctx,
        this.player.tracebox.topRight[0],
        this.player.tracebox.topRight[1] - 3)
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'right') {
      const topPixel = Util.getMapPixel(
        ctx,
        this.player.tracebox.topRight[0] + 3,
        this.player.tracebox.topRight[1])
      const bottomPixel = Util.getMapPixel(
        ctx,
        this.player.tracebox.bottomRight[0] + 3,
        this.player.tracebox.bottomRight[1])
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'down') {
      const topPixel = Util.getMapPixel(
        ctx,
        this.player.tracebox.bottomLeft[0],
        this.player.tracebox.bottomLeft[1] + 3)
      const bottomPixel = Util.getMapPixel(
        ctx,
        this.player.tracebox.bottomRight[0],
        this.player.tracebox.bottomRight[1] + 3)
      return this.checkIfBarrier(topPixel, bottomPixel)
    } else if (direction === 'left') {
      const topPixel = Util.getMapPixel(
        ctx,
        this.player.tracebox.topLeft[0] - 3,
        this.player.tracebox.topRight[1])
      const bottomPixel = Util.getMapPixel(
        ctx,
        this.player.tracebox.bottomLeft[0] - 3,
        this.player.tracebox.bottomLeft[1])
      return this.checkIfBarrier(topPixel, bottomPixel)
    }
  }

  processInput(ctx) {
    if (this.scrolling) return;
    if (!this.live) return;
    let direction = this.input.getInput()
    let speed = null;
    switch (direction) {
      case 'attack':
        this.player.attack();
        return;
      case 'up':
        speed = this.impassableTerrain(direction, ctx) ? 0 : -4
        this.player.move(0, speed, direction)
        break;
      case 'right':
        speed = this.impassableTerrain(direction, ctx) ? 0 : 4
        this.player.move(speed, 0, direction)
        break;
      case 'down':
        speed = this.impassableTerrain(direction, ctx) ? 0 : 4
        this.player.move(0, speed, direction)
        break;
      case 'left':
        speed = this.impassableTerrain(direction, ctx) ? 0 : -4
        this.player.move(speed, 0, direction)
        break;
    }
  }
}




export default Game;