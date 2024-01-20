const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let upPressed = false;
let downPressed = false;

const player = {
  x: 10,
  y: 20,
  width: 20,
  height: 100,
};

function keyDownHandler(event) {
  if (event.keyCode === 40) {
    downPressed = true;
  } else if (event.keyCode === 38) upPressed = true;
}

function keyUpHandler(event) {
  if (event.keyCode === 40) {
    downPressed = false;
  } else if (event.keyCode === 38) upPressed = false;
}

//game loop
//window.requestAnimationFrame(gameLoop);

function gameLoop() {
  if (downPressed && player.y + player.height <= canvas.height) {
    player.y += 5;
  } else if (upPressed && player.y >= 0) {
    player.y -= 5;
  }

  draw();
  window.requestAnimationFrame(gameLoop);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //console.log("clear");
  ctx.fillStyle = "orange";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}
window.requestAnimationFrame(gameLoop);
