const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let score = 0, coins = 0, speed = 8, gameRunning = false;
let carX = 380;     // Left & Right position
let carY = 370;     // Fixed position (not moving up)

let obstacles = [], collectibles = [];
let bgY = 0;

function drawNeonBackground() {
  ctx.fillStyle = '#0a001f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#1a2338';
  ctx.fillRect(0, 280, canvas.width, 300);

  ctx.strokeStyle = '#ff00ff';
  ctx.lineWidth = 14;
  for (let i = -6; i < 15; i++) {
    let y = (bgY + i * 75) % 680;
    ctx.shadowBlur = 25;
    ctx.shadowColor = '#ff00ff';
    ctx.beginPath();
    ctx.moveTo(160, 310 + y);
    ctx.lineTo(canvas.width - 160, 310 + y);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
}

function drawCar() {
  ctx.shadowBlur = 40;
  ctx.shadowColor = '#00ffff';

  // Main Car Body (Better Look)
  ctx.fillStyle = '#ff0088';
  ctx.fillRect(carX, carY, 140, 65);

  // Cabin / Window
  ctx.fillStyle = '#00ffff';
  ctx.fillRect(carX + 30, carY + 12, 80, 28);

  // Front Light
  ctx.fillStyle = '#ffff00';
  ctx.fillRect(carX + 115, carY + 20, 20, 15);

  // Rear Exhaust
  ctx.fillStyle = '#ff8800';
  ctx.fillRect(carX - 18, carY + 35, 22, 20);

  ctx.shadowBlur = 0;
}

function createCollectible() {
  if (Math.random() < 0.06) {
    collectibles.push({ x: 220 + Math.random() * 460, y: 90 });
  }
}

function drawCollectibles() {
  ctx.shadowBlur = 30;
  ctx.shadowColor = '#ffff00';

  for (let i = 0; i < collectibles.length; i++) {
    let c = collectibles[i];
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(c.x, c.y, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('R', c.x - 7, c.y + 7);

    c.y += speed + 5;

    if (Math.abs(c.x - (carX + 70)) < 55 && Math.abs(c.y - (carY + 30)) < 55) {
      coins++;
      document.getElementById('coins').textContent = coins;
      collectibles.splice(i, 1);
    }
  }
  ctx.shadowBlur = 0;
}

function update() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bgY += speed;

  drawNeonBackground();
  drawCar();
  createCollectible();
  drawCollectibles();

  score += 1;
  document.getElementById('score').textContent = Math.floor(score / 2);

  if (score % 250 === 0) speed = Math.min(speed + 0.7, 20);

  requestAnimationFrame(update);
}

window.startGame = () => {
  score = 0; 
  coins = 0; 
  speed = 8;
  collectibles = [];
  gameRunning = true;
  update();
};

window.connectWallet = () => {
  alert("🔗 Base Wallet Connect coming soon!");
};

// Click left side = move left, right side = move right
canvas.addEventListener('click', (e) => {
  if (!gameRunning) return;
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  carX = clickX < canvas.width / 2 ? 260 : 510;
});
