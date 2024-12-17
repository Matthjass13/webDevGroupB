import { Element } from "./Element.js";

/**
 * This class represents a door.
 * It can be opened by a key.
 * @see Element
 * @see Key
 * @author Matthias Gaillard
 */
export class Door extends Element {
    constructor(x, y, width= 39, height = 44) {

        super(x, y, width, height);

        this.state = "closed";
        this.SPRITE_QUANTITY = 6;
        this.sprites = [];

        this.ready = false;
        for (let i = 0; i < this.SPRITE_QUANTITY; i++) {
            this.sprites[i] = new Image();
            this.sprites[i].src = `ressources/images/game/level/elements/door/${i}.png`;
        }
        this.ready = true;

        this.currentSpriteIndex = 0;
        this.SPRITE_INTERVALLE = 5;
        this.spriteTimer = 0;

        this.soundEffect = new Audio(
            "ressources/audio/soundEffects/doorOpened.wav");

    }

    draw(ctx) {
        this.update();
        ctx.drawImage(this.sprites[this.currentSpriteIndex], this.x, this.y, this.width, this.height);
    }
    open() {
        if(this.state==="closed") {
            this.state="opening";
            this.playSound();
        }
    }
    update() {
        if(this.state === "opening") {
            this.spriteTimer = (this.spriteTimer + 1) % this.SPRITE_INTERVALLE;
            if (this.spriteTimer === 0)
                this.currentSpriteIndex = (this.currentSpriteIndex + 1) % this.SPRITE_QUANTITY;
            if(this.currentSpriteIndex === 5)
                this.state="open";
        }
    }

}