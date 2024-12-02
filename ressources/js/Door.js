/**
 * This class represents a door.
 * It can be open by a key.
 * @see Key
 * @author Matthias Gaillard
 */

export class Door {
    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.WIDTH = 78;
        this.HEIGHT = 96;
        this.state="closed";
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

    }

    draw(ctx) {
        this.update();
        ctx.drawImage(this.sprites[this.currentSpriteIndex], this.x, this.y, this.WIDTH, this.HEIGHT);
    }
    open() {
        this.state="opening";
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