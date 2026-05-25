const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const speedEl = document.getElementById('speed');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreEl = document.getElementById('finalScore');

let score = 0, speed = 6, gameRunning = false;
let bikeX = 180, bikeY = 340;
let obstacles = [];
let bgY = 0;

function drawRoad() {
  // Sky
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, 300);
  
  // Road
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(0, 300, canvas.width, 200);
  
  // Road lines
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 6;
  for (let i = -2; i < 12; i++) {
    let y = (bgY + i * 80) % 700;
    ctx.beginPath();
    ctx.moveTo(0, 320 + y);
    ctx.lineTo(canvas.width, 320 + y);
    ctx.stroke();
  }
}

function drawBike() {
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(bikeX + 15, bikeY + 45, 80, 15);
  
  // Bike body
  ctx.fillStyle = '#e11d48';
  ctx.fillRect(bikeX + 10, bikeY + 15, 85, 35);
  
  // Engine part
  ctx.fillStyle = '#9f1239';
  ctx.fillRect(bikeX + 50, bikeY + 20, 40, 25);
  
  // Wheels
  ctx.fillStyle = '#111827';
  ctx.beginPath(); ctx.arc(bikeX + 25, bikeY + 50, 17, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(bikeX + 75, bikeY + 50, 17, 0, Math.PI*2); ctx.fill();
  
  ctx.fillStyle = '#6b7280';
  ctx.beginPath(); ctx.arc(bikeX + 25, bikeY + 50, 9, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(bikeX + 75, bikeY + 50, 9, 0, Math.PI*2); ctx.fill();
}

function createObstacle() {
  if (Math.random() < 0.03) {
    obstacles.push({
      x: canvas.width + 50,
      y: 340,
      width: 55,
      height: 45
    });
  }
}

function drawObstacles() {
  ctx.fillStyle = '#854d0e';
  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];
    ctx.fillRect(o.x, o.y, o.width, o.height);
    o.x -= speed + 3;
    
    // Collision
    if (o.x < bikeX + 80 && o.x + o.width > bikeX && 
        bikeY + 40 > o.y && bikeY < o.y + o.height) {
      gameOver();
    }
  }
  
  obstacles = obstacles.filter(o => o.x > -100);
}

function update() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  bgY += speed;
  drawRoad();
  drawBike();
  createObstacle();
  drawObstacles();

  score += 1;
  scoreEl.textContent = Math.floor(score / 3);
  speedEl.textContent = Math.floor(speed * 12);

  if (score % 200 === 0) speed = Math.min(speed + 0.4, 14);

  requestAnimationFrame(update);
}

function gameOver() {
  gameRunning = false;
  finalScoreEl.textContent = Math.floor(score / 3);
  gameOverScreen.style.display = 'block';
}

window.startGame = () => {
  score = 0;
  speed = 6;
  obstacles = [];
  gameRunning = true;
  gameOverScreen.style.display = 'none';
  update();
};

window.restartGame = () => {
  startGame();
};

window.connectWallet = () => {
  alert("🔗 Wallet Connect (Base) coming soon!");
};

// Click to boost
canvas.addEventListener('click', () => {
  if (gameRunning) speed = Math.min(speed + 2.5, 16);
});
