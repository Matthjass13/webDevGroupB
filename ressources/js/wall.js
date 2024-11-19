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
  new Wall(0, 0, 800, 20), // Top wall
  new Wall(0, 0, 20, 600), // Left wall
  new Wall(780, 0, 20, 600), // Right wall
  new Wall(0, 580, 800, 20), // Bottom wall
];

// Wall definitions for level 1
export const wallsLevel1 = [
  ...defaultWalls,
  new Wall(190, 110, 150, 40), // Central horizontal wall 1
  new Wall(385, 110, 55, 40), // Central horizontal wall 2
  new Wall(340, 110, 45, 40), // Door wall (removable)
  new Wall(185, 110, 5, 390), // Central vertical wall
  new Wall(440, 24, 5, 125), // Central vertical wall 2
];

// Wall definitions for level 2
export const wallsLevel2 = [
  ...defaultWalls,
  new Wall(100, 150, 600, 20), // Horizontal wall in the upper part of the level
  new Wall(100, 400, 600, 20), // Horizontal wall in the lower part of the level
];

// Wall definitions for level 3
export const wallsLevel3 = [
  ...defaultWalls,
  new Wall(200, 100, 400, 20), // Horizontal wall in the upper-middle part of the level
  new Wall(200, 100, 20, 400), // Vertical wall in the upper-middle part of the level
];

// Wall definitions for level 4
export const wallsLevel4 = [...defaultWalls, new Wall(400, 150, 20, 300)]; // Vertical wall in the center of the level
