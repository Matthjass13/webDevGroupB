import { Button } from "./Button.js";
import { Level } from "./Level.js";

/**
 * This class displays the title screen of the game.
 * From there, we can access the game description and rules.
 * We can also launch a level, which is represented by its own class.
 * @author Elia Pfammatter, Matthias Gaillard
 */
export class Menu {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;

    this.backgroundImage = new Image();
    this.backgroundImage.src =
      "ressources/images/game/level/background/backgroundMenu.png";
    this.backgroundImage.onload = () => {
      this.ctx.drawImage(
        this.backgroundImage,
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height
      );
    };
    this.logoImage = new Image();
    this.logoImage.src = "ressources/images/game/menu/logo.png";
    this.logoImage.onload = () => {
      this.start();
    };

    this.gameButton = new Button(
      this.ctx,
      "Start Game",
      ctx.canvas.width / 2 - 65,
      350,
      () => this.game.switchTo("Level")
    );
    this.descriptionButton = new Button(
      this.ctx,
      "Description",
      ctx.canvas.width / 2 - 65,
      390,
      () => this.drawDescription()
    );
    this.rulesButton = new Button(
      this.ctx,
      "Rules",
      ctx.canvas.width / 2 - 65,
      430,
      () => this.drawRules()
    );
  }

  start() {
    this.drawTitleScreen();
  }

  stop() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawBasis() {
    this.ctx.drawImage(
      this.backgroundImage,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
    this.gameButton.draw();
    this.rulesButton.draw();
    this.descriptionButton.draw();
  }
  drawTitleScreen() {
    this.drawBasis();
    const logoWidth = 300;
    const logoHeight = 300;
    const logoX = (this.ctx.canvas.width - logoWidth) / 2;
    const logoY = 20;
    this.ctx.drawImage(this.logoImage, logoX, logoY, logoWidth, logoHeight);
  }
  drawRules() {
    this.drawBasis();
    this.drawCenteredText([
      "Press the arrows keys to move around",
      "Press P to pause the game",
      "Press R to reset the game",
      "Press B to go back to the title screen",
    ]);
  }
  drawDescription() {
    this.drawBasis();
    this.drawCenteredText([
      "In this web-based game you are a pirate trapped in a series of mazes.",
      "Your goal is to find the key hidden within each maze and use it to unlock the treasure chest which leads into the next level.",
      "Along the way through the maze, you must avoid enemies, which can send you back to the start of the maze.",
      "With each level the enemies become more dangerous, and the maze becomes more complex.",
    ]);
  }
  drawCenteredText(textArray) {
    this.ctx.fillStyle = "#000000";
    this.ctx.font = "20px 'Press Start 2P'";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "top";

    let textY = 100;
    const lineHeight = 25;
    const maxWidth = this.ctx.canvas.width - 40;

    textArray.forEach((line) => {
      if (this.ctx.measureText(line).width > maxWidth) {
        const words = line.split(" ");
        let currentLine = "";
        words.forEach((word) => {
          const testLine = currentLine + word + " ";
          const testWidth = this.ctx.measureText(testLine).width;
          if (testWidth > maxWidth) {
            this.ctx.fillText(currentLine, this.ctx.canvas.width / 2, textY);
            currentLine = word + " ";
            textY += lineHeight;
          } else {
            currentLine = testLine;
          }
        });
        this.ctx.fillText(currentLine, this.ctx.canvas.width / 2, textY);
        textY += lineHeight;
      } else {
        this.ctx.fillText(line, this.ctx.canvas.width / 2, textY);
        textY += lineHeight;
      }
    });
  }
}
