const stickman = document.getElementById("stickman");
let position = window.innerWidth / 2;
let speed = 5;
let movingRight = false;
let movingLeft = false;

// Function to switch to walking animation and resize
function startWalking() {
    stickman.src = "stickman-walk-unscreen.gif";
    stickman.style.transform = "scale(2)"; // Double size when walking
    stickman.style.bottom = "50px"; // Move higher when walking
}

// Function to switch back to idle and resize
function stopWalking() {
    stickman.src = "stickman-idle.png";
    stickman.style.transform = "scale(0.5)"; // Half size when idle
    stickman.style.bottom = "10px"; // Move lower when idle
}

// Function to move the stickman
function moveStickman() {
    const maxRight = window.innerWidth - stickman.clientWidth;
    const minLeft = 0;

    if (movingRight && position < maxRight) {
        position += speed;
        stickman.style.left = position + "px";
        stickman.style.scaleX = "1";
    }
    if (movingLeft && position > minLeft) {
        position -= speed;
        stickman.style.left = position + "px";
        stickman.style.scaleX = "-1";
    }
}

document.addEventListener("keydown", (event) => {
    if (!movingRight && (event.key === "d" || event.key === "D" || event.key === "ArrowRight")) {
        movingRight = true;
        startWalking();
    }
    if (!movingLeft && (event.key === "a" || event.key === "A" || event.key === "ArrowLeft")) {
        movingLeft = true;
        startWalking();
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
        movingRight = false;
        stopWalking();
    }
    if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
        movingLeft = false;
        stopWalking();
    }
});

setInterval(moveStickman, 20);
