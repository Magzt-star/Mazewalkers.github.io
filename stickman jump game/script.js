const stickman = document.getElementById("stickman");
let position = window.innerWidth / 2;
let speed = 5;
let movingRight = false;
let movingLeft = false;

// Function to restart GIF animation
function restartGif() {
    stickman.src = "stickman-idle.png"; // Set to idle first
    setTimeout(() => {
        stickman.src = "stickman-walk-unscreen.gif"; // Then restart animation
    }, 10); // Small delay ensures it reloads
}

function moveStickman() {
    const maxRight = window.innerWidth - stickman.clientWidth;
    const minLeft = 0;

    if (movingRight && position < maxRight) {
        position += speed;
        stickman.style.left = position + "px";
        stickman.style.transform = "scaleX(1)";
    }
    if (movingLeft && position > minLeft) {
        position -= speed;
        stickman.style.left = position + "px";
        stickman.style.transform = "scaleX(-1)";
    }
}

document.addEventListener("keydown", (event) => {
    if (!movingRight && (event.key === "d" || event.key === "D" || event.key === "ArrowRight")) {
        movingRight = true;
        restartGif(); // Restart GIF when moving
    }
    if (!movingLeft && (event.key === "a" || event.key === "A" || event.key === "ArrowLeft")) {
        movingLeft = true;
        restartGif();
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
        movingRight = false;
        stickman.src = "stickman-idle.png"; // Back to idle
    }
    if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
        movingLeft = false;
        stickman.src = "stickman-idle.png"; // Back to idle
    }
});

setInterval(moveStickman, 20);
