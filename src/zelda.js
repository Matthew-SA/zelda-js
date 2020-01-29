console.log("project loaded!")
import GameView from './gameView'



const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 768
canvas.height = 672


// document.addEventListener('keyup', () => console.log('key up!'));
// document.addEventListener('keydown', () => console.log('key down!'));

const gameView = new GameView(ctx)
gameView.init();