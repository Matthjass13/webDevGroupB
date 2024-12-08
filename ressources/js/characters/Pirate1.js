// DONT USE NOW

import {Pirate} from "./Pirate";

/**
 * This class represents the first playable character.
 * @see Pirate
 * @author Matthias Gaillard
 */
export class Pirate1 extends Pirate {
    constructor(x, y) {
        super(x, y,
            0,
            250,
            20,
            2,
            10,
            70,
            76,
            4);


        this.loadSprites();
    }


}