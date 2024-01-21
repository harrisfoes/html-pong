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
  score: 0,
};

const opponent = {
  x: canvas.width - 30,
  y: 20,
  width: 20,
  height: 100,
  speed: 2,
  score: 0,
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: 1,
  dy: 1,
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

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
}

//Init vars
const player_speed = 5;
const ball_speed = 5;

function gameLoop() {
  //Update Starts Here

  //ball
  ball.x = ball.x + ball.dx * ball_speed;
  ball.y -= ball.dy * ball_speed;

  //bounds
  if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
    //ball.dx *= -1;
    resetBall();
  }

  if (ball.y <= 0 || ball.y + ball.radius >= canvas.height) {
    ball.dy *= -1;
  }

  //player input
  if (downPressed && player.y + player.height <= canvas.height) {
    player.y += player_speed;
  } else if (upPressed && player.y >= 0) {
    player.y -= player_speed;
  }

  //opponent bounds
  if (opponent.y <= 0) opponent.y = 0;
  if (opponent.y + opponent.height >= canvas.height)
    opponent.y = canvas.height - opponent.height;

  //opponent ai
  if (ball.y > (opponent.y + opponent.height) / 2) {
    opponent.y += opponent.speed;
  } else if (ball.y < (opponent.y + opponent.height) / 2)
    opponent.y -= opponent.speed;

  //collision
  if (
    ball.x + ball.radius > opponent.x &&
    ball.y + ball.radius > opponent.y &&
    ball.y + ball.radius < opponent.y + opponent.height
  ) {
    ball.dx = -ball.dx;
  }

  if (
    ball.x - ball.radius < player.x + player.width &&
    ball.y + ball.radius > player.y &&
    ball.y + ball.radius < player.y + player.height
  ) {
    ball.dx = -ball.dx;
  }

  draw();
  window.requestAnimationFrame(gameLoop);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //console.log("clear");
  ctx.beginPath();
  ctx.fillStyle = "orange";
  ctx.font = "22px Orbitron";
  ctx.fillText("This is pong", 50, 50);
  ctx.rect(player.x, player.y, player.width, player.height);
  ctx.rect(opponent.x, opponent.y, opponent.width, opponent.height);
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();
}
window.requestAnimationFrame(gameLoop);
