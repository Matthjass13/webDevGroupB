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

  switchTo(sceneName, levelNumber = 1, selectedCharacter=0) {
    console.log(`Switching to scene: ${sceneName}, level: ${levelNumber}`);
    if (this.currentScene && this.currentScene.stop) this.currentScene.stop();

    if (sceneName === "Menu") this.currentScene = this.menu;
    else if (sceneName === "Level") {
      if (levelNumber === 1) {
        console.log("hello");
        this.currentScene = new Level(this.ctx, this, selectedCharacter);
      }
      else if (levelNumber === 2)
        this.currentScene = new Level2(this.ctx, this, selectedCharacter);
      else if (levelNumber === 3)
        this.currentScene = new Level3(this.ctx, this, selectedCharacter);
      else if (levelNumber === 4)
        this.currentScene = new Level4(this.ctx, this, selectedCharacter);
    }

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    if (this.currentScene && this.currentScene.start) {
      console.log("Starting new scene");
      this.currentScene.start();
    }
  }
}
