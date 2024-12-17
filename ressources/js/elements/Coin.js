import { Element } from "./Element.js";

/**
 * This class represent the coins the player
 * has to collect to finish the game.
 * @author Matthias Gaillard
 * @see Element
 */
export class Coin extends Element {

    static WIDTH = 25;
    static HEIGHT = 25;
    constructor(x, y) {

        super(x, y, 25, 25, true);

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

        this.soundEffect = new Audio(
            "ressources/audio/soundEffects/coinCollected.wav");
        this.soundEffect.volume = 0.05;


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
