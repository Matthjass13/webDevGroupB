export class Key {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20; // Largeur de la clé
    this.height = 20; // Hauteur de la clé
    this.collected = false;
  }

  draw(ctx) {
    if (!this.collected) {
      ctx.fillStyle = "#FFD700"; // Couleur or pour la clé
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
