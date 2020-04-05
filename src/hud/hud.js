import * as Util from '../util/util'

class Hud {
  constructor(ctx) {
    this.ctx = ctx;
    this.pos = { x: 0, y: 0 }
    this.image = new Image();
    this.image.src = "./assets/images/ui/menu.png"
    this.heartSprite = new Image();
    this.heartSprite.src = "./assets/images/items/hearts.png"
    this.numbers = new Image();
    this.numbers.src = "./assets/images/ui/numbers.png"
    this.primaryitems = new Image();
    this.primaryitems.src = './assets/images/items/primaryItems.png'

    this.startPage = new Image();
    this.startPage.src = './assets/images/ui/start.png'

    this.deathPage = new Image();
    this.deathPage.src = './assets/images/ui/deathpage.png'

    this.maxHearts = 6;
    this.slotA = null;
    this.slotB = null;

    this.death = false;
  }

  renderStartPage() {
    this.ctx.drawImage(
      this.startPage, 0, 0
    )
  }

  renderDeathPage() {
    if (this.death === false) {
      this.ctx.drawImage(
        this.deathPage, 0, 0
      )
      this.death = true;
    }
  }

  clearStartPage() {
    this.ctx.clearRect(0, 0, 768, 696)
    this.render()
  }

  render() {
    this.ctx.drawImage(
      this.image,
      0,
      528,
      768,
      696,
      this.pos.x,
      this.pos.y,
      768,
      696
    )
    this.updateHearts(6)
    this.updateMiniMap({ x: 7, y: 7})
    this.updateMoney(0)
    this.updateKeys(0)
    this.updateBombCount(0)
    this.updateSlotA(0)
    this.updateSlotB()
  }

  updateHearts(hp) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(528, 96, 192, 48)
    for (let i = 0; i < this.maxHearts; i++) {
      this.ctx.drawImage(
        this.heartSprite,
        i < hp ? 24 : 72,
        0,
        24,
        24,
        528 + (24 * i),
        96,
        24,
        24,
      )
    }
  }

  updateMiniMap(gridPos) {
    // header
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(48, 24, 192, 48)
    //  minimap
    this.ctx.fillStyle = 'grey'
    this.ctx.fillRect(48, 48, 192, 96)
    // player dot
    this.ctx.fillStyle = '#80D010'
    this.ctx.fillRect(51 + (gridPos.x * 12),48 + (gridPos.y * 12),9,9)
  }

  updateMoney(money) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(312, 48, 48, 24)
    let digits = Util.splitNum(money)
    digits.forEach((digit, i) => {
      this.ctx.drawImage(
        this.numbers,
        0 + (24 * digit),
        0,
        24,
        24,
        312 + (24 * i),
        48,
        24,
        24
      )
    })
  }

  updateKeys(keys) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(312, 96, 48, 24)
    let digits = Util.splitNum(keys)
    digits.forEach((digit, i) => {
      this.ctx.drawImage(
        this.numbers,
        0 + (24 * digit),
        0,
        24,
        24,
        312 + (24 * i),
        96,
        24,
        24
      )
    })
  }

  updateBombCount(bombs) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(312, 120, 48, 24)
    let digits = Util.splitNum(bombs)
    digits.forEach((digit, i) => {
      this.ctx.drawImage(
        this.numbers,
        0 + (24 * digit),
        0,
        24,
        24,
        312 + (24 * i),
        120,
        24,
        24
      )
    })
  }

  updateSlotA(itemCode) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(456, 72, 24, 48)
    this.ctx.drawImage(
      this.primaryitems,
      0 + (24 * itemCode),
      0,
      24,
      48,
      456,
      72,
      24,
      48
    )
  }

  updateSlotB(item) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(384, 72, 24, 48)
    // this.ctx.drawImage(
    //   this.primaryitems
    // )
  }
}

export default Hud;