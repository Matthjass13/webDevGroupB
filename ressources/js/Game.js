import { Menu } from "./Menu.js";
import { Level } from "./Level.js";

/**
 * This class contains the whole game
 * and is used to switch between menu and level screen
 * @author Matthias Gaillard
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
