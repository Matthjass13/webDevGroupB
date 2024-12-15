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
    computeDistanceTo(element) {
        return Math.sqrt(Math.pow(this.x - element.x, 2) + Math.pow(this.y - element.y, 2));
    }

    playSound() {
        this.soundEffect.play();
    }

}