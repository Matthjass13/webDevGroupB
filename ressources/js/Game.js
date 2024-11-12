// Game.js
import { TitleScreen } from './TitleScreen.js';
import { RulesScreen } from './RulesScreen.js';
import { Level } from './Level.js';

export class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.titleScreen = new TitleScreen(ctx, () => this.startGame(), () => this.showRules(), () => this.showDescription());
        this.rulesScreen = new RulesScreen(ctx, () => this.showTitleScreen());
        this.level = new Level(ctx);
        this.currentScreen = this.titleScreen;

        this.setupEventListeners();
        this.showTitleScreen();
    }

    setupEventListeners() {
        this.ctx.canvas.addEventListener("mousemove", (e) => {
            const rect = this.ctx.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (this.currentScreen.handleMouseMove) this.currentScreen.handleMouseMove(x, y);
        });

        this.ctx.canvas.addEventListener("click", (e) => {
            const rect = this.ctx.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (this.currentScreen.handleClick) this.currentScreen.handleClick(x, y);
        });
    }

    showTitleScreen() {
        this.currentScreen = this.titleScreen;
        this.currentScreen.draw();
    }

    showRules() {
        this.currentScreen = this.rulesScreen;
        this.currentScreen.draw();
    }

    startGame() {
        this.currentScreen = this.level;
        this.currentScreen.main();
    }

    showDescription() {
        // Transition vers la page de description
    }
}
