const game = document.querySelector(".game");
const bird = document.getElementById("bird");
const scoreDisplay = document.getElementById("score");

let birdTop = 250;
let gravity = 2;
let jump = -30;
let score = 0;
let gameOver = false;

function moveBird() {
    birdTop += gravity;

    if (birdTop > 560) {
        endGame();
    }

    if (birdTop < 0) {
        birdTop = 0;
    }

    bird.style.top = birdTop + "px";
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        birdTop += jump;
    }
});

document.addEventListener("click", function() {
    birdTop += jump;
});

function createPipe() {
    if (gameOver) return;

    const pipeTop = document.createElement("div");
    const pipeBottom = document.createElement("div");

    pipeTop.classList.add("pipe");
    pipeBottom.classList.add("pipe");

    const gap = 170;
    const topHeight = Math.random() * 250 + 50;

    pipeTop.style.height = topHeight + "px";
    pipeTop.style.top = "0px";

    pipeBottom.style.height =
        (600 - topHeight - gap) + "px";
    pipeBottom.style.bottom = "0px";

    pipeTop.style.left = "400px";
    pipeBottom.style.left = "400px";

    game.appendChild(pipeTop);
    game.appendChild(pipeBottom);

    let pipeLeft = 400;
    let scored = false;

    const movePipe = setInterval(() => {
        if (gameOver) {
            clearInterval(movePipe);
            return;
        }

        pipeLeft -= 3;

        pipeTop.style.left = pipeLeft + "px";
        pipeBottom.style.left = pipeLeft + "px";

        if (
            pipeLeft < 120 &&
            pipeLeft > 40 &&
            (
                birdTop < topHeight ||
                birdTop > topHeight + gap - 40
            )
        ) {
            endGame();
        }

        if (pipeLeft < 80 && !scored) {
            score++;
            scoreDisplay.textContent = score;
            scored = true;
        }

        if (pipeLeft < -60) {
            pipeTop.remove();
            pipeBottom.remove();
            clearInterval(movePipe);
        }

    }, 20);
}

function endGame() {
    gameOver = true;
    alert("Game Over! Score: " + score);
    location.reload();
}

setInterval(moveBird, 20);
setInterval(createPipe, 2000);
