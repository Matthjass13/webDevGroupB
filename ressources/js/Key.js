/**
 * This class represents a key.
 * It will appear in the level,
 * but also in the scoreBoard once the player has collected it.
 * @see ScoreBoard
 * @author Alexis Jordan
 */
export class Key {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20; // Largeur de la clé
    this.height = 20; // Hauteur de la clé
    this.collected = false;

    this.keyImage = new Image();
    this.keyImage.src = "ressources/images/game/level/elements/key.png";
  }

  draw(ctx) {
    if (!this.collected)
      ctx.drawImage(this.keyImage, this.x, this.y, this.width, this.height);
  }

}
