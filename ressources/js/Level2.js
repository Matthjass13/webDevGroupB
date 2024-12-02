import { Pirate } from "./Pirate.js";
import { ScoreBoard } from "./ScoreBoard.js";
import { Coin } from "./Coin.js";
import { wallsLevel2, defaultWalls } from "./wall.js";
import { Key } from "./Key.js";

/**
 * This class represents the second level.
 * @see Level
 * @author Alexis Jordan
 */
export class Level2 {
  constructor(ctx, game) {
    this.ctx = ctx; // Contexte du canvas
    this.game = game; // Instance du jeu
    this.paused = false; // Indicateur de pause
    this.WIDTH = ctx.canvas.width; // Largeur du canvas
    this.HEIGHT = ctx.canvas.height; // Hauteur du canvas

    // Chargement de l'image de fond du niveau
    this.bgImage = new Image();
    this.bgImage.src = "ressources/images/game/level/background/level2.png";

    // Création du pirate (joueur)
    this.pirate = new Pirate(
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2,
      1
    );
    this.scoreBoard = new ScoreBoard(0, 0); // Instance du tableau des scores
    this.keysDown = {}; // Objet pour suivre les touches pressées

    this.then = Date.now(); // Timestamp pour gérer les animations
    this.setupKeyboardListeners(); // Configuration des écouteurs pour les événements clavier

    // Définition du nombre de pièces dans le niveau
    this.NB_COINS = 15;

    // Création des pièces et positionnement aléatoire dans le canvas
    this.coins = new Array(this.NB_COINS);
    this.coins
      .fill()
      .forEach(
        (_, i) =>
          (this.coins[i] = new Coin(
            Math.floor(Math.random() * (this.WIDTH - Coin.WIDTH)),
            Math.floor(Math.random() * (this.HEIGHT - Coin.HEIGHT))
          ))
      );

    // Définition des murs du niveau (murs par défaut + murs spécifiques au niveau 2)
    this.walls = [...defaultWalls, ...wallsLevel2];

    // Ajout de la clé au niveau
    this.key = new Key(50, 400); // Position de la clé
    this.keyImage = new Image();
    this.keyImage.src = "ressources/images/game/level/elements/key.png"; // Image de la clé
  }

  // Méthode pour démarrer le niveau
  start() {
    this.paused = false;
    this.play();
  }

  // Méthode pour arrêter le niveau
  stop() {
    this.paused = true;
    this.clear();
  }

  // Configuration des écouteurs pour les événements clavier
  setupKeyboardListeners() {
    addEventListener(
      "keydown",
      (e) => {
        this.keysDown[e.keyCode] = true;
        if (e.key === "p" || e.key === "P") this.togglePause();
        if (e.key === "b" || e.key === "B") this.game.switchTo("Menu");
        if (e.key === "r" || e.key === "R") this.reset();
      },
      false
    );

    addEventListener(
      "keyup",
      (e) => {
        delete this.keysDown[e.keyCode];
      },
      false
    );
  }

