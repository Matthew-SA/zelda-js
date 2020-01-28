console.log("project loaded!")
import GameView from './gameView'



const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800
canvas.height = 700

const gameView = new GameView(ctx)
gameView.start();