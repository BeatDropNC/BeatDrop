import Phaser from "phaser";

export default class PhaserScene extends Phaser.Scene {
  constructor() {
    super("PhaserScene");
    this.gameOver = false;
    this.player = undefined;
    this.score = 0;
    let scoreText = undefined;
    this.gameInfo = {
      playTime: 0,
    };
    this.scrollingBackground = undefined;
    this.scrollingPlatforms = undefined;
  }
  

  preload() {
    // this.load.image('backdrop', 'assets/backdrop.png')
    this.load.image('background', 'assets/Backgrounds/Bg01/Repeated.png');
    this.load.image('platform', 'assets/Platform/03/skeleton-animation_0.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
  }

  create() {
        this.cameras.main.setViewport(0, 0, 600, 800);
        // this.add.image(0, 0, 'background').setOrigin(0, 0);

        //Repeating background
        this.scrollingBackground = this.add.tileSprite(0, 0, 600, 800, 'background').setOrigin(0, 0);
        this.physics.add.image(300, 1500, 'platform')
      

        this.player = this.physics.add.sprite(300, 400, 'dude');
        this.physics.add.collider(this.player, this.scrollingPlatforms)

        this.player.body.setGravityY(200)

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

        this.cursors = this.input.keyboard.createCursorKeys();
        this.scoreText = this.add.text(50, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.cameras.main.startFollow(this.player).setLerp(0, 0)

  }

  update(){
    // Set background scrolling position
    this.scrollingBackground.tilePositionY += 20;

    // Movement controls listener
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

        // if (this.cursors.up.isDown)
        // {
        //   this.player.setVelocityY(-50);
        // }
  }
  
}