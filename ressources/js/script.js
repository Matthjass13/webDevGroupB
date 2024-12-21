import { Game } from "./Game.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);
game.switchTo("Menu");

/**
 * Thanks to the following code,
 * the page won't scroll when the player move his character down or up
 */
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp")
        event.preventDefault();
});
