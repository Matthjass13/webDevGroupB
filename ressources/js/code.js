const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let currentPage = "start";

const buttons = [
    { text: "Start Game", x: canvas.width / 2 - 65, y: 260, width: 130, height: 30, action: startGame },
    { text: "Rules", x: canvas.width / 2 - 65, y: 300, width: 130, height: 30, action: showRules },
    { text: "Description", x: canvas.width / 2 - 65, y: 340, width: 130, height: 30, action: showDescription }
];

const backgroundImage = new Image();
backgroundImage.src = "ressources/background_sand.png";
const logoImage = new Image();
logoImage.src = "ressources/logo.png";

backgroundImage.onload = () => {
    logoImage.onload = () => {
        drawStartingPage();
    };
};

function drawStartingPage() {
    currentPage = "start";
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    const logoWidth = 270;
    const logoHeight = 270;
    const logoX = (canvas.width - logoWidth) / 2;
    const logoY = 0;

    ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);

    buttons.forEach(button => {
        drawButton(button);
    });
}

function drawButton(button) {
    const gradient = ctx.createLinearGradient(button.x, button.y, button.x, button.y + button.height);
    gradient.addColorStop(0, button.hovered ? "#bbbbbb" : "#333333");
    gradient.addColorStop(1, button.hovered ? "#eeeeee" : "#777777");

    ctx.fillStyle = gradient;

    const radius = 10;
    ctx.beginPath();
    ctx.moveTo(button.x + radius, button.y);
    ctx.lineTo(button.x + button.width - radius, button.y);
    ctx.quadraticCurveTo(button.x + button.width, button.y, button.x + button.width, button.y + radius);
    ctx.lineTo(button.x + button.width, button.y + button.height - radius);
    ctx.quadraticCurveTo(button.x + button.width, button.y + button.height, button.x + button.width - radius, button.y + button.height);
    ctx.lineTo(button.x + radius, button.y + button.height);
    ctx.quadraticCurveTo(button.x, button.y + button.height, button.x, button.y + button.height - radius);
    ctx.lineTo(button.x, button.y + radius);
    ctx.quadraticCurveTo(button.x, button.y, button.x + radius, button.y);
    ctx.closePath();
    ctx.fill();

    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.fill();
    ctx.shadowColor = "transparent";

    ctx.fillStyle = button.hovered ? "#000000" : "#bbbbbb";
    ctx.font = "bold 10px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
}

function drawBackButton() {
    ctx.fillStyle = "#555555";
    ctx.fillRect(canvas.width - 100, 20, 80, 30);
    ctx.fillStyle = "#ffffff";
    ctx.font = "8px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Back", canvas.width - 60, 35);
}

canvas.addEventListener("mousemove", (e) => {
    if (currentPage !== "start") return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let needsRedraw = false;
    buttons.forEach(button => {
        const isHovered = mouseX > button.x && mouseX < button.x + button.width &&
            mouseY > button.y && mouseY < button.y + button.height;
        if (button.hovered !== isHovered) {
            button.hovered = isHovered;
            needsRedraw = true;
        }
    });

    if (needsRedraw) drawStartingPage();
});

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (currentPage !== "start" && mouseX > canvas.width - 100 && mouseX < canvas.width - 20 &&
        mouseY > 20 && mouseY < 50) {
        drawStartingPage();
        return;
    }

    if (currentPage === "start") {
        buttons.forEach(button => {
            if (mouseX > button.x && mouseX < button.x + button.width &&
                mouseY > button.y && mouseY < button.y + button.height) {
                button.action();
            }
        });
    }
});

function startGame() {

}

function showRules() {
    currentPage = "rules";
    showRulesPage();
}

function showDescription() {
    currentPage = "description";
    showDescriptionPage();
}

function showRulesPage() {
    drawBackgroundAndLogo();
    drawBackButton();
    drawCenteredText([
        "Rules of the Game:",
        "1. Find the key: You must locate the key in each level",
        "2. Avoid enemies: If an enemy touches you, you will be sent back to the beginning of the level",
        "3. Unlock the chest: Once you have found the key, you must find the chest and unlock it to move on to the next level",
        "4. Lives: The player has a limited number of lives. Losing all lives means starting over from the first level"
    ]);
}

function showDescriptionPage() {
    drawBackgroundAndLogo();
    drawBackButton();
    drawCenteredText([
        "Game Description:",
        "In this web-based game you are a pirate trapped in a series of mazes.",
        "Your goal is to find the key hidden within each maze and use it to unlock the treasure chest which leads into the next level.",
        "Along the way through the maze, you must avoid enemies, which can send you back to the start of the maze.",
        "With each level the enemies become more dangerous, and the maze becomes more complex."
    ]);
}

function drawBackgroundAndLogo() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    const logoWidth = 150;
    const logoHeight = 150;
    const logoX = (canvas.width - logoWidth) / 2;
    const logoY = 20;
    ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);
}

function drawCenteredText(textArray) {
    ctx.fillStyle = "#000000";
    ctx.font = "9px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    let textY = 200;
    const lineHeight = 16;
    const maxWidth = canvas.width - 40;

    textArray.forEach(line => {
        if (ctx.measureText(line).width > maxWidth) {
            const words = line.split(" ");
            let currentLine = "";
            words.forEach(word => {
                const testLine = currentLine + word + " ";
                const testWidth = ctx.measureText(testLine).width;
                if (testWidth > maxWidth) {
                    ctx.fillText(currentLine, canvas.width / 2, textY);
                    currentLine = word + " ";
                    textY += lineHeight;
                } else {
                    currentLine = testLine;
                }
            });
            ctx.fillText(currentLine, canvas.width / 2, textY);
            textY += lineHeight;
        } else {
            ctx.fillText(line, canvas.width / 2, textY);
            textY += lineHeight;
        }
    });
}