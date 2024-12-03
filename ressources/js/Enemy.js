
/**
 * This class represents an enemy
 * @author Elia Pfammatter
 */

export class Enemy {
  constructor(startX, startY, endX, endY, speed, number) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.x = startX;
    this.y = startY;
    this.speed = speed;
    this.number = number;
    this.width = 40;
    this.height = 40;

    this.direction = 1; // 1 for right, -1 for left
    this.isRunning = true;

    this.currentDistance = 0;
    this.totalDistance = Math.abs(this.endX - this.startX);

    this.runningRightSprites = [];
    this.runningLeftSprites = [];
    this.ready = false;

    this.SPRITES_FOLDER_PATH = "ressources/images/game/level/characters/enemy/" + number + "/";

    this.IDLE_SPRITE_INTERVAL = 20;
    this.IDLE_SPRITE_QUANTITY = 2;

    this.runningSpriteIndex = 0;
    this.runningSpriteTimer = 0;
    this.RUNNING_SPRITE_INTERVAL = 10;
    this.RUNNING_SPRITE_QUANTITY = 4;

    this.currentSprite = null;

    this.loadSprites();
  }

  loadSprites() {
    let loadedCount = 0;
    const totalSprites = this.RUNNING_SPRITE_QUANTITY * 2; // Total number of sprites to load
  
    const onSpriteLoaded = () => {
      loadedCount++;
      if (loadedCount === totalSprites) {
        this.ready = true; // Set ready to true only when all sprites are loaded
        console.log("Enemy sprites fully loaded");
      }
    };
  
    for (let i = 0; i < this.RUNNING_SPRITE_QUANTITY; i++) {
      this.runningRightSprites[i] = new Image();
      this.runningRightSprites[i].src =
        this.SPRITES_FOLDER_PATH + `running/right/enemy${i}.png`;
      this.runningRightSprites[i].onload = onSpriteLoaded; // Increment loaded count when image is loaded
  
      this.runningLeftSprites[i] = new Image();
      this.runningLeftSprites[i].src =
        this.SPRITES_FOLDER_PATH + `running/left/enemy${i}.png`;
      this.runningLeftSprites[i].onload = onSpriteLoaded; // Increment loaded count when image is loaded
    }
  }
  

  update(modifier) {
    if (this.currentDistance < this.totalDistance) {
      const moveX = this.direction * this.speed * modifier;
      this.x += moveX;
      this.currentDistance += Math.abs(moveX);
      console.log("updating enemy")

      if (this.currentDistance >= this.totalDistance) {
        this.x = this.endX;
        this.reverseDirection();
        this.currentDistance = 0;
      }
      console.log("updating enemy")
      this.isRunning = true;
    } else {
      this.isRunning = false;
    }

    this.updateSprite();
  }

  handlePlayerHitEnemy() {
    this.scoreBoard.lives -= 1;
    if (this.scoreBoard.lives <= 0) {
      console.log("Game Over!");
    } else {
      console.log("Player hit!");
      this.pirate.reset(); // Reset the pirate's position
    }
  }
  

  updateSprite() {
    if (this.isRunning) {
      this.runningSpriteTimer =
        (this.runningSpriteTimer + 1) % this.RUNNING_SPRITE_INTERVAL;
      if (this.runningSpriteTimer === 0) {
        this.runningSpriteIndex =
          (this.runningSpriteIndex + 1) % this.RUNNING_SPRITE_QUANTITY;
      }
  }
}

  reverseDirection() {
    this.direction *= -1;
    [this.startX, this.endX] = [this.endX, this.startX];
  }

  render(ctx) {
    console.log(`Rendering enemy, ready: ${this.ready}`);
    if (this.ready) {
      if (this.direction === 1) {
        if (this.isRunning) {
          ctx.drawImage(
            this.runningRightSprites[this.runningSpriteIndex],
            this.x,
            this.y,
            40,
            40
          );
          console.log("Running right");
        }
      } else {
        if (this.isRunning) {
          ctx.drawImage(
            this.runningLeftSprites[this.runningSpriteIndex],
            this.x,
            this.y,
            40,
            40
          );
          console.log("Running left");
        }
      }
    }
  }
  
  

  reset() {
    this.x = this.startX;
    this.y = this.startY;
    this.currentDistance = 0;
  }
}
