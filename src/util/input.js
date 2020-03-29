import * as Util from './util'

class Input {
  constructor() {
    this.movement = [];
    this.attack = 
    document.addEventListener('keyup', e => this.onKeyUp(e));
    document.addEventListener('keydown', e => this.onKeyDown(e));
  }

  getInput() {
    if (this.attack) {
      this.attack = false;
      return 'attack'
    } else {
      return this.movement[0]
    }
  }

  onKeyDown(event) {
    switch(event.keyCode) {
      case 38:
      case 87:
        event.preventDefault()
        if (!this.movement.includes('up')) this.movement.unshift('up')
        break;
      case 39:
      case 68:
        event.preventDefault()
        if (!this.movement.includes('right')) this.movement.unshift('right')
        break;
      case 40:
      case 83:
        event.preventDefault()
        if (!this.movement.includes('down')) this.movement.unshift('down')
        break;
      case 37:
      case 65:
        event.preventDefault()
        if (!this.movement.includes('left')) this.movement.unshift('left')
        break;
      case 32:
        event.preventDefault()
        if (!this.fired) {
          this.attack = true; 
          this.fired = true;
        }
        break;
    }
  }

  onKeyUp() {
    switch (event.keyCode) {
      case 38:
      case 87:
        Util.removeElement(this.movement, 'up')
        break;
      case 39:
      case 68:
        Util.removeElement(this.movement, 'right')
        break;
      case 40:
      case 83:
        Util.removeElement(this.movement, 'down')
        break;
      case 37:
      case 65:
        Util.removeElement(this.movement, 'left')
        break;
      case 32:
        this.fired = false;
        break;
    }
  }
}

export default Input;