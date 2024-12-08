import { wallsLevel1, defaultWalls } from "../elements/Wall.js";
import { Key } from "../elements/Key.js";
import { Door } from "../elements/Door.js";
import {Enemy} from "../characters/Enemy.js";
import {Level} from "./Level.js";

/**
 * This class displays the level 1.
 * @author Alexis Jordan
 * @see Level
 */
export class Level1 extends Level {
  constructor(ctx, game, selectedCharacter) {

    super(ctx, game, selectedCharacter, 1,
        new Key(230, 420),
        new Door(340, 103),
        new Enemy(300, 180, 600, 180, 120, 0)
    );

    this.pirate.x = this.WIDTH - 100;
    this.pirate.y = this.HEIGHT - 100;

    this.walls = [...defaultWalls, ...wallsLevel1];
    this.DOOR_WALL_X = 340;
    this.DOOR_WALL_Y = 110;

  }
  reset() {
    super.reset();
    this.walls = [...defaultWalls, ...wallsLevel1]; // Reset the walls to default
  }

}
