import Game from './src/game'

const menuCanvas = document.getElementById('menu-canvas');
const hudCtx = menuCanvas.getContext('2d');
menuCanvas.width = 768
menuCanvas.height = 696

const spriteCanvas = document.getElementById('sprite-canvas');
const spriteCtx = spriteCanvas.getContext('2d');
spriteCanvas.width = 768
spriteCanvas.height = 696

const mapCanvas = document.getElementById('map-canvas');
const boardCtx = mapCanvas.getContext('2d')
mapCanvas.width = 768
mapCanvas.height = 696

const collisionCanvas = document.getElementById('collision-canvas');
const collisionCtx = collisionCanvas.getContext('2d')
collisionCanvas.width = 768
collisionCanvas.height = 696


const game = new Game(hudCtx, spriteCtx, boardCtx, collisionCtx)

window.addEventListener('load',() => {
  game.init();
}, false);
