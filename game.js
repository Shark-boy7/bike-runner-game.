const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

let score = 0;
let gameRunning = false;
let speed = 8;
let bikeX = 150;
let bikeY = 320;

// Road lines
let roadLines = [];

function initRoad() {
  roadLines = [];
  for (let i = 0; i < 15; i++) {
    roadLines.push({ y: i * 50 });
  }
}

function drawBackground() {
  // Sky
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(0, 0, canvas.width, 350);
  
  // Grass
  ctx.fillStyle = '#166534';
  ctx.fillRect(0, 350, canvas.width, canvas.height - 350);
  
  // Road
  ctx.fillStyle = '#374151';
  ctx.fillRect(0, 300, canvas.width, 200);
  
  // Road lines
  ctx.fillStyle = '#facc15';
  for (let i = 0; i < roadLines.length; i++) {
    let line = roadLines[i];
    ctx.fillRect(0, line.y, canvas.width, 8);
    line.y += speed;
    if (line.y > canvas.height) line.y = -50;
  }
}

function drawBike() {
  // Main body
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(bikeX, bikeY, 90, 35);
  
  // Front
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(bikeX + 70, bikeY - 10, 35, 25);
  
  // Wheels
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.arc(bikeX + 20, bikeY + 40, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(bikeX + 75, bikeY + 40, 18, 0, Math.PI * 2);
  ctx.fill();
  
  // Wheel shine
  ctx.fillStyle = '#6b7280';
  ctx.beginPath();
  ctx.arc(bikeX + 20, bikeY + 40, 10, 0, Math.PI * 2);
  ctx.fill();
}

function update() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawBackground();
  drawBike();

  score += 1;
  scoreElement.textContent = Math.floor(score / 2);

  // Increase speed gradually
  if (score % 300 === 0) speed = Math.min(speed + 0.5, 15);

  requestAnimationFrame(update);
}

window.startGame = () => {
  score = 0;
  speed = 8;
  gameRunning = true;
  initRoad();
  update();
};

window.connectWallet = () => {
  alert("🔗 Wallet Connect coming in next update!");
};

// Click to boost speed
canvas.addEventListener('click', () => {
  if (gameRunning) speed = Math.min(speed + 3, 18);
});
