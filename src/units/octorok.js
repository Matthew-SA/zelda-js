import * as Util from '../util/util'
import Unit from './unit'
class Octorok extends Unit {
  constructor(pixelPos, grid) {
    super(pixelPos, grid, (Util.random(0,6) * 96))
    
    // unit stats
    this.hp = 1;
    // this.ap = 1;

    this.speed = Util.random(1,3)
    //start action cycle
    this.updateAction();
  }
  
}

export default Octorok;