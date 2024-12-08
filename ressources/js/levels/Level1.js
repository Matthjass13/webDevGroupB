import { wallsLevel1, defaultWalls } from "../elements/Wall.js";
import { Key } from "../elements/Key.js";
import { Door } from "../elements/Door.js";
import {Enemy} from "../characters/Ennemy.js";
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
        new Enemy(300, 200, 600, 200, 120, 0)
    );

    this.walls = [...defaultWalls, ...wallsLevel1];
    this.DOOR_WALL_X = 340;
    this.DOOR_WALL_Y = 110;

  }
  reset() {
    super.reset();
    this.walls = [...defaultWalls, ...wallsLevel1]; // Reset the walls to default
  }

}
