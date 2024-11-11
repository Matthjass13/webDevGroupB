

export class Pirate {

    constructor(x, y) {

        this.speed = 256;
        this.x = x;
        this.y = y;
        this.direction = 1; // Right (-1 for left)
        this.isRunning = false;

        this.idleRightSprites = [];
        this.idleLeftSprites = [];
        this.runningRightSprites = [];
        this.runningLeftSprites = [];
        this.ready = false;
        this.SPRITES_FOLDER_PATH = `ressources/images/game/character/`;

        this.idleSpriteIndex = 0;
        this.idleSpriteTimer = 0;
        this.IDLE_SPRITE_INTERVALLE = 20;

        this.runningSpriteIndex = 0;
        this.runningSpriteTimer = 0;
        this.RUNNING_SPRITE_INTERVALLE = 10;
        this.RUNNING_SPRITE_WIDTH = 70;
        this.RUNNING_SPRITE_HEIGHT = 76;

        this.loadSprites();
    }

    loadSprites() {
        for (let i = 0; i < 2; i++) {
            this.idleRightSprites[i] = new Image();
            this.idleRightSprites[i].src = this.SPRITES_FOLDER_PATH + `pirateIdleRight${i}.png`;
          
        }
        for (let i = 0; i < 2; i++) {
            this.idleLeftSprites[i] = new Image();
            this.idleLeftSprites[i].src = this.SPRITES_FOLDER_PATH + `pirateIdleLeft${i}.png`;
           
        }
        for (let i = 0; i < 4; i++) {
            this.runningRightSprites[i] = new Image();
            this.runningRightSprites[i].src = this.SPRITES_FOLDER_PATH + `pirateRunningRight${i}.png`;
          
        }
        for (let i = 0; i < 4; i++) {
            this.runningLeftSprites[i] = new Image();
            this.runningLeftSprites[i].src = this.SPRITES_FOLDER_PATH + `pirateRunningLeft${i}.png`;
        }
        this.ready=true;
    }

    update(modifier, keysDown) {
        this.updatePosition(modifier, keysDown);
        this.updateSprite();
    }

    updatePosition(modifier, keysDown) {
        this.isRunning = false;

        if (38 in keysDown) { // Up
            this.y -= this.speed * modifier;
            this.isRunning = true;
        }
        if (40 in keysDown) { // Down
            this.y += this.speed * modifier;
            this.isRunning = true;
        }
        if (37 in keysDown) { // Left
            this.x -= this.speed * modifier;
            this.direction = -1;
            this.isRunning = true;
        }
        if (39 in keysDown) { // Right
            this.x += this.speed * modifier;
            this.direction = 1;
            this.isRunning = true;
        }
        
    }

    updateSprite() {
        if (this.isRunning) {
            this.runningSpriteTimer = (this.runningSpriteTimer + 1) % this.RUNNING_SPRITE_INTERVALLE;
            if (this.runningSpriteTimer === 0) {
                this.runningSpriteIndex = (this.runningSpriteIndex + 1) % 4;
            }
        } else {
            this.idleSpriteTimer = (this.idleSpriteTimer + 1) % this.IDLE_SPRITE_INTERVALLE;
            if (this.idleSpriteTimer === 0) {
                this.idleSpriteIndex = (this.idleSpriteIndex + 1) % 2;
            }
        }
    }

    render(ctx) {
        if (this.ready) {
            switch (this.direction) {
                case -1:
                    if (this.isRunning)
                        ctx.drawImage(this.runningLeftSprites[this.runningSpriteIndex], this.x, this.y);
                    else
                        ctx.drawImage(this.idleLeftSprites[this.idleSpriteIndex], this.x, this.y);
                    break;
                case 1:
                    if (this.isRunning)
                        ctx.drawImage(this.runningRightSprites[this.runningSpriteIndex], this.x, this.y);
                    else
                        ctx.drawImage(this.idleRightSprites[this.idleSpriteIndex], this.x, this.y);
                    break;
            }
        }
    }



  
    
}
