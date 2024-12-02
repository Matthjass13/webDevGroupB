/**
 * This class represents a coin,
 * that the player should collect.
 * @author Matthias Gaillard
 */
export class Coin {

    static WIDTH = 25;
    static HEIGHT = 25;
    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.collected=false;

        this.WEIGHT = 15;


        this.SPRITE_QUANTITY = 6;
        this.sprite = [];

        this.ready = false;
        for (let i = 0; i < this.SPRITE_QUANTITY; i++) {
            this.sprite[i] = new Image();
            this.sprite[i].src = `ressources/images/game/level/elements/coins/${i}.png`;
        }
        this.ready = true;

        this.currentSpriteIndex = 0;
        this.SPRITE_INTERVALLE = 5;
        this.spriteTimer = 0;

        this.sound = new Audio("ressources/audio/soundEffects/coinCollected.wav");
        this.sound.volume=0.2;

    }
    draw(ctx) {
        if(!this.collected) {
            this.updateSprite();
            ctx.drawImage(this.sprite[this.currentSpriteIndex], this.x, this.y, Coin.WIDTH, Coin.HEIGHT);
        }
    }

    updateSprite() {
        this.spriteTimer = (this.spriteTimer + 1) % this.SPRITE_INTERVALLE;
        if (this.spriteTimer === 0) {
            this.currentSpriteIndex = (this.currentSpriteIndex + 1) % this.SPRITE_QUANTITY;
        }
    }
    
}
