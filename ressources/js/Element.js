/**
 * This class represents a drawable element.
 * (Key, door, coin, button, scoreBoard)
 * @author Matthias Gaillard
 */

export class Element {

    static WIDTH;
    static HEIGHT;
    constructor(x, y, SPRITES_FOLDER, SPRITE_QUANTITY, SPRITE_INTERVALLE) {
        this.x=x;
        this.y=y;
        this.SPRITES_FOLDER = SPRITES_FOLDER;
        this.SPRITE_QUANTITY = SPRITE_QUANTITY;
        this.SPRITE_INTERVALLE = SPRITE_INTERVALLE;

        this.sprites = [];
        this.ready = false;
        for (let i = 0; i < this.SPRITE_QUANTITY; i++) {
            this.sprites[i] = new Image();
            this.sprites[i].src = this.SPRITES_FOLDER+i+".png";
        }
        this.ready = true;

        this.currentSpriteIndex = 0;
        this.spriteTimer = 0;
    }


    draw(ctx) {
    }
    update() {
    }

}