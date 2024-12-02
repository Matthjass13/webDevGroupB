import { Pirate } from "./Pirate.js";
import { ScoreBoard } from "./ScoreBoard.js";
import { Coin } from "./Coin.js";
import { wallsLevel4, defaultWalls } from "./wall.js";
import { Key } from "./Key.js";

export class Level4 {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
    this.paused = false;
    this.WIDTH = ctx.canvas.width;
    this.HEIGHT = ctx.canvas.height;

    this.bgImage = new Image();
    this.bgImage.src = "ressources/images/game/level/background/level4.png";

    this.pirate = new Pirate(
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2,
      1
    );
    this.scoreBoard = new ScoreBoard(0, 0);
    this.keysDown = {};

    this.then = Date.now();
    this.setupKeyboardListeners();

    this.NB_COINS = 25; // Augmentation du nombre de pièces pour ce niveau
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

    this.walls = [...defaultWalls, ...wallsLevel4];

    this.key = new Key(500, 350);
    this.keyImage = new Image();
    this.keyImage.src = "ressources/images/game/level/elements/key.png";
  }

  start() {
    this.paused = false;
    this.play();
  }

  stop() {
    this.paused = true;
    this.clear();
  }

  setupKeyboardListeners() {
    addEventListener(
      "keydown",
      (e) => {
        this.keysDown[e.keyCode] = true;
        if (e.key === "p" || e.key === "P") this.togglePause();
        if (e.key === "b" || e.key === "B") this.game.switchTo("Menu");
        if (e.key === "r" || e.key === "R") this.reset();
      },
      false
    );

    addEventListener(
      "keyup",
      (e) => {
        delete this.keysDown[e.keyCode];
      },
      false
    );
  }

  update(modifier) {
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

    for (let coin of this.coins) {
      if (this.pirate.touch(coin)) {
        coin.collected = true;
        ++this.scoreBoard.nbCoins;
        this.pirate.gainWeight(coin);
      }
    }

    if (!this.key.collected && this.pirate.touchElement(this.key)) {
      this.key.collected = true;
      this.walls = this.walls.filter(
        (wall) => !(wall.x === 400 && wall.y === 150)
      );
    }

    for (let wall of this.walls) {
      if (this.pirate.touchElement(wall)) {
        const pirateRight = this.pirate.x + this.pirate.RUNNING_SPRITE_WIDTH;
        const pirateLeft = this.pirate.x;
        const pirateBottom = this.pirate.y + this.pirate.RUNNING_SPRITE_HEIGHT;
        const pirateTop = this.pirate.y;

        const wallRight = wall.x + wall.width;
        const wallLeft = wall.x;
        const wallBottom = wall.y + wall.height;
        const wallTop = wall.y;

        if (
          pirateRight > wallLeft &&
          this.pirate.previousX + this.pirate.RUNNING_SPRITE_WIDTH <= wallLeft
        ) {
          this.pirate.x = wallLeft - this.pirate.RUNNING_SPRITE_WIDTH;
        } else if (
          pirateLeft < wallRight &&
          this.pirate.previousX >= wallRight
        ) {
          this.pirate.x = wallRight;
        } else if (
          pirateBottom > wallTop &&
          this.pirate.previousY + this.pirate.RUNNING_SPRITE_HEIGHT <= wallTop
        ) {
          this.pirate.y = wallTop - this.pirate.RUNNING_SPRITE_HEIGHT;
        } else if (
          pirateTop < wallBottom &&
          this.pirate.previousY >= wallBottom
        ) {
          this.pirate.y = wallBottom;
        }
      }
    }

    const allCoinsCollected = this.coins.every((coin) => coin.collected);
    if (allCoinsCollected && this.key.collected) {
      this.game.switchTo("Level", 5);
    }
  }

  draw() {
    this.ctx.drawImage(
      this.bgImage,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
    this.scoreBoard.draw(this.ctx);
    for (let coin of this.coins) coin.draw(this.ctx);
    this.pirate.render(this.ctx);
    if (!this.key.collected) {
      this.ctx.drawImage(
        this.keyImage,
        this.key.x,
        this.key.y,
        this.key.width,
        this.key.height
      );
    }
    for (let wall of this.walls) wall.draw(this.ctx);
  }

  play() {
    if (this.paused) return;
    let now = Date.now();
    let delta = now - this.then;

    this.update(delta / 1000);
    this.draw();

    this.then = now;
    window.requestAnimationFrame(() => this.play());
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  togglePause() {
    this.paused = !this.paused;
    if (!this.paused) {
      this.then = Date.now();
      this.play();
    }
  }

  reset() {
    this.scoreBoard.reset();
    this.pirate.reset();
    this.coins.fill().forEach((_, i) => {
      this.coins[i] = new Coin(
        Math.floor(Math.random() * (this.WIDTH - Coin.WIDTH)),
        Math.floor(Math.random() * (this.HEIGHT - Coin.HEIGHT))
      );
    });
    this.key.collected = false;
    this.walls = [...defaultWalls, ...wallsLevel4];
  }
}
