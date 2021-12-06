import Phaser from "phaser";
import logo from "../assets/phaser3-logo.png";
import red from "../assets/red.png";
import yellow from "../assets/yellow.png";
import sky from "../assets/space3.png";

export default class PhaserScene extends Phaser.Scene {
  constructor() {
    super("PhaserScene");
    this.stars = undefined;
    this.bomb = undefined;
    this.bombs = undefined;
    this.gameOver = false;
    this.platforms = undefined;
    this.player = undefined;
    this.score = 0;
    let scoreText = undefined;
    this.gameInfo = {
      playTime: 0,
    };
  }
  

  preload() {
    this.load.image('backdrop', 'assets/backdrop.png')
    this.load.image('background', 'assets/background.png')
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    console.log(this)
  }

  create() {
    this.add.image(400, 1500, 'background');
        this.add.image(200, 1500, 'backdrop');
        this.cameras.main.setViewport(0, 0, 400, 800);
    
        this.platforms = this.physics.add.staticGroup();

        // this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(40, 100, 'ground');
        this.platforms.create(-30, 250, 'ground');
        this.platforms.create(50, 400, 'ground');
        this.platforms.create(20, 550, 'ground');
        this.platforms.create(60, 700, 'ground');
        this.platforms.create(60, 850, 'ground');
        this.platforms.create(40, 1000, 'ground');
        this.platforms.create(55, 1200, 'ground');

        this.platforms.create(360, 100, 'ground');
        this.platforms.create(270, 250, 'ground');
        this.platforms.create(350, 400, 'ground');
        this.platforms.create(320, 550, 'ground');
        this.platforms.create(360, 700, 'ground');
        this.platforms.create(360, 850, 'ground');
        this.platforms.create(340, 1000, 'ground');
        this.platforms.create(355, 1200, 'ground');
        // this.platforms.create(20, 400, 'ground');
        // this.platforms.create(213, 400, 'ground');
        // this.platforms.create(70, 400, 'ground');
        // this.platforms.create(150, 400, 'ground');

        // this.platforms.create(50, 250, 'ground');
        // this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(200, 0, 'dude');

        this.player.body.setGravityY(0)

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

            this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.scoreText = this.add.text(50, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        // this.cameras.main.startFollow(this.player);
  }

  update(){
    if (this.cursors.left.isDown)
        {
          this.player.setVelocityX(-160);

          this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
          this.player.setVelocityX(160);

          this.player.anims.play('right', true);
        }
        else
        {
          this.player.setVelocityX(0);

          this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown)
        {
          this.player.setVelocityY(-50);
        }
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

        if (this.stars.countActive(true) === 7)
            {
                this.stars.children.iterate(function (child) {

                    child.enableBody(true, child.x, 0, true, true);

                });

                var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                this.bomb = this.bombs.create(x, 16, 'bomb');
                this.bomb.setBounce(1);
                this.bomb.setCollideWorldBounds(true);
                this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

            }
  }

  hitBomb() {
    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play('turn');

        this.gameOver = true;

        if(this.gameOver) {
            this.gameOver = false;
        }
        
  }
  
}