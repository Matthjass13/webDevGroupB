import { Pirate } from './Pirate.js';
import { ScoreBoard } from './ScoreBoard.js';
import { Coin } from "./Coin.js";

/**
 * This class displays a level.
 * The player should press P to pause,
 * press R to reset the game,
 * and press B to go back to the game title screen.
 * @author Matthias Gaillard
 */

export class Level {

    constructor(ctx, game) {
        this.ctx = ctx;
        this.game = game;
        this.paused = false;
        this.WIDTH = ctx.canvas.width;
        this.HEIGHT = ctx.canvas.height;

        this.bgImage = new Image();
        this.bgImage.src = "ressources/images/game/level/background/field.png";

        this.pirate = new Pirate(this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2,
            1);
        this.scoreBoard = new ScoreBoard(0, 0);
        this.keysDown = {};

        this.then = Date.now();
        this.setupKeyboardListeners();


        this.NB_COINS = 10;

        this.coins = new Array(this.NB_COINS);
        this.coins.fill().forEach((_, i) => this.coins[i]
            = new Coin(Math.floor(Math.random()*(this.WIDTH-Coin.WIDTH)),
                       Math.floor(Math.random()*(this.HEIGHT-Coin.HEIGHT))));


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
        addEventListener("keydown", (e) => {
            this.keysDown[e.keyCode] = true;
        }, false);

        addEventListener("keyup", (e) => {
            delete this.keysDown[e.keyCode];
        }, false);
        addEventListener("keydown", (e) => {
            this.keysDown[e.keyCode] = true;
            if (e.key === "p" || e.key === "P") {
                this.togglePause();
            }
            if (e.key === "b" || e.key === "B") {
                this.game.switchTo("Menu");
            }
            if (e.key === "r" || e.key === "R") {
                this.reset();
            }
        }, false);

        addEventListener("keyup", (e) => {
            delete this.keysDown[e.keyCode];
        }, false);

    }


    update(modifier) {
        this.pirate.update(modifier, this.keysDown);
        this.pirate.x = Math.max(0, Math.min(this.pirate.x, this.ctx.canvas.width - this.pirate.RUNNING_SPRITE_WIDTH));
        this.pirate.y = Math.max(0, Math.min(this.pirate.y, this.ctx.canvas.height - this.pirate.RUNNING_SPRITE_HEIGHT));

        for(let coin of this.coins) {
            if(this.pirate.touch(coin)) {
                coin.collected = true;
                ++this.scoreBoard.nbCoins;
                this.pirate.gainWeight(coin);
            }
        }

    }

    draw() {
        this.ctx.drawImage(this.bgImage, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.scoreBoard.draw(this.ctx);
        for(let coin of this.coins)
            coin.draw(this.ctx);
        this.pirate.render(this.ctx);
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
        this.coins.fill().forEach((_, i) => this.coins[i]
            = new Coin(Math.floor(Math.random()*(this.WIDTH-Coin.WIDTH)),
            Math.floor(Math.random()*(this.HEIGHT-Coin.HEIGHT))));
    }




}
