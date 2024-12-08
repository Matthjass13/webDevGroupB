import { Menu } from "./menu/Menu.js";

import { Level0 } from "./levels/Level0.js";
import { Level1 } from "./levels/Level1.js";
import { Level2 } from "./levels/Level2.js";
import { Level3 } from "./levels/Level3.js";
import { Level4 } from "./levels/Level4.js";

/**
 * This class contains the whole game
 * and is used to switch between menu and level screen
 * @see Menu
 * @see Level1
 * @author Matthias Gaillard
 * @contributor Alexis Jordan
 */
export class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.currentScene = null;
    this.menu = new Level0(this.ctx, this, 1);
    //this.menu = new Menu(ctx, this);
  }

  switchTo(sceneType, levelNumber = 1, selectedCharacter= 1) {
    if (this.currentScene && this.currentScene.stop)
      this.currentScene.stop();
    if (sceneType === "Menu")
      this.currentScene = this.menu;
    else {
      if (sceneType === "Level") {
        switch (levelNumber) {
          case 0:
            this.currentScene = new Level0(this.ctx, this, selectedCharacter);
            break;
          case 1:
            this.currentScene = new Level1(this.ctx, this, selectedCharacter);
            break;
          case 2:
            this.currentScene = new Level2(this.ctx, this, selectedCharacter);
            break;
          case 3:
            this.currentScene = new Level3(this.ctx, this, selectedCharacter);
            break;
          case 4:
            this.currentScene = new Level4(this.ctx, this, selectedCharacter);
            break;
        }
      }
    }

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    if (this.currentScene && this.currentScene.start) {
      this.currentScene.start();
    }

    }

}
