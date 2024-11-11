import { Pirate } from './Pirate.js';
import { ScoreBoard } from './ScoreBoard.js';

class Level {

    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');


        this.bgImage = new Image();
        this.BG_RESSOURCES_FOLDER = "ressources/images/game/background/"
        this.bgImage.src = this.BG_RESSOURCES_FOLDER + "fieldBackground.jpg";

        this.pirate = new Pirate(this.canvas.width / 2, this.canvas.height / 2);
        this.scoreBoard = new ScoreBoard(15, 15);
        this.keysDown = {};

        this.then = Date.now();
        this.setupKeyboardListeners();
        this.main();
    }

    drawBorders(color, width) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setupKeyboardListeners() {
        addEventListener("keydown", (e) => {
            this.keysDown[e.keyCode] = true;
        }, false);

        addEventListener("keyup", (e) => {
            delete this.keysDown[e.keyCode];
        }, false);
    }


    update(modifier) {
        this.pirate.update(modifier, this.keysDown);

        this.pirate.x = Math.max(15, Math.min(this.pirate.x, this.canvas.width - 15 - this.pirate.RUNNING_SPRITE_WIDTH));
        this.pirate.y = Math.max(15, Math.min(this.pirate.y, this.canvas.height - 15 - this.pirate.RUNNING_SPRITE_HEIGHT));

    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.bgImage, 0, 0, this.canvas.width, this.canvas.height);
        this.drawBorders("black", 30);
        this.scoreBoard.render(this.ctx);
        this.pirate.render(this.ctx);
    }

    main() {
        let now = Date.now();
        let delta = now - this.then;

        this.update(delta / 1000);
        this.render();
        this.then = now;

        window.requestAnimationFrame(() => this.main());
    }
}

const level = new Level();