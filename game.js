const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const coinsEl = document.getElementById('coins');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreEl = document.getElementById('finalScore');
const finalCoinsEl = document.getElementById('finalCoins');

let score = 0, coins = 0, speed = 7, gameRunning = false;
let carX = 400, carY = 380;
let obstacles = [], collectibles = [];
let bgY = 0;

function drawBackground() {
  // Sky
  ctx.fillStyle = '#0a001f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Neon buildings
  ctx.fillStyle = '#1a0033';
  for (let i = 0; i < 8; i++) {
    let x = (i * 120) % (canvas.width + 200) - 100;
    ctx.fillRect(x, 100 + (i%3)*50, 80, 400);
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(x + 20, 150, 10, 20);
  }
  
  // Road
  ctx.fillStyle = '#1f1f2e';
  ctx.fillRect(0, 300, canvas.width, 300);
  
  // Neon road lines
  ctx.strokeStyle = '#ff00ff';
  ctx.lineWidth = 8;
  for (let i = -3; i < 10; i++) {
    let y = (bgY + i * 90) % 700;
    ctx.beginPath();
    ctx.moveTo(200, 320 + y);
    ctx.lineTo(canvas.width - 200, 320 + y);
    ctx.stroke();
  }
}

function drawCar() {
  // Car body
  ctx.fillStyle = '#ff00aa';
  ctx.fillRect(carX, carY, 110, 50);
  
  // Windows
  ctx.fillStyle = '#00ffff';
  ctx.fillRect(carX + 20, carY + 10, 70, 20);
  
  // Exhaust
  ctx.fillStyle = '#ffff00';
  ctx.fillRect(carX - 15, carY + 30, 20, 12);
  
  // Wheels
  ctx.fillStyle = '#111';
  ctx.fillRect(carX + 10, carY + 45, 25, 18);
  ctx.fillRect(carX + 75, carY + 45, 25, 18);
}

function createCollectible() {
  if (Math.random() < 0.04) {
    collectibles.push({
      x: Math.random() * 500 + 200,
      y: 100,
      size: 28
    });
  }
}

function drawCollectibles() {
  for (let i = 0; i < collectibles.length; i++) {
    let c = collectibles[i];
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.size/2, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('R', c.x - 6, c.y + 6);
    
    c.y += speed + 2;
    
    // Collect coin
    if (Math.abs(c.x - (carX + 55)) < 50 && Math.abs(c.y - (carY + 30)) < 50) {
      coins++;
      coinsEl.textContent = coins;
      collectibles.splice(i, 1);
      i--;
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
  scoreEl.textContent = Math.floor(score / 2);

  if (score % 250 === 0) speed = Math.min(speed + 0.6, 16);

  requestAnimationFrame(update);
}

window.startGame = () => {
  score = 0; coins = 0; speed = 7;
  collectibles = [];
  gameRunning = true;
  gameOverScreen.style.display = 'none';
  update();
};

window.restartGame = () => startGame();

window.connectWallet = () => {
  alert("🔗 Base Wallet Connect coming soon!");
};

// Controls - Click left or right side to move
canvas.addEventListener('click', (e) => {
  if (!gameRunning) return;
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  
  if (clickX < canvas.width / 2) {
    carX = Math.max(200, carX - 120);   // Move Left
  } else {
    carX = Math.min(600, carX + 120);   // Move Right
  }
});
