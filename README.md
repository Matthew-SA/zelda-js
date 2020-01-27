# JavaScript Project Proposal - NES Zelda

## MVP
NES Zelda clone that includes accurate sprites, 4 way movement, screen scrolling, and collision detection that was present in the original game.  Players will be able to move and interact with enemies much like the original 80’s classic.

## Functionality
* Title screen with about and links to author pages.
* Controllable player character with 4 way movement and attack.
* Screen scrolling.
* Attackable enemies.
* Pause / Inventory screen.

## Technologies, Libraries, and APIs
Project will primarily use vanilla JS and canvas.  I’ll also look into PIXI js (if allowed).  Later in development will look to add sound / music through standard JS or library.

## Wireframes
![wireframes](./images/zelda-wireframe.jpg)

Player will start at the title screen.  Hitting a key will load the game board where player can move character sprite.  While not immediately necessary for a basic product, would like to implement an inventory / pause menu that the player can open and close while on the game board.

## Architecture
* Player.js - Player logic (sprite, movement, hitbox, health value)
* Object.js - holds generic tile information (tree, rock, door).
* Enemy.js - enemy logic (basic AI, sprite, movement, hitbox, health value).
* Board.js - holds grid locations for player, obstacles, enemies.  Border detection for screen scrolling.  Collision detection.
* Game.js - holds game render functions and tick rate.  Game over logic.  Swaps* boards (screen scrolling, start menu).

## Implementation Timeline
* Phase 1: implement basic character sprite and movement on a featureless game board.
* Phase 2: implement view scrolling logic to game board and basic sprite artwork.
* Phase 3: implement enemy character (with basic AI).  Allow player character to interact with enemy character.

## Bonus
Project is meant to be fairly minimal for demo purposes, but would eventually like to add multiple enemy types and a “dungeon” for the player to explore.
