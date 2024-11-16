
/**
 * This class represents the information about the character :
 * money, number of lives...
 * it is displayed on the top of the level.
 * @author Matthias Gaillard
 */
export class ScoreBoard {
    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.width = 300;
        this.height = 60;


        this.TOTAL_LIVES = 3;
        this.nbLives = this.TOTAL_LIVES;
        this.nbCoins = 0;

        this.FOLDER = "ressources/images/game/level/scoreBoard/";
        this.loadSprites();
    }

    loadSprites() {
        this.BACKGROUND_IMAGE = new Image();
        this.BACKGROUND_IMAGE.src = this.FOLDER + "background.png";
        this.HEART_IMAGE = new Image();
        this.HEART_IMAGE.src = this.FOLDER + "heart.png";
        this.COIN_BAG_IMAGE = new Image();
        this.COIN_BAG_IMAGE.src = this.FOLDER + "coinBag.png";
    }


    draw(ctx) {
        ctx.font = '50px Arial';
        ctx.fillStyle = "#FBD705";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.drawImage(this.BACKGROUND_IMAGE, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.COIN_BAG_IMAGE, this.x + 5, this.y + 5,
                      this.COIN_BAG_IMAGE.width, this.COIN_BAG_IMAGE.height*(this.nbCoins)/10);
        ctx.fillText(this.nbCoins, this.x + 85, this.y + 35);

        for(let i= 0; i<this.nbLives; ++i) {
            ctx.drawImage(this.HEART_IMAGE, this.x+120+(this.HEART_IMAGE.width+5)*i, this.y+10);
        }
    }


    reset() {
        this.nbLives = this.TOTAL_LIVES;
        this.nbCoins = 0;
    }
    
}
