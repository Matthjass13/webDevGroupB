const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
let heroReady = false;
let heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

let hero = {
	speed: 256 // movement in pixels per second
};





// Handle keyboard controls
let keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
    console.log(keysDown);
}, false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


// Reset the game when the player catches a monster
let reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
};



// Update game objects
let update = function (modifier) {
	if (38 in keysDown)
		hero.y -= hero.speed * modifier;
	if (40 in keysDown)
		hero.y += hero.speed * modifier;
	if (37 in keysDown)
		hero.x -= hero.speed * modifier;
	if (39 in keysDown)
		hero.x += hero.speed * modifier;
};

let render = function () {
	if (bgReady)
		ctx.drawImage(bgImage, 0, 0);
	if (heroReady)
		ctx.drawImage(heroImage, hero.x, hero.y);
};

let main = function () {
	let now = Date.now();
	let delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);
};

let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

let then = Date.now();
reset();
main();

