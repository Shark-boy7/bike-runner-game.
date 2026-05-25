const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

let score = 0;
let gameRunning = false;
let bikeY = 300;
let velocity = 0;
let gravity = 0.8;
let isJumping = false;
const obstacles = [];

function drawBike() {
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(100, bikeY, 70, 30);
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(125, bikeY + 35, 18, 0, Math.PI * 2);
  ctx.fill();
}

function drawGround() {
  ctx.fillStyle = '#228B22';
  ctx.fillRect(0, 350, canvas.width, 50);
}

function update() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGround();
  drawBike();

  velocity += gravity;
  bikeY += velocity;

  if (bikeY >= 300) {
    bikeY = 300;
    velocity = 0;
    isJumping = false;
  }

  score += 1;
  scoreElement.textContent = score;

  if (Math.random() < 0.025) {
    obstacles.push({x: 800, y: 315});
  }

  ctx.fillStyle = '#8B4513';
  for (let i = 0; i < obstacles.length; i++) {
    let obs = obstacles[i];
    ctx.fillRect(obs.x, obs.y, 45, 45);
    obs.x -= 6;

    if (obs.x < 170 && obs.x > 70 && bikeY > 270) {
      alert("💥 Game Over! Your Score: " + score);
      gameRunning = false;
      obstacles.length = 0;
    }
  }

  requestAnimationFrame(update);
}

function jump() {
  if (!isJumping && gameRunning) {
    velocity = -19;
    isJumping = true;
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'ArrowUp') jump();
});

window.startGame = () => {
  score = 0;
  obstacles.length = 0;
  gameRunning = true;
  update();
};

window.connectWallet = () => {
  alert("✅ Wallet Connect coming soon!");
};
