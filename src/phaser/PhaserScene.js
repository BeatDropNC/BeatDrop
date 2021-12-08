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
    this.platformGroup = undefined;
    this.cursors = undefined;
    this.lastPlatform = undefined;
    this.gameInProgress = true;
    this.gap = 500;
    this.lastCreatedPlatform = undefined;
  }

  preload() {
    this.load.image("background", "assets/Backgrounds/Bg01/Repeated.png");
    this.load.image("platform", "assets/Platform/35.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {

    this.cameras.main.setViewport(0, 0, 600, 800);

    //Sets the size of the whole world, first two are the top corner of the word and then
    //we set height and width
    this.physics.world.setBounds(0, 0, 600, 100000);

    //Repeating background
    this.scrollingBackground = this.add
      .tileSprite(0, 0, 600, 800, "background")
      .setOrigin(0, 0);
    //Doesn't move with camera
    this.scrollingBackground.setScrollFactor(0);

    // Scrolling platforms
    this.platformGroup = this.physics.add.group();

    
    // Platform creation

    for (var i = 0; i < 4; i++) {
      const platform = this.platformGroup.create(
        Phaser.Math.RND.between(0, 338),
        this.gap + Phaser.Math.RND.between(100, 300),
        "platform"
      ).setOrigin(0, 0)
      this.lastPlatform = platform.y;
      this.gap += 1000;
      this.lastCreatedPlatform = platform;
    }


 
    //Sets velocity of platforms
    this.platformGroup.getChildren().forEach(item => {
      item.body.setVelocityY(-400)
    })
    

    // Create Player
    this.player = this.physics.add.sprite(300, 400, "dude");

    //Allows player to stop when reaches the end of the 'world'
    this.player.setCollideWorldBounds(true);
    this.player.body.setBounceY(0.01);

    //Set how much of the screen the camera sees
    this.cameras.main.setBounds(0, 0, 600, 100000);

    //Set the camera to follow the player
    this.cameras.main.startFollow(this.player);

    // Player physics
    this.player.body.setGravityY(50);
    this.player.body.setMaxVelocityY(70)
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);

    // Platform Collision Detection

    const hitPlatform = () => {
      if(this.gameInProgress){
        this.gameInProgress = false;
        this.player.body.setVelocity(0);
        this.player.body.position.x = 300;
        this.player.body.position.y = this.player.body.position.y - 100;
        // this.physics.pause();
        this.platformGroup.children.iterate((platform => {
          if(this.cameras.main.worldView.contains(platform.x, platform.y)){
              this.platformGroup.killAndHide(platform);
              const newY = this.lastCreatedPlatform.y + Phaser.Math.RND.between(1000, 1200);
              const newPlatform = this.platformGroup.get(Phaser.Math.RND.between(0, 338), newY);
              this.lastPlatform = newY;
              if(!newPlatform){
                return 
              }
              this.gap += 1000;
              newPlatform.setActive(true);
              newPlatform.setVisible(true);
              this.lastCreatedPlatform = newPlatform;
          }
        }))
        this.time.addEvent({delay: 1500, loop: false, callback: () => {
          this.gameInProgress = true;
          this.physics.resume()}
        })
      }
    }

    this.physics.add.collider(this.platformGroup);
    this.physics.add.overlap(this.player, this.platformGroup, hitPlatform, null, this);


    // Player sprite animation
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // Player input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Player score text
    this.scoreText = this.add.text(50, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });
  }

  update() {
    if (this.player.body.velocity.y > 10 && this.player.y > 0) {
      this.scrollingBackground.tilePositionY += 10;
    }

    if (this.player.y < 800) {
      this.player.setGravityY(50);
    } else {
      this.player.setGravityY(50);
    }

    // Movement controls listener
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);

      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    // Platform random generation

    this.platformGroup.children.iterate((platform) =>{
      if(platform.y < this.player.y - 600){
        this.platformGroup.killAndHide(platform);
        
        // Iterate through, get biggest Y
        const newY = this.lastCreatedPlatform.y + Phaser.Math.RND.between(900, 1100);
        
        const newPlatform = this.platformGroup.get(Phaser.Math.RND.between(0, 338), newY);
        this.lastPlatform = newY;
        if(!newPlatform){
          return 
        }
        newPlatform.setActive(true);
        newPlatform.setVisible(true);
        this.lastCreatedPlatform = newPlatform;
      }
    })
  }
}
