import Menu from './menu.js'
import Player from './player'
import Spawn from './units/spawn'
import Octorok from './units/octorok'
import Overworld from './overworld'
// import * as constants from './constants'
import * as util from './util'


// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles

class Game {
  constructor() {
    this.menu = new Menu;
    this.player = new Player;
    this.overworld = new Overworld;
    this.units = [];
    this.grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.openSpaces = null;
    this.enemyCount = 4;
  }

  spawnUnits() {
    for (let i = 0; i < this.enemyCount; i++) {
      let coordinate = this.openSpaces[Math.floor(Math.random() * this.openSpaces.length)];
      this.units.push(new Spawn(coordinate));
    }
  }

  incrementUnitRunCycle(ctx) {
    for (let i = 0; i < this.units.length; i++) {
      this.units[i].runCycle++
      if (this.units[i] instanceof Spawn && this.units[i].runCycle >= 240) {
        this.units[i].clear(ctx)
        this.units[i] = new Octorok(this.units[i].pos, this.grid);
      }
    }
    // console.log(this.units)
  }

  drawUnits(ctx) {
    for (let i = 0; i < this.units.length; i++ ) {
      this.units[i].draw(ctx)
    }
    this.player.draw(ctx);
  }

  clearUnits(ctx) {
    for (let i = 0; i < this.units.length; i++) {
      this.units[i].clear(ctx);
    }
    this.player.clear(ctx);
  }

  destroyUnits(ctx) {
    this.clearUnits(ctx);
    this.units = [];
  }

  hatchSpawn(spawn) {
    new Octorok(spawn.pos[0], spawn.pos[1])
  }
}


export default Game;