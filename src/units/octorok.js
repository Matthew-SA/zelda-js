import * as util from '../util/util'
import Unit from './unit'
class Octorok extends Unit {
  constructor(pixelPos, grid) {
    super(pixelPos, grid, 96 * 5)
    
    // unit stats
    this.hp = 1;
    // this.ap = 1;

    this.speed = util.random(1,3)
    //start action cycle
    this.updateAction();
  }
  
}

export default Octorok;