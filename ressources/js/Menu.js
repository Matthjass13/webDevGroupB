import { Button } from "./Button.js";
import { Level } from "./Level.js";

/**
 * This class displays the title screen of the game.
 * From there, we can access the game description and rules.
 * We can also launch a level, which is represented by its own class.
 * @see Button
 * @author Elia Pfammatter
 * @contributor Matthias Gaillard
 * @contributor Alexis Jordan
 */
export class Menu {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
    this.selectedCharacter = 0;
    this.characters = [];
    this.loadCharacterImages();
    this.time = new Date().toLocaleTimeString(); 
    this.location = "Fetching location...";


    this.backgroundImage = new Image();
    this.backgroundImage.src =
      "ressources/images/game/menu/background.png";
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
      () => this.game.switchTo("Level", this.selectedCharacter)
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

    this.characterButton = new Button(
      this.ctx,
      "Select Character",
      10, 
      ctx.canvas.height - 50,
      () => this.selectCharacter()
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(2);
          const lon = position.coords.longitude.toFixed(2);
          this.location = `Lat: ${lat}, Lon: ${lon}`;
        },
        (error) => {
          console.error("Geolocation error:", error);
          this.location = "Location unavailable"; 
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
      this.location = "Geolocation not supported";
    }
  }

  start() {
    this.drawTitleScreen();
  }

  stop() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawTimeAndLocation() {
    // Update the current time
    this.time = new Date().toLocaleTimeString();
  
    // Font and alignment setup
    this.ctx.font = "16px Arial";
    this.ctx.textAlign = "left";
    this.ctx.lineWidth = 3;
  
    // Time display
    const timeX = 10; 
    const timeY = 30; 
    this.ctx.strokeStyle = "white"; 
    this.ctx.fillStyle = "black"; 
    this.ctx.strokeText(`Time: ${this.time}`, timeX, timeY); 
    this.ctx.fillText(`Time: ${this.time}`, timeX, timeY); 
  
    // Location display
    const locationY = timeY + 20; 
    this.ctx.strokeText(`Location: ${this.location}`, timeX, locationY); 
    this.ctx.fillText(`Location: ${this.location}`, timeX, locationY); 
  }
  
  

  loadCharacterImages() {
    const characterPaths = [
      "ressources/images/game/level/characters/player/0/idle/right/0.png",
      "ressources/images/game/level/characters/player/1/idle/right/0.png",
    ];
  
    characterPaths.forEach((path) => {
      const img = new Image();
      img.src = path;
      img.onload = () => console.log(`Loaded: ${path}`);
      img.onerror = () => console.error(`Failed to load: ${path}`);
      this.characters.push(img);
    });
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
    this.characterButton.draw();
    this.drawTimeAndLocation();
  }
  drawTitleScreen() {
    this.drawBasis();
  
    const logoWidth = 300;
    const logoHeight = 300;
    const logoX = (this.ctx.canvas.width - logoWidth) / 2;
    const logoY = 20;
    this.ctx.drawImage(this.logoImage, logoX, logoY, logoWidth, logoHeight);
    
    this.ctx.font = "16px Arial";
    this.ctx.textAlign = "left";
    this.ctx.lineWidth = 3; 
  
    // Time
    const timeX = 10; 
    const timeY = 30; 
    this.ctx.strokeStyle = "white"; 
    this.ctx.fillStyle = "black"; 
    this.ctx.strokeText(`Time: ${this.time}`, timeX, timeY); 
    this.ctx.fillText(`Time: ${this.time}`, timeX, timeY); 
  
    // Location
    const locationY = timeY + 20; // Position below the time
    this.ctx.strokeText(`Location: ${this.location}`, timeX, locationY); 
    this.ctx.fillText(`Location: ${this.location}`, timeX, locationY); 
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

  selectCharacter() {
    // Clear the canvas and draw the background
    this.drawBasis();
  
    // Title
    this.ctx.fillStyle = "#000000";
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Select your character", this.ctx.canvas.width / 2, 50);
  
    const optionWidth = 150; // Image box width
    const optionHeight = 150; // Image box height
    const spacing = 50; // Space between images
    const startX =
      (this.ctx.canvas.width -
        (this.characters.length * (optionWidth + spacing) - spacing)) /
      2; // Center the options
    const startY = 100; // Position below the title
  
    // Draw each character
    this.characters.forEach((img, index) => {
      const x = startX + index * (optionWidth + spacing);
      const y = startY;
  
      // Highlight the selected character
      if (index === this.selectedCharacter) {
        this.ctx.strokeStyle = "#FFD700";
        this.ctx.lineWidth = 5;
        this.ctx.strokeRect(x - 5, y - 5, optionWidth + 10, optionHeight + 10);
      }
  
      this.ctx.drawImage(img, x, y, optionWidth, optionHeight);
  
      // Label the character
      this.ctx.fillStyle = "#000000";
      this.ctx.font = "20px Arial";
      this.ctx.fillText(
        `Character ${index}`,
        x + optionWidth / 2,
        y + optionHeight + 20
      );
    });
  
    // Add event listener for clicks
    const handleClick = (event) => {
      const rect = this.ctx.canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
  
      this.characters.forEach((_, index) => {
        const x = startX + index * (optionWidth + spacing);
        const y = startY;
  
        if (
          clickX >= x &&
          clickX <= x + optionWidth &&
          clickY >= y &&
          clickY <= y + optionHeight
        ) {
          this.selectedCharacter = index; // Update selected character
          console.log(`Selected character: ${index}`);
          this.ctx.canvas.removeEventListener("click", handleClick); // Remove the listener
          this.start(); // Return to the main menu screen
          if (selectedCharacter > 1) {
            selectedCharacter = 0; // Default to Player 0 if Player 2 is invalid
          }
        }
      });
    };
  
    this.ctx.canvas.addEventListener("click", handleClick);
  }
  
}
