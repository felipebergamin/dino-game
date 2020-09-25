const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let jumpPosition = 0;
let isJumping = false;

function handleKeyUp(e) {
  if (e.keyCode === 32) {
    if (!isJumping) jump();
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (jumpPosition >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (jumpPosition <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          jumpPosition -= 20;
          dino.style.bottom = `${jumpPosition}px`;
        }
      }, 20);
    } else {
      jumpPosition += 20;
      dino.style.bottom = `${jumpPosition}px`;
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement("div");
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  cactus.style.left = "1000px";
  cactus.classList.add("cactus");

  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && jumpPosition < 60) {
      // GAME OVER
      console.log("Game Over");
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = `${cactusPosition}px`;
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener("keyup", handleKeyUp);
