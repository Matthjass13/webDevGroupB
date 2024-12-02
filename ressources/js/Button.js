/**
 * This class represents a clickable button
 * with an associated action
 * @author Elia Pfammatter
 * @contributor Matthias Gaillard
 */

export class Button {
    constructor(ctx, text, x, y, action, width = 130, height = 30) {
        this.ctx = ctx;
        this.text = text;
        this.x = x;
        this.y = y;
        this.action = action;
        this.width = width;
        this.height = height;
        this.hovered = false;
        this.sound = new Audio("ressources/audio/soundEffects/buttonPressed.wav");
        this.sound.volume = 0.5;
        this.addCanvasEventListener();
    }

    draw() {
        this.drawBorders(10);
        this.color();
        this.write(this.text);
    }
    drawBorders(borderRadius) {
        const radius = 10;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + borderRadius, this.y);
        this.ctx.lineTo(this.x + this.width - borderRadius, this.y);
        this.ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + borderRadius);
        this.ctx.lineTo(this.x + this.width, this.y + this.height - borderRadius);
        this.ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - borderRadius, this.y + this.height);
        this.ctx.lineTo(this.x + borderRadius, this.y + this.height);
        this.ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - borderRadius);
        this.ctx.lineTo(this.x, this.y + borderRadius);
        this.ctx.quadraticCurveTo(this.x, this.y, this.x + borderRadius, this.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }
    color() {
        const gradient = this.ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
        gradient.addColorStop(0, this.hovered ? "#bbbbbb" : "#333333");
        gradient.addColorStop(1, this.hovered ? "#eeeeee" : "#777777");
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    write(text) {
        this.ctx.fillStyle = this.hovered ? "#000000" : "#FBD705";
        this.ctx.font = "bold 18px 'Press Start 2P'";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(text, this.x + this.width / 2, this.y + this.height / 2);
    }

    isMouseOver(mx, my) {
        return mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height;
    }

    addCanvasEventListener() {
        this.ctx.canvas.addEventListener("mousemove", (event) => {
            const rect = this.ctx.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            const hovered = this.isMouseOver(mouseX, mouseY);

            if (hovered !== this.hovered) {
                this.hovered = hovered;
                this.draw();
            }
        });
        this.ctx.canvas.addEventListener("click", (event) => {
            const rect = this.ctx.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            if (this.isMouseOver(mouseX, mouseY)) {
                this.action();
            }
        });
    }

}
