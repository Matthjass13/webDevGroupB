export class Wall {
  constructor(x, y, width, height) {
    this.x = x; // X-coordinate of the wall's top-left corner
    this.y = y; // Y-coordinate of the wall's top-left corner
    this.width = width; // Width of the wall
    this.height = height; // Height of the wall
  }

  // Draw the wall on the canvas
  draw(ctx) {
    ctx.fillStyle = "#654321"; // Brown color to represent the walls
    ctx.fillRect(this.x, this.y, this.width, this.height); // Draw a filled rectangle representing the wall
  }
}

// Default walls used in every level
export const defaultWalls = [
  new Wall(0, 0, 800, 5), // Top wall
  new Wall(0, 0, 5, 600), // Left wall
  new Wall(798, 0, 5, 620), // Right wall
  new Wall(0, 580, 800, 5), // Bottom wall
];

// Wall definitions for level 1
export const wallsLevel1 = [
  ...defaultWalls,

  new Wall(190, 110, 150, 10), // Central horizontal wall 1
  new Wall(385, 110, 55, 10), // Central horizontal wall 2
  new Wall(490, 55, 172, 10), // Central horizontal wall 3
  new Wall(340, 110, 45, 20), // Door wall (removable)
  new Wall(185, 110, 5, 390), // Central vertical wall
  new Wall(650, 5, 5, 50), // Central vertical wall 2
  new Wall(440, 5, 5, 115), // Central vertical wall 3
  new Wall(577, 290, 5, 300), // Central vertical wall 4
];

// Wall definitions for level 2

/*x : Position horizontale.
y : Position verticale.
width : Largeur du mur.
height : Hauteur du mur.*/
export const wallsLevel2 = [
  ...defaultWalls,
  new Wall(525, 320, 5, 190),
  new Wall(95, 320, 5, 190),
  new Wall(293, 305, 5, 100),
  new Wall(400, 305, 5, 100),
  new Wall(450, 320, 80, 5),
  new Wall(293, 305, 110, 5),
  new Wall(343, 400, 55, 5),
  new Wall(95, 320, 200, 5),
  new Wall(405, 305, 45, 20), // Door wall (removable)
];

// Wall definitions for level 3
export const wallsLevel3 = [
  ...defaultWalls,
  new Wall(200, 100, 400, 20), // Horizontal wall in the upper-middle part of the level
  new Wall(200, 100, 20, 400), // Vertical wall in the upper-middle part of the level
];

// Wall definitions for level 4
export const wallsLevel4 = [...defaultWalls, new Wall(400, 150, 20, 300)]; // Vertical wall in the center of the level
