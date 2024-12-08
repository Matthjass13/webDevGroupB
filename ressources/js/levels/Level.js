import { Pirate } from "../characters/Pirate.js";
import { ScoreBoard } from "../elements/ScoreBoard.js";
import { Coin } from "../elements/Coin.js";
import { wallsLevel1, defaultWalls } from "../elements/Wall.js";
import { Key } from "../elements/Key.js";
import { Door } from "../elements/Door.js";
import { Enemy } from "../characters/Ennemy.js";

/**
 * This class is an abstract level.
 * Subclasses will create concrete levels.
 * @author Matthias Gaillard
 */
export class Level {
    constructor(ctx, game, selectedCharacter, number, key, door, ennemy) {
        this.ctx = ctx;
        this.game = game;
        this.selectedCharacter = selectedCharacter;
        this.number=number;
        this.key=key;
        this.door=door;
        this.ennemy=ennemy;

        this.WIDTH = ctx.canvas.width;
        this.HEIGHT = ctx.canvas.height;
        this.paused = false;
        this.bgImage = new Image();
        this.bgImage.src = "ressources/images/game/level/background/level" + number + ".png";

        this.pirate = new Pirate(
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2,
            this.selectedCharacter
        );
        this.keysDown = {};

        this.scoreBoard = new ScoreBoard(0, 0, this.pirate);

        this.then = Date.now();
        this.setupKeyboardListeners();

        this.NB_COINS = 10;
        this.coins = new Array(this.NB_COINS);
        this.coins
            .fill()
            .forEach(
                (_, i) =>
                    (this.coins[i] = new Coin(
                        Math.floor(Math.random() * (this.WIDTH - Coin.WIDTH)),
                        Math.floor(Math.random() * (this.HEIGHT - Coin.HEIGHT))
                    ))
            );


        this.soundTrack = new Audio("ressources/audio/soundTracks/caribbean.wav");
        this.soundTrack.volume = 0.1;

    }

    start() {
        this.paused = false;
        this.play();
    }

    stop() {
        this.paused = true;
        this.clear();
    }

    // Set up listeners for keyboard events
    setupKeyboardListeners() {
        addEventListener(
            "keydown",
            (e) => {
                this.keysDown[e.keyCode] = true;
                if (e.key === "p" || e.key === "P") {
                    this.togglePause(); // Toggle pause state
                }
                if (e.key === "b" || e.key === "B") {
                    this.soundTrack.pause();
                    this.soundTrack.currentTime = 0;
                    this.game.switchTo("Menu"); // Switch back to menu screen
                }
                if (e.key === "r" || e.key === "R") {
                    this.reset(); // Reset the level
                }
            },
            false
        );

        addEventListener(
            "keyup",
            (e) => {
                delete this.keysDown[e.keyCode]; // Remove key from keysDown when released
            },
            false
        );
    }

    handlePlayerHitEnemy() {
        this.scoreBoard.lives -= 1;
        // Check if game over
        if (this.scoreBoard.lives <= 0) {
            console.log("Game Over!");
        } else {
            console.log("Player hit!");
        }
    }

    update(modifier) {

        this.pirate.previousX = this.pirate.x;
        this.pirate.previousY = this.pirate.y;
        this.pirate.update(modifier, this.keysDown);
        this.pirate.x = Math.max(
            0,
            Math.min(
                this.pirate.x,
                this.ctx.canvas.width - this.pirate.RUNNING_SPRITE_WIDTH
            )
        );
        this.pirate.y = Math.max(
            0,
            Math.min(
                this.pirate.y,
                this.ctx.canvas.height - this.pirate.RUNNING_SPRITE_HEIGHT
            )
        );

        this.ennemy.update(modifier);
        if (this.pirate.touch(this.ennemy)) {
            console.log("Collison with enemy");
            //this.handlePlayerHitEnemy();
        }

        // Handle collisions between the pirate and walls
        for (let wall of this.walls) {
            if (this.pirate.touchElement(wall)) {
                // Determine from which side the collision occurred
                const pirateRight = this.pirate.x + this.pirate.RUNNING_SPRITE_WIDTH;
                const pirateLeft = this.pirate.x;
                const pirateBottom = this.pirate.y + this.pirate.RUNNING_SPRITE_HEIGHT;
                const pirateTop = this.pirate.y;

                const wallRight = wall.x + wall.width;
                const wallLeft = wall.x;
                const wallBottom = wall.y + wall.height;
                const wallTop = wall.y;

                // Collision from the right side
                if (
                    pirateRight > wallLeft &&
                    this.pirate.previousX + this.pirate.RUNNING_SPRITE_WIDTH <= wallLeft
                ) {
                    this.pirate.x = wallLeft - this.pirate.RUNNING_SPRITE_WIDTH;
                }
                // Collision from the left side
                else if (pirateLeft < wallRight && this.pirate.previousX >= wallRight) {
                    this.pirate.x = wallRight;
                }
                // Collision from the bottom side
                else if (
                    pirateBottom > wallTop &&
                    this.pirate.previousY + this.pirate.RUNNING_SPRITE_HEIGHT <= wallTop
                ) {
                    this.pirate.y = wallTop - this.pirate.RUNNING_SPRITE_HEIGHT;
                }
                // Collision from the top side
                else if (
                    pirateTop < wallBottom &&
                    this.pirate.previousY >= wallBottom
                ) {
                    this.pirate.y = wallBottom;
                }
            }
        }

        if (!this.key.collected && this.pirate.touchElement(this.key)) {
            this.key.collected = true;
            this.door.open();
            this.walls = this.walls.filter(
                (wall) => !(wall.x === this.DOOR_WALL_X && wall.y ===  this.DOOR_WALL_Y)
            );
        }

        for (let coin of this.coins) {
            if (this.pirate.touch(coin)) {
                coin.collected = true;
                ++this.pirate.nbCoins;
                this.pirate.gainWeight(coin);
            }
        }

        const allCoinsCollected = this.coins.every((coin) => coin.collected);
        if (allCoinsCollected && this.key.collected) {
            this.game.switchTo("Level", this.number+1, this.selectedCharacter);
        }

        this.scoreBoard.update(this.pirate, this.key);
    }

    draw() {
        this.ctx.drawImage(this.bgImage, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.scoreBoard.draw(this.ctx);
        this.door.draw(this.ctx);
        for (let coin of this.coins) coin.draw(this.ctx);
        this.ennemy.render(this.ctx);
        this.pirate.render(this.ctx);
        this.key.draw(this.ctx);
        for (let wall of this.walls) {
            wall.draw(this.ctx);
        }
    }

    play() {
        if (this.paused) return; // Stop the loop if the game is paused

        let now = Date.now();
        let delta = now - this.then;

        this.update(delta / 1000); // Update the game state
        this.draw(); // Draw everything

        this.then = now;

        window.requestAnimationFrame(() => this.play()); // Request the next frame
    }

    // Clear the canvas
    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    // Toggle the paused state of the game
    togglePause() {
        this.paused = !this.paused;
        if (!this.paused) {
            this.then = Date.now(); // Reset timestamp when resuming
            this.play();
            this.soundTrack.play();
        } else
            this.soundTrack.pause();
    }

    // Reset the level to its initial state
    reset() {
        this.soundTrack.currentTime = 0;
        this.soundTrack.play();
        this.scoreBoard.reset(); // Reset the scoreboard
        this.pirate.reset(); // Reset the pirate's position and state
        // Recreate coins and position them randomly
        this.coins
            .fill()
            .forEach(
                (_, i) =>
                    (this.coins[i] = new Coin(
                        Math.floor(Math.random() * (this.WIDTH - Coin.WIDTH)),
                        Math.floor(Math.random() * (this.HEIGHT - Coin.HEIGHT))
                    ))
            );
        this.key.collected = false; // Reset the key's state
        this.walls = [...defaultWalls, ...wallsLevel1]; // Reset the walls to default
    }
}
