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
    this.grid = [ // collection of grid squares with color data of center 4 pixels.
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
    this.openSpaces = null; // Array of subarrays.  Each contain a x/y pixel position pair.
    this.enemyCount = 0;
  }

  spawnUnits() {
    for (let i = 0; i < this.enemyCount; i++) {
      let pixelPos = this.openSpaces[Math.floor(Math.random() * this.openSpaces.length)];
      this.units.push(new Spawn(pixelPos));
    }
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


  destroyUnits(ctx) {
    this.clearUnits(ctx);
    this.units = [];
    this.enemyCount = (util.random(1, 6)) // reload enemy count for next screen.
  }

  hatchSpawn(spawn) {
    new Octorok(spawn.pixelPos[0], spawn.pixelPos[1])
  }
}


export default Game;