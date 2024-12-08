import { wallsLevel4, defaultWalls } from "../elements/Wall.js";
import { Key } from "../elements/Key.js";
import { Door } from "../elements/Door.js";
import { Enemy } from "../characters/Enemy.js";
import { Level } from "./Level.js";

/**
 * This class displays the level 4.
 * @author Alexis Jordan
 * @see Level
 */
export class Level4 extends Level {
  constructor(ctx, game, selectedCharacter) {

    super(ctx, game, selectedCharacter, 1,
        new Key(500, 350),
        new Door(400, 150),
        new Enemy(300, 200, 600, 200, 120, 0)
    );

    this.walls = [...defaultWalls, ...wallsLevel4];
    this.DOOR_WALL_X = 400;
    this.DOOR_WALL_Y = 150;

  }
  reset() {
    super.reset();
    this.walls = [...defaultWalls, ...wallsLevel4]; // Reset the walls to default
  }

  update(modifier) {
    const allCoinsCollected = this.coins.every((coin) => coin.collected);
    if (allCoinsCollected && this.key.collected) {
      console.log("hello");
      this.win();
    }
    else
      super.update(modifier);
  }

  win() {
    this.togglePause();
    this.ctx.fillStyle = "#000000";
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("You won !", this.ctx.canvas.width / 2, 200);
  }

}






