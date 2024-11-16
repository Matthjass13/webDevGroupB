import { Menu } from "./Menu.js";
import { Level } from "./Level.js";

/**
 * This class contains the whole game
 * and is used to switch between menu and level screen
 * @author Matthias Gaillard
 */
export class Game {
    constructor(ctx) {
        this.currentScene = null;
        this.menu = new Menu(ctx, this);
        this.level = new Level(ctx, this);
    }

    switchTo(sceneName) {
        if (this.currentScene && this.currentScene.stop)
            this.currentScene.stop();

        if (sceneName === "Menu")
            this.currentScene = this.menu;
        else if (sceneName === "Level")
            this.currentScene = this.level;

        if (this.currentScene && this.currentScene.start)
            this.currentScene.start();
    }

}
