import { Element } from "./Element.js";

/**
 * This class represents the information about the character :
 * money, number of lives...
 * it is displayed on the top of the level.
 * @see Element
 * @see Level
 * @see Coin
 * @author Matthias Gaillard
 */
export class ScoreBoard extends Element {
    constructor(x, y, pirate) {

        super(x, y, 330, 60);

        this.TOTAL_LIVES = pirate.nbLives;
        this.nbLives = this.TOTAL_LIVES;
        this.nbCoins = pirate.nbCoins;

        this.hasKey = false;

        this.loadSprites();

    }

    loadSprites() {
        this.FOLDER = "ressources/images/game/level/scoreBoard/";
        this.image = new Image();
        this.image.src = this.FOLDER + "background.png";
        this.HEART_IMAGE = new Image();
        this.HEART_IMAGE.src = this.FOLDER + "heart.png";
        this.COIN_BAG_IMAGE = new Image();
        this.COIN_BAG_IMAGE.src = this.FOLDER + "coinBag.png";
        this.KEY_IMAGE = new Image();
        this.KEY_IMAGE.src = this.FOLDER + "key.png";
    }

    update(pirate, key) {
        if(!key===null && key.collected)
            this.hasKey = true;
        this.nbLives = pirate.nbLives;
        this.nbCoins = pirate.nbCoins;
    }

    draw(ctx) {

        super.draw(ctx);

        ctx.font = '50px Arial';
        ctx.fillStyle = "#FBD705";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.drawImage(this.COIN_BAG_IMAGE, this.x + 5, this.y + 5,
                      this.COIN_BAG_IMAGE.width, this.COIN_BAG_IMAGE.height*(this.nbCoins)/10);
        ctx.fillText(this.nbCoins, this.x + 85, this.y + 35);

        for(let i= 0; i<this.nbLives; ++i)
            ctx.drawImage(this.HEART_IMAGE, this.x+120+(this.HEART_IMAGE.width+5)*i, this.y+10);

        if(this.hasKey)
            ctx.drawImage(this.KEY_IMAGE, this.x + 290, this.y+10, this.KEY_IMAGE.width, this.KEY_IMAGE.height);

    }

    reset() {
        this.nbLives = this.TOTAL_LIVES;
        this.nbCoins = 0;
        this.hasKey = false;
    }
    
}
