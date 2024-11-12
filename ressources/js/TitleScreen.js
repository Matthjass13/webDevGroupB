// TitleScreen.js
export class TitleScreen {
    constructor(ctx, onStartGame, onShowRules, onShowDescription) {
        this.ctx = ctx;
        this.onStartGame = onStartGame;
        this.onShowRules = onShowRules;
        this.onShowDescription = onShowDescription;

        this.backgroundImage = new Image();
        this.backgroundImage.src = "ressources/images/game/level/background/sand.png";
        this.logoImage = new Image();
        this.logoImage.src = "ressources/images/game/menu/logo.png";

        this.buttons = [
            { text: "Start Game", x: ctx.canvas.width / 2 - 65, y: 260, width: 130, height: 30, action: this.onStartGame },
            { text: "Rules", x: ctx.canvas.width / 2 - 65, y: 300, width: 130, height: 30, action: this.onShowRules },
            { text: "Description", x: ctx.canvas.width / 2 - 65, y: 340, width: 130, height: 30, action: this.onShowDescription }
        ];

        this.backgroundImage.onload = () => {
            this.logoImage.onload = () => {
                this.draw();
            };
        };
    }

    draw() {
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        const logoWidth = 270;
        const logoHeight = 270;
        const logoX = (this.ctx.canvas.width - logoWidth) / 2;
        const logoY = 0;
        this.ctx.drawImage(this.logoImage, logoX, logoY, logoWidth, logoHeight);

        this.buttons.forEach(button => this.drawButton(button));
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

    handleMouseMove(x, y) {
        let needsRedraw = false;
        this.buttons.forEach(button => {
            const isHovered = x > button.x && x < button.x + button.width && y > button.y && y < button.y + button.height;
            if (button.hovered !== isHovered) {
                button.hovered = isHovered;
                needsRedraw = true;
            }
        });
        if (needsRedraw) this.draw();
    }

    handleClick(x, y) {
        this.buttons.forEach(button => {
            if (x > button.x && x < button.x + button.width && y > button.y && y < button.y + button.height) {
                button.action();
            }
        });
    }
}