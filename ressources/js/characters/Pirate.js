import { Coin } from "../elements/Coin.js";
import { Element } from "../elements/Element.js";

/**
 * This class represents a playable character
 * @author Matthias Gaillard
 * @contributor Alexis Jordan
 * @contributor Elia Pfammatter
 */

export class Pirate extends Element {
  constructor(x, y, number = 0, nbPieces = 0) {
    super(x, y);
    this.number = number;
    this.BASE_X = x;
    this.BASE_Y = y;
    this.previousX = x;
    this.previousY = y;
    this.direction = 1; // Right (-1 for left)
    this.isRunning = false;
    this.BASE_SPEED = this.number === 0 ? 250 : 450;
    this.speed = this.BASE_SPEED;

    this.idleRightSprites = [];
    this.idleLeftSprites = [];
    this.runningRightSprites = [];
    this.runningLeftSprites = [];
    this.ready = false;
    this.SPRITES_FOLDER_PATH =
      "ressources/images/game/level/characters/player/" + number + "/";

    this.idleSpriteIndex = 0;
    this.idleSpriteTimer = 0;
    this.IDLE_SPRITE_INTERVALLE = this.number === 0 ? 20 : 3;
    this.IDLE_SPRITE_QUANTITY = this.number === 0 ? 2 : 26;

    this.runningSpriteIndex = 0;
    this.runningSpriteTimer = 0;
    this.RUNNING_SPRITE_INTERVALLE = this.number === 0 ? 10 : 2;
    this.RUNNING_SPRITE_WIDTH = Math.floor(
      (this.number === 0 ? 70 : 58) * 0.72
    );
    this.RUNNING_SPRITE_HEIGHT = Math.floor(
      (this.number === 0 ? 76 : 58) * 0.72
    );
    this.RUNNING_SPRITE_QUANTITY = this.number === 0 ? 4 : 14;

    this.currentSprite = this.idleRightSprites[0];

    this.loadSprites();

    this.footstepSound = new Audio("ressources/audio/soundEffects/footsteps.wav");


    this.nbCoins = 0;
    this.nbLives = 3;

  }

  loadSprites() {
    for (let i = 0; i < this.IDLE_SPRITE_QUANTITY; i++) {
      this.idleRightSprites[i] = new Image();
      this.idleRightSprites[i].src =
        this.SPRITES_FOLDER_PATH + `idle/right/${i}.png`;
    }
    for (let i = 0; i < this.IDLE_SPRITE_QUANTITY; i++) {
      this.idleLeftSprites[i] = new Image();
      this.idleLeftSprites[i].src =
        this.SPRITES_FOLDER_PATH + `idle/left/${i}.png`;
    }
    for (let i = 0; i < this.RUNNING_SPRITE_QUANTITY; i++) {
      this.runningRightSprites[i] = new Image();
      this.runningRightSprites[i].src =
        this.SPRITES_FOLDER_PATH + `running/right/${i}.png`;
    }
    for (let i = 0; i < this.RUNNING_SPRITE_QUANTITY; i++) {
      this.runningLeftSprites[i] = new Image();
      this.runningLeftSprites[i].src =
        this.SPRITES_FOLDER_PATH + `running/left/${i}.png`;
    }
    this.ready = true;
  }

  update(modifier, keysDown) {
    this.updatePosition(modifier, keysDown);
    this.updateSprite();
  }

  updatePosition(modifier, keysDown) {

    this.previousX = this.x;
    this.previousY = this.y;

    this.isRunning = false;

    if (37 in keysDown) {
      // Left
      this.x -= this.speed * modifier;
      this.direction = -1;
      this.isRunning = true;
    }
    if (38 in keysDown) {
      // Up
      this.y -= this.speed * modifier;
      this.isRunning = true;
    }
    if (39 in keysDown) {
      // Right
      this.x += this.speed * modifier;
      this.direction = 1;
      this.isRunning = true;
    }
    if (40 in keysDown) {
      // Down
      this.y += this.speed * modifier;
      this.isRunning = true;
    }

    if(this.isRunning) {
      this.footstepSound.play();
    } else {
      this.footstepSound.pause();
      this.footstepSound.currentTime=0;
    }

  }

  updateSprite() {
    if (this.isRunning) {
      this.runningSpriteTimer =
        (this.runningSpriteTimer + 1) % this.RUNNING_SPRITE_INTERVALLE;
      if (this.runningSpriteTimer === 0) {
        this.runningSpriteIndex =
          (this.runningSpriteIndex + 1) % this.RUNNING_SPRITE_QUANTITY;
      }
    } else {
      this.idleSpriteTimer =
        (this.idleSpriteTimer + 1) % this.IDLE_SPRITE_INTERVALLE;
      if (this.idleSpriteTimer === 0) {
        this.idleSpriteIndex =
          (this.idleSpriteIndex + 1) % this.IDLE_SPRITE_QUANTITY;
      }
    }
  }

  render(ctx) {
    if (this.ready) {
      switch (this.direction) {
        case -1:
          if (this.isRunning)
            ctx.drawImage(
              this.runningLeftSprites[this.runningSpriteIndex],
              this.x,
              this.y,
              this.RUNNING_SPRITE_WIDTH,
              this.RUNNING_SPRITE_HEIGHT
            );
          else
            ctx.drawImage(
              this.idleLeftSprites[this.idleSpriteIndex],
              this.x,
              this.y,
              this.RUNNING_SPRITE_WIDTH,
              this.RUNNING_SPRITE_HEIGHT
            );
          break;
        case 1:
          if (this.isRunning)
            ctx.drawImage(
              this.runningRightSprites[this.runningSpriteIndex],
              this.x,
              this.y,
              this.RUNNING_SPRITE_WIDTH,
              this.RUNNING_SPRITE_HEIGHT
            );
          else
            ctx.drawImage(
              this.idleRightSprites[this.idleSpriteIndex],
              this.x,
              this.y,
              this.RUNNING_SPRITE_WIDTH,
              this.RUNNING_SPRITE_HEIGHT
            );
          break;
      }
    }
  }

  /*Don't refactor
  Otherwise coin hitboxes glitch*/
  touch(coin) {
    return (
      !(
        this.x + this.RUNNING_SPRITE_WIDTH <= coin.x ||
        coin.x + Coin.WIDTH <= this.x ||
        this.y + this.RUNNING_SPRITE_HEIGHT <= coin.y ||
        coin.y + Coin.HEIGHT <= this.y
      ) && !coin.collected
    );
  }
  touchElement(element) {
    return !(
      this.x + this.RUNNING_SPRITE_WIDTH <= element.x ||
      element.x + element.width <= this.x ||
      this.y + this.RUNNING_SPRITE_HEIGHT <= element.y ||
      element.y + element.height <= this.y
    );
  }
  isNextTo(door) {
    let distance = Math.sqrt(Math.pow(this.x - door.x, 2) + Math.pow(this.y - door.y, 2));
    return distance<=50;
  }


  resetPosition() {
    this.x = this.BASE_X;
    this.y = this.BASE_Y;
  }
  reset() {
    this.resetPosition();
    this.speed = this.BASE_SPEED;
    this.nbCoins = 0;
    this.nbLives = 3;
  }

  /**
   * This function slows down the second playable pirate
   * each time he collects a coin.
   * @param coin
   */
  gainWeight(coin) {
    if (this.number != 0)
      this.speed -= coin.WEIGHT;
  }

}
