import { wallsLevel3, defaultWalls } from "../elements/Wall.js";
import { Key } from "../elements/Key.js";
import { Door } from "../elements/Door.js";
import { Enemy } from "../characters/Ennemy.js";
import { Level } from "./Level.js";

/**
 * This class displays the level 1.
 * @author Alexis Jordan
 * @see Level
 */
export class Level3 extends Level {
  constructor(ctx, game, selectedCharacter) {

    super(ctx, game, selectedCharacter, 3,
        new Key(500, 280),
        new Door(195, 85),
        new Enemy(300, 200, 600, 200, 120, 0)
    );

    this.walls = [...defaultWalls, ...wallsLevel3];
    this.DOOR_WALL_X = 195;
    this.DOOR_WALL_Y = 85;

  }
  reset() {
    super.reset();
    this.walls = [...defaultWalls, ...wallsLevel3]; // Reset the walls to default
  }

  /*
  update(modifier) {

    super.update(modifier);

    // Check if the wall is a one-way wall (traversable from inside only)
    const isOneWayWallDown = wall.x === 270 && wall.y === 160; //haut de la grosse plate forme

    if (isOneWayWallDown) {
      // Allow passing through the wall if the pirate is above the wall
      if (this.pirate.previousY > wall.y + wall.height) {
        //Don't continue to update the walls
      }
    }

  }*/


}






