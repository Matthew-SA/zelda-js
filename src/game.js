import Menu from './menu.js'
import Player from './player'
import Octorok from './units/octorok'
import Overworld from './overworld'
// import * as constants from './constants'
import * as util from './util'


// gameView is 16 x 14.5 'tiles
// gameplay is in 16 x 11 tiles

class Game {
  constructor() {
    this.menu = new Menu;
    this.player = new Player();
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
  }

  spawnUnits() {
    for (let i = 0; i < 3; i++) {
      let coordinate = this.openSpaces[Math.floor(Math.random() * this.openSpaces.length)];
      this.units.push(new Octorok(coordinate));
      console.log(coordinate)
    }
  }

  drawUnits(ctx) {
    for (let i = 0; i < this.units.length; i++ ) {
      this.units[i].draw(ctx);
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

}


export default Game;