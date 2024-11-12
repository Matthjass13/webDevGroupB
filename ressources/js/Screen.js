// Screen.js
export class Screen {
    constructor(ctx) {
        this.ctx = ctx;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "ressources/images/game/level/background/sand.png";
        this.logoImage = new Image();
        this.logoImage.src = "ressources/images/game/menu/logo.png";
    }

    drawBackgroundAndLogo() {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        const logoWidth = 150;
        const logoHeight = 150;
        const logoX = (this.ctx.canvas.width - logoWidth) / 2;
        const logoY = 20;
        this.ctx.drawImage(this.logoImage, logoX, logoY, logoWidth, logoHeight);
    }

    drawCenteredText(textArray, startY = 100) {
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "9px 'Press Start 2P'";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "top";

        let textY = startY;
        const lineHeight = 16;
        const maxWidth = this.ctx.canvas.width - 40;

        textArray.forEach(line => {
            if (this.ctx.measureText(line).width > maxWidth) {
                const words = line.split(" ");
                let currentLine = "";
                words.forEach(word => {
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

    drawButton(button) {
        const gradient = this.ctx.createLinearGradient(button.x, button.y, button.x, button.y + button.height);
        gradient.addColorStop(0, button.hovered ? "#bbbbbb" : "#333333");
        gradient.addColorStop(1, button.hovered ? "#eeeeee" : "#777777");

        this.ctx.fillStyle = gradient;

        const radius = 10;
        this.ctx.beginPath();
        this.ctx.moveTo(button.x + radius, button.y);
        this.ctx.lineTo(button.x + button.width - radius, button.y);
        this.ctx.quadraticCurveTo(button.x + button.width, button.y, button.x + button.width, button.y + radius);
        this.ctx.lineTo(button.x + button.width, button.y + button.height - radius);
        this.ctx.quadraticCurveTo(button.x + button.width, button.y + button.height, button.x + button.width - radius, button.y + button.height);
        this.ctx.lineTo(button.x + radius, button.y + button.height);
        this.ctx.quadraticCurveTo(button.x, button.y + button.height, button.x, button.y + button.height - radius);
        this.ctx.lineTo(button.x, button.y + radius);
        this.ctx.quadraticCurveTo(button.x, button.y, button.x + radius, button.y);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        this.ctx.shadowBlur = 8;
        this.ctx.shadowOffsetX = 4;
        this.ctx.shadowOffsetY = 4;
        this.ctx.fill();
        this.ctx.shadowColor = "transparent";

        this.ctx.fillStyle = button.hovered ? "#000000" : "#bbbbbb";
        this.ctx.font = "bold 10px 'Press Start 2P'";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    }


    handleClick(x, y) {
        // Méthode vide pour être implémentée par les sous-classes
    }
}
