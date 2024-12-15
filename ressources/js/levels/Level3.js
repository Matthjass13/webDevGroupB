import { wallsLevel3, defaultWalls } from "../elements/Wall.js";
import { Key } from "../elements/Key.js";
import { Door } from "../elements/Door.js";
import { Enemy } from "../characters/Enemy.js";
import { Level } from "./Level.js";

/**
 * This class displays the level 3.
 * This is the last level.
 * When finished, the player wins.
 * @see Level
 * @author Alexis Jordan
 */
export class Level3 extends Level {
  constructor(ctx, game, selectedCharacter) {

    super(ctx, game, selectedCharacter, 3,
        new Key(500, 280),
        new Door(195, 65, 58, 60),
        new Enemy(500, 50, 720, 400, 120, 120, 0)
    );

    this.walls = [...defaultWalls, ...wallsLevel3];
    this.DOOR_WALL_X = 195;
    this.DOOR_WALL_Y = 85;

  }
  reset() {
    super.reset();
    this.walls = [...defaultWalls, ...wallsLevel3]; // Reset the walls to default
    this.pirate.reset();
  }

  update(modifier) {
    const allCoinsCollected = this.coins.every((coin) => coin.collected);
    if (allCoinsCollected && this.key.collected) {
      this.endGame(true);
    }
    else
      super.update(modifier);
  }

}






