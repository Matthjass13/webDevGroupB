import { Level } from "./Level.js";
import {Key} from "../elements/Key.js";
import {Door} from "../elements/Door.js";
import {Enemy} from "../characters/Enemy.js";

/**
 * This class displays the level 0.
 * @author Matthias Gaillard
 * @see Level
 */
export class Level0 extends Level {
	constructor(ctx, game, selectedCharacter) {

		super(ctx, game, selectedCharacter, 0);

		this.walls=null;

		this.pirate.x = this.WIDTH - 100;
		this.pirate.y = this.HEIGHT - 100;

	}

	update(modifier) {
		this.updatePirate(modifier);
		this.updateScoreBoard();
	}

	draw() {
		this.ctx.drawImage(this.bgImage, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.scoreBoard.draw(this.ctx);
		for (let coin of this.coins) coin.draw(this.ctx);
		this.pirate.render(this.ctx);
	}

}