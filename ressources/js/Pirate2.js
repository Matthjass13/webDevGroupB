// DONT USE NOW

import {Pirate} from "./Pirate";

/**
 * This class represents the second playable character
 * He is smaller and faster,
 * but slows down each he gets a coin.
 * @see Pirate
 * @author Matthias Gaillard
 */
export class Pirate2 extends Pirate {
    constructor(x, y) {
        super(x, y,
            1,
            450,
            3,
            26,
            2,
            58,
            58,
            14);


        this.loadSprites();
    }
    gainWeight(coin) {
        this.speed -= coin.WEIGHT;
    }

}
