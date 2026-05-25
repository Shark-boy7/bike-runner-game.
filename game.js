let game;
let score = 0, coins = 0, speed = 6;

function startGame() {
  if (game) game.destroy(true);
  
  const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 550,
    parent: document.body,
    physics: { default: 'arcade' },
    scene: { preload: preload, create: create, update: update }
  };
  game = new Phaser.Game(config);
}

function preload() {
  // We use colors since no images yet
  this.load.image('road', 'https://i.imgur.com/empty.png'); // placeholder
}

function create() {
  // Background
  this.bg = this.add.rectangle(450, 275, 900, 550, 0x0a001f);
  
  // Road
  this.road = this.add.rectangle(450, 400, 900, 300, 0x1f2937);
  
  // Car (better looking)
  this.car = this.add.rectangle(380, 380, 110, 55, 0xff0088);
  this.car.setStrokeStyle(4, 0x00ffff);
  
  // Wheels
  this.wheel1 = this.add.rectangle(340, 410, 25, 20, 0x000000);
  this.wheel2 = this.add.rectangle(460, 410, 25, 20, 0x000000);
  
  this.scoreText = this.add.text(20, 20, 'Score: 0', { fontSize: '28px', fill: '#00ffff' });
  this.coinText = this.add.text(20, 60, 'Coins: 0', { fontSize: '28px', fill: '#ffff00' });
  
  this.coinsGroup = this.physics.add.group();
  this.obstaclesGroup = this.physics.add.group();
  
  this.time.addEvent({ delay: 800, callback: spawnCoin, callbackScope: this, loop: true });
  this.time.addEvent({ delay: 1200, callback: spawnObstacle, callbackScope: this, loop: true });
  
  // Click to change lane
  this.input.on('pointerdown', (pointer) => {
    if (pointer.x < 450) this.car.x = 280;
    else this.car.x = 520;
  });
}

function spawnCoin() {
  if (!game) return;
  const coin = this.coinsGroup.create(200 + Math.random()*500, 100, null);
  coin.setTint(0xffff00);
  coin.body.velocity.y = speed * 60 + 100;
}

function spawnObstacle() {
  if (!game) return;
  const obs = this.obstaclesGroup.create(200 + Math.random()*500, 100, null);
  obs.setTint(0xff0000);
  obs.body.velocity.y = speed * 60 + 120;
}

function update() {
  score += 1;
  document.getElementById('score').textContent = Math.floor(score / 3);
  
  if (score % 400 === 0) speed = Math.min(speed + 0.8, 18);
  
  // Move coins & obstacles
  this.coinsGroup.getChildren().forEach(c => {
    if (c.y > 600) c.destroy();
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.car.getBounds(), c.getBounds())) {
      coins++;
      document.getElementById('coins').textContent = coins;
      c.destroy();
    }
  });
  
  this.obstaclesGroup.getChildren().forEach(o => {
    if (o.y > 600) o.destroy();
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.car.getBounds(), o.getBounds())) {
      alert("💥 GAME OVER! Score: " + Math.floor(score/3));
      startGame();
    }
  });
}

window.connectWallet = () => {
  alert("🔗 Base Wallet Connect coming in next step!");
};
