import { Element } from "../elements/Element.js";

/**
 * This class represents an enemy
 * @author Elia Pfammatter
 */

export class Enemy extends Element {
    constructor(startX, startY, endX, endY, speedX, speedY, number) {
        super(startX, startY, 60, 60);
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.speedX = speedX;
        this.speedY = speedY;
        this.number = number;

        this.direction = 1; // 1 for right, -1 for left
        this.isRunning = true;

        this.currentDistance = 0;
        this.totalDistance = Math.abs(this.endX - this.startX);

        this.runningRightSprites = [];
        this.runningLeftSprites = [];
        this.ready = false;

        this.SPRITES_FOLDER_PATH = "ressources/images/game/level/characters/enemy/" + number + "/";

        this.runningSpriteIndex = 0;
        this.runningSpriteTimer = 0;
        this.RUNNING_SPRITE_INTERVAL = 5;
        this.RUNNING_SPRITE_QUANTITY = 16;

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
            const moveX = this.direction * this.speedX * modifier;
            const moveY = this.direction * this.speedY * modifier;
            this.x += moveX;
            this.y += moveY;
            this.currentDistance += Math.abs(moveX);
            if (this.currentDistance >= this.totalDistance) {
                this.x = this.endX;
                this.reverseDirection();
                this.currentDistance = 0;
            }
            this.isRunning = true;
        } else {
            this.isRunning = false;
        }
        this.updateSprite();
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
        if (this.ready) {
            if (this.direction === 1) {
                if (this.isRunning) {
                    ctx.drawImage(
                        this.runningRightSprites[this.runningSpriteIndex],
                        this.x,
                        this.y,
                        this.width,
                        this.height
                    );
                }
            } else {
                if (this.isRunning) {
                    ctx.drawImage(
                        this.runningLeftSprites[this.runningSpriteIndex],
                        this.x,
                        this.y,
                        this.width,
                        this.height
                    );
                }
            }
        }
    }

    hit(pirate) {
        --pirate.nbLives;
        pirate.resetPosition();
    }

}