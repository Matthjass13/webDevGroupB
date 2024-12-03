import { Menu } from "./Menu.js";
import { Level } from "./Level.js";
import { Level2 } from "./Level2.js";
import { Level3 } from "./Level3.js";
import { Level4 } from "./Level4.js";

/**
 * This class contains the whole game
 * and is used to switch between menu and level screen
 * @see Menu
 * @see Level
 * @author Matthias Gaillard
 * @contributor Alexis Jordan
 */
export class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.currentScene = null;
    this.menu = new Menu(ctx, this);
  }

  switchTo(sceneName, selectedCharacter = 0) {
    if (this.currentScene && this.currentScene.stop) this.currentScene.stop();
  
    if (sceneName === "Menu") {
      this.currentScene = this.menu;
    } else if (sceneName === "Level") {
      this.currentScene = new Level(this.ctx, this, selectedCharacter);
    }
  
    if (this.currentScene && this.currentScene.start) this.currentScene.start();
  }  
}
