import { Element } from "./Element.js";

/**
 * This class represents a key.
 * It will appear in the level,
 * but also in the scoreBoard once the player has collected it.
 * @see Element
 * @see ScoreBoard
 * @author Alexis Jordan
 */
export class Key extends Element {
    constructor(x, y, width= 20, height = 20) {
        super(x, y, width, height, true);

        this.image = new Image();
        this.image.src = "ressources/images/game/level/elements/key.png";
    }

    draw(ctx) {
        if(!this.collected)
            super.draw(ctx);
    }

}

