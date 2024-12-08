/**
 * This class represents any game element,
 * which has a size and a position.
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

}