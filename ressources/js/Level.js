import { Pirate } from "./Pirate.js";
import { ScoreBoard } from "./ScoreBoard.js";
import { Coin } from "./Coin.js";
import { wallsLevel1, defaultWalls } from "./wall.js";
import { Key } from "./Key.js";

/**
 * This class displays a level.
 * The player should press P to pause,
 * press R to reset the game,
 * and press B to go back to the game title screen.
 * @author Matthias Gaillard
 */
export class Level {
  constructor(ctx, game) {
    this.ctx = ctx; // Reference to the canvas context
    this.game = game; // Reference to the game instance
    this.paused = false; // Boolean to track if the game is paused
    this.WIDTH = ctx.canvas.width; // Width of the canvas
    this.HEIGHT = ctx.canvas.height; // Height of the canvas

    // Load background image for the level
    this.bgImage = new Image();
    this.bgImage.src = "ressources/images/game/level/background/level1.png";

    // Create a new Pirate instance for the player character
    this.pirate = new Pirate(
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2,
      1
    );
    this.scoreBoard = new ScoreBoard(0, 0); // Create a scoreboard instance
    this.keysDown = {}; // Object to track keys pressed

    this.then = Date.now(); // Timestamp to manage animation frames
    this.setupKeyboardListeners(); // Set up keyboard input listeners

    this.NB_COINS = 10; // Number of coins to spawn in the level

    // Create an array of coins and position them randomly on the canvas
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

    // Define the walls for the level (using default and level-specific walls)
    this.walls = [...defaultWalls, ...wallsLevel1];

    // Add the key to the level
    this.key = new Key(230, 420); // Position of the key
    this.keyImage = new Image();
    this.keyImage.src = "ressources/images/game/level/elements/key.png"; // Image of the key
  }

  // Start the level gameplay
  start() {
    this.paused = false;
    this.play();
  }

  // Stop the level gameplay
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
  // Update the state of the level
  update(modifier) {
    // Save previous position of the pirate before updating
    this.pirate.previousX = this.pirate.x;
    this.pirate.previousY = this.pirate.y;

    // Update the pirate's position based on input
    this.pirate.update(modifier, this.keysDown);
    // Ensure the pirate does not move out of canvas bounds
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

    // Check for collisions between the pirate and coins
    for (let coin of this.coins) {
      if (this.pirate.touch(coin)) {
        coin.collected = true; // Mark coin as collected
        ++this.scoreBoard.nbCoins; // Increase coin count on scoreboard
        this.pirate.gainWeight(coin); // Pirate gains weight when collecting a coin
      }
    }

    // Detect collision with the key
    if (!this.key.collected && this.pirate.touchElement(this.key)) {
      this.key.collected = true; // Mark the key as collected
      console.log("Key collected"); // Log message for debugging
      // Remove the door by filtering out specific wall
      this.walls = this.walls.filter(
        (wall) => !(wall.x === 340 && wall.y === 110) // Remove the door from the walls array
      );
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

    // Check if all coins are collected and the key has been collected
    const allCoinsCollected = this.coins.every((coin) => coin.collected);
    if (allCoinsCollected && this.key.collected) {
      console.log("All conditions met, switching to Level 2"); // Debug message
      this.game.switchTo("Level", 2); // Switch to the next level
    }
  }

  // Draw all game elements on the canvas
  draw() {
    // Draw the background image
    this.ctx.drawImage(
      this.bgImage,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
    // Draw the scoreboard
    this.scoreBoard.draw(this.ctx);
    // Draw each coin
    for (let coin of this.coins) coin.draw(this.ctx);
    // Render the pirate character
    this.pirate.render(this.ctx);

    // Draw the key if it has not been collected
    if (!this.key.collected) {
      this.ctx.drawImage(
        this.keyImage,
        this.key.x,
        this.key.y,
        this.key.width,
        this.key.height
      );
    }

    // Draw each wall
    for (let wall of this.walls) {
      wall.draw(this.ctx);
    }
  }

  // Main gameplay loop
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
    }
  }

  // Reset the level to its initial state
  reset() {
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
