import { wallsLevel1, defaultWalls } from "../elements/Wall.js";
import { Key } from "../elements/Key.js";
import { Door } from "../elements/Door.js";
import {Level} from "./Level.js";

/**
 * This class displays the level 1.
 * We introduce they key and door mechanism.
 * @see Level
 * @see Key
 * @see Door
 * @author Alexis Jordan
 */
export class Level1 extends Level {
  constructor(ctx, game, selectedCharacter) {

    super(ctx, game, selectedCharacter, 1,
        new Key(230, 420),
        new Door(340, 103)
    );

    this.walls = [...defaultWalls, ...wallsLevel1];
    this.DOOR_WALL_X = 340;
    this.DOOR_WALL_Y = 110;

  }

  /**
   * Overrides the updateEnemy method of the Level superclass,
   * because there is no enemy.
   * @param modifier
   */
  updateEnnemy(modifier) {
  }

  /**
   * Overrides the draw method of the Level superclass,
   * because we do not want to draw the enemy,
   * because there is no enemy.
   */
  draw() {
    this.ctx.drawImage(this.bgImage, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.scoreBoard.draw(this.ctx);
    this.door.draw(this.ctx);
    for (let coin of this.coins) coin.draw(this.ctx);
    this.pirate.render(this.ctx);
    this.key.draw(this.ctx);
    for (let wall of this.walls) {
      wall.draw(this.ctx);
    }

    if(this.isGameFinished) {
      this.displayGameOverMessage();
    }
  }

  reset() {
    super.reset();
    this.pirate.reset();
    this.walls = [...defaultWalls, ...wallsLevel1];
  }

}
