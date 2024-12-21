/**
 * This class represents an abstract game element,
 * which has a size and a position.
 * @see Coin
 * @see Door
 * @see Key
 * @see ScoreBoard
 * @see Wall
 * @see Pirate
 * @see Enemy
 * @author Matthias Gaillard
 */
export class Element {
    constructor(x, y, width, height, collectible= false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        if(collectible)
            this.collected = false;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    playSound() {
        this.soundEffect.play();
    }

}