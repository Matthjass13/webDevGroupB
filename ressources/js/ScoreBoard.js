

export class ScoreBoard {

    constructor(x, y) {

        this.nbLives = 3;
        this.nbPieces = 0;
        
        this.x = x;
        this.y = y;

        this.width = 300;
        this.height = 60;

        this.loadSprites();
    }

    loadSprites() {
        this.BACKGROUND_IMAGE = new Image();
        this.BACKGROUND_IMAGE.src = `ressources/images/game/background/scoreBoardBackground.png`;
        this.HEART_IMAGE = new Image();
        this.HEART_IMAGE.src = `ressources/images/game/background/heart.png`;
        this.COIN_IMAGE = new Image();
        this.COIN_IMAGE.src = `ressources/images/game/background/coin.png`;
    }

    update(modifier, keysDown) {
        


    }

    render(ctx) {  
        ctx.font = '40px Arial'; 
        ctx.fillStyle = 'white';         
        ctx.textAlign = 'center';       
        ctx.textBaseline = 'middle'; 
    

        ctx.drawImage(this.BACKGROUND_IMAGE, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.COIN_IMAGE, this.x + 5, this.y + 5);
        ctx.fillText(this.nbPieces, this.x + 50, this.y + 50);
    }



  
    
}
