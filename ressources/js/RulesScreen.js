// RulesScreen.js
export class RulesScreen {
    constructor(ctx, onBackToTitle) {
        this.ctx = ctx;
        this.onBackToTitle = onBackToTitle;
    }

    draw() {
        this.clear();
        this.drawBackButton();
        this.drawCenteredText([
            "Rules of the Game:",
            "1. Find the key...",
            "2. Avoid enemies...",
            "3. Unlock the chest...",
            "4. Lives are limited..."
        ]);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    drawBackButton() {
        this.ctx.fillStyle = "#555555";
        this.ctx.fillRect(this.ctx.canvas.width - 100, 20, 80, 30);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "8px 'Press Start 2P'";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("Back", this.ctx.canvas.width - 60, 35);
    }

    drawCenteredText(textArray) {
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "9px 'Press Start 2P'";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "top";

        let textY = 100;
        textArray.forEach(line => {
            this.ctx.fillText(line, this.ctx.canvas.width / 2, textY);
            textY += 16;
        });
    }

    handleClick(x, y) {
        if (x > this.ctx.canvas.width - 100 && x < this.ctx.canvas.width - 20 && y > 20 && y < 50) {
            this.onBackToTitle();
        }
    }
}
