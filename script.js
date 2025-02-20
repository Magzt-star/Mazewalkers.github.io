const stickman = document.getElementById("stickman");
let position = window.innerWidth / 2;
let speed = 5;
let movingRight = false;
let movingLeft = false;

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
        stickman.src = "stickman-walk-unscreen.gif"; // Walking animation
    }
    if (!movingLeft && (event.key === "a" || event.key === "A" || event.key === "ArrowLeft")) {
        movingLeft = true;
        stickman.src = "stickman-walk-unscreen.gif"; // Walking animation
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