  // Mise à jour de l'état du niveau
  update(modifier) {
    // Mise à jour de la position du pirate en fonction de l'entrée utilisateur
    this.pirate.update(modifier, this.keysDown);
    this.pirate.x = Math.max(
      0,
      Math.min(
        this.pirate.x,
        this.ctx.canvas.width - this.pirate.RUNNING_SPRITE_WIDTH
      )
    );
    this.pirate.y = Math.max(
      0,
      Math.min(
        this.pirate.y,
        this.ctx.canvas.height - this.pirate.RUNNING_SPRITE_HEIGHT
      )
    );

    // Vérification des collisions entre le pirate et les pièces
    for (let coin of this.coins) {
      if (this.pirate.touch(coin)) {
        coin.collected = true; // Marquer la pièce comme collectée
        ++this.scoreBoard.nbCoins; // Augmenter le nombre de pièces collectées
        this.pirate.gainWeight(coin); // Le pirate gagne du poids en collectant des pièces
      }
    }

    // Détection de la collision avec la clé
    if (!this.key.collected && this.pirate.touchElement(this.key)) {
      this.key.collected = true; // Marquer la clé comme collectée
      // Supprimer le mur de la porte en filtrant le tableau des murs
      this.walls = this.walls.filter(
        (wall) => !(wall.x === 405 && wall.y === 305) // Supprimer le mur de la porte
      );
    }

    // Gestion des collisions entre le pirate et les murs
    for (let wall of this.walls) {
      if (this.pirate.touchElement(wall)) {
        const pirateRight = this.pirate.x + this.pirate.RUNNING_SPRITE_WIDTH;
        const pirateLeft = this.pirate.x;
        const pirateBottom = this.pirate.y + this.pirate.RUNNING_SPRITE_HEIGHT;
        const pirateTop = this.pirate.y;

        const wallRight = wall.x + wall.width;
        const wallLeft = wall.x;
        const wallBottom = wall.y + wall.height;
        const wallTop = wall.y;

        // Déterminer de quel côté la collision s'est produite
        if (
          pirateRight > wallLeft &&
          this.pirate.previousX + this.pirate.RUNNING_SPRITE_WIDTH <= wallLeft
        ) {
          this.pirate.x = wallLeft - this.pirate.RUNNING_SPRITE_WIDTH;
        } else if (
          pirateLeft < wallRight &&
          this.pirate.previousX >= wallRight
        ) {
          this.pirate.x = wallRight;
        } else if (
          pirateBottom > wallTop &&
          this.pirate.previousY + this.pirate.RUNNING_SPRITE_HEIGHT <= wallTop
        ) {
          this.pirate.y = wallTop - this.pirate.RUNNING_SPRITE_HEIGHT;
        } else if (
          pirateTop < wallBottom &&
          this.pirate.previousY >= wallBottom
        ) {
          this.pirate.y = wallBottom;
        }
      }
    }

    // Vérifier si toutes les pièces ont été collectées pour passer au niveau suivant
    const allCoinsCollected = this.coins.every((coin) => coin.collected);
    if (allCoinsCollected && this.key.collected) {
      this.game.switchTo("Level", 3);
    }
  }

  // Dessiner tous les éléments du niveau sur le canevas
  draw() {
    this.ctx.drawImage(
      this.bgImage,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
    this.scoreBoard.draw(this.ctx);
    for (let coin of this.coins) coin.draw(this.ctx);
    this.pirate.render(this.ctx);

    // Dessiner la clé si elle n'a pas été collectée
    if (!this.key.collected) {
      this.ctx.drawImage(
        this.keyImage,
        this.key.x,
        this.key.y,
        this.key.width,
        this.key.height
      );
    }

    for (let wall of this.walls) {
      wall.draw(this.ctx);
    }
  }

  // Boucle principale de gameplay
  play() {
    if (this.paused) return;

    let now = Date.now();
    let delta = now - this.then;

    this.update(delta / 1000);
    this.draw();

    this.then = now;

    window.requestAnimationFrame(() => this.play());
  }

  // Effacer le canvas
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  // Basculer l'état de pause du jeu
  togglePause() {
    this.paused = !this.paused;
    if (!this.paused) {
      this.then = Date.now();
      this.play();
    }
  }

  // Réinitialiser le niveau à son état initial
  reset() {
    this.scoreBoard.reset();
    this.pirate.reset();
    this.coins
      .fill()
      .forEach(
        (_, i) =>
          (this.coins[i] = new Coin(
            Math.floor(Math.random() * (this.WIDTH - Coin.WIDTH)),
            Math.floor(Math.random() * (this.HEIGHT - Coin.HEIGHT))
          ))
      );
    this.key.collected = false;
    this.walls = [...defaultWalls, ...wallsLevel2];
  }
}
