const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

level = new Level(canvas, ctx);

// Handle keyboard controls
keysDown = {};
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
main();



class Level {

    constructor(canvas, ctx) {
        this.width = canvas.width;
        this.height = canvas.height
        this.ctx=ctx;
        this.bgImage = new Image();
        this.bgImage.src = "ressources/images/game/background/" + name + ".jpg";

        this.pirate = new Pirate(this.width, this.height);

        
    }

    
    // Update game objects
    update(modifier) {
        this.pirate.update(modifier, keysDown);
    };

    // Render the game
    render(ctx) {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.drawImage(this.bgImage, 0, 0);
        this.pirate.render(ctx);
    };

    main() {

        let now = Date.now();
        let delta = now - then;
        update(delta / 1000);
        render();
        then = now;
        requestAnimationFrame(play);
    };

}

