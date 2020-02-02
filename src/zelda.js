console.log("project loaded!")
import GameView from './gameView'

const menuCanvas = document.getElementById('menu-canvas');
const menuCtx = menuCanvas.getContext('2d');
menuCanvas.width = 768
menuCanvas.height = 696

const spriteCanvas = document.getElementById('sprite-canvas');
const spriteCtx = spriteCanvas.getContext('2d');
spriteCanvas.width = 768
spriteCanvas.height = 696

const mapCanvas = document.getElementById('map-canvas');
const worldCtx = mapCanvas.getContext('2d')
mapCanvas.width = 768
mapCanvas.height = 696

const collisionCanvas = document.getElementById('collision-canvas');
const collisionCtx = collisionCanvas.getContext('2d')
collisionCanvas.width = 768
collisionCanvas.height = 696


// const background = new Image();
// background.src = "./images/board.jpg";

// background.onload = function () {
//   ctx.drawImage(background, 0, 0);
// }
// document.addEventListener('keyup', () => console.log('key up!'));
// document.addEventListener('keydown', () => console.log('key down!'));

const gameView = new GameView(menuCtx, spriteCtx, worldCtx, collisionCtx)
gameView.init();
