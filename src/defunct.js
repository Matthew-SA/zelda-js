
passableTerrain(direction) {
  if (direction === 'north') {
    const topPixel = this.getMapPixel(this.player.tracebox.topLeft[0], this.player.tracebox.topLeft[1] - 6)
    const bottomPixel = this.getMapPixel(this.player.tracebox.topRight[0], this.player.tracebox.topRight[1] - 6)
    return (util.equalArr(constants.SAND, topPixel) && util.equalArr(constants.SAND, bottomPixel))
  } else if (direction === 'east') {
    const topPixel = this.getMapPixel(this.player.tracebox.topRight[0] + 6, this.player.tracebox.topRight[1])
    const bottomPixel = this.getMapPixel(this.player.tracebox.bottomRight[0] + 6, this.player.tracebox.bottomRight[1])
    return (util.equalArr(constants.SAND, topPixel) && util.equalArr(constants.SAND, bottomPixel))
  } else if (direction === 'south') {
    const topPixel = this.getMapPixel(this.player.tracebox.bottomLeft[0], this.player.tracebox.bottomLeft[1] + 9)
    const bottomPixel = this.getMapPixel(this.player.tracebox.bottomRight[0], this.player.tracebox.bottomRight[1] + 9)
    return (util.equalArr(constants.SAND, topPixel) && util.equalArr(constants.SAND, bottomPixel))
  } else if (direction === 'west') {
    const topPixel = this.getMapPixel(this.player.tracebox.topLeft[0] - 6, this.player.tracebox.topRight[1])
    const bottomPixel = this.getMapPixel(this.player.tracebox.bottomLeft[0] - 6, this.player.tracebox.bottomLeft[1])
    return (util.equalArr(constants.SAND, topPixel) && util.equalArr(constants.SAND, bottomPixel))
  }
}