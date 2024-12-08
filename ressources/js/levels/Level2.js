import { wallsLevel2, defaultWalls } from "../elements/Wall.js";
import { Key } from "../elements/Key.js";
import { Door } from "../elements/Door.js";
import { Enemy } from "../characters/Enemy.js";
import { Level } from "./Level.js";

/**
 * This class displays the level 2.
 * @author Alexis Jordan
 * @see Level
 */
export class Level2 extends Level {
  constructor(ctx, game, selectedCharacter) {

    super(ctx, game, selectedCharacter, 2,
        new Key(50, 400),
        new Door(405, 305, 44, 44),
        new Enemy(100, 100, 600, 600, 120, 0)
    );

    this.walls = [...defaultWalls, ...wallsLevel2];
    this.DOOR_WALL_X = 405;
    this.DOOR_WALL_Y = 305;

  }
  reset() {
    super.reset();
    this.walls = [...defaultWalls, ...wallsLevel2]; // Reset the walls to default
  }

}