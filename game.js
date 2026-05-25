const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let score = 0, coins = 0, speed = 9, gameRunning = false;
let carX = 380;
let obstacles = [], collectibles = [];
let bgY = 0;

// Load Images
const carImg = new Image();
carImg.src = "https://i.imgur.com/5z3vK8R.png"; // Neon Car

const coinImg = new Image();
coinImg.src = "https://i.imgur.com/8fZ9vKp.png"; // Coin

function drawBackground() {
  ctx.fillStyle = '#0a001f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Road
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(0, 280, canvas.width, 300);

  // Neon lines
  ctx.strokeStyle = '#ff00ff';
  ctx.lineWidth = 12;
  for (let i = -5; i < 15; i++) {
    let y = (bgY + i * 70) % 650;
    ctx.beginPath();
    ctx.moveTo(150, 310 + y);
    ctx.lineTo(canvas.width - 150, 310 + y);
    ctx.stroke();
  }
}

function drawCar() {
  ctx.drawImage(carImg, carX, 370, 130, 70);
}

function createCollectible() {
  if (Math.random() < 0.06) {
    collectibles.push({ x: 220 + Math.random() * 460, y: 80 });
  }
}

function drawCollectibles() {
  for (let i = 0; i < collectibles.length; i++) {
    let c = collectibles[i];
    ctx.drawImage(coinImg, c.x, c.y, 35, 35);
    c.y += speed + 4;

    if (Math.abs(c.x - (carX + 55)) < 55 && Math.abs(c.y - 400) < 55) {
      coins++;
      document.getElementById('coins').textContent = coins;
      collectibles.splice(i, 1);
    }
  }
}

function update() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bgY += speed;

  drawBackground();
  drawCar();
  createCollectible();
  drawCollectibles();

  score += 1;
  document.getElementById('score').textContent = Math.floor(score / 2);

  if (score % 280 === 0) speed = Math.min(speed + 0.8, 19);

  requestAnimationFrame(update);
}

window.startGame = () => {
  score = 0; coins = 0; speed = 9;
  collectibles = [];
  gameRunning = true;
  update();
};

window.connectWallet = () => {
  alert("🔗 Base Wallet Connect coming soon!");
};

canvas.addEventListener('click', (e) => {
  if (!gameRunning) return;
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  carX = clickX < 450 ? 260 : 510;
});
