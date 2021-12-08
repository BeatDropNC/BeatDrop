import Phaser from "phaser";

export default class PhaserScene extends Phaser.Scene {
  constructor() {
    super("PhaserScene");
    this.gameOver = false;
    this.player = undefined;
    this.score = 0;
    this.scoreText = undefined;
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
    this.starGap = 500;
    this.lastCreatedPlatform = undefined;
    this.floor = undefined
    this.gameEndInProgress = false;
    this.starsGroup = undefined;
    this.lastStar = undefined;
    this.lastCreatedStar = undefined;
    this.music = undefined;
    this.platformImpactSFX = undefined;
    this.starCollectionSFX = undefined;
    this.gameMusic = {};
  }

  preload() {
    this.load.image("background", "assets/Backgrounds/Bg01/Repeated.png");
    this.load.image("platform", "assets/Platform/35.png");
    this.load.image("star", "assets/star.png")
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("floor", "assets/Platform/floor.png" )

    // Music generation
    this.load.audio("initial_sixty", "assets/music/funny_bit_60_sec.mp3");
    this.load.audio("platform_impact", "assets/music/sfx_sounds_falling3.wav");
    this.load.audio("star_collection", "assets/music/sfx_sounds_fanfare3.wav");
  }

  create() {

    // Turns on music
    this.gameMusic.music = this.sound.add("initial_sixty");
    this.gameMusic.platformImpactSFX = this.sound.add("platform_impact");
    this.gameMusic.starCollectionSFX = this.sound.add("star_collection");
    this.gameMusic.music.play();

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

    // Scrolling stars
    this.starsGroup = this.physics.add.group();
    
    // Star creation
    for(let i = 0; i < 2; i++){
      const star = this.starsGroup.create(
        Phaser.Math.RND.between(0, 338),
        this.starGap + Phaser.Math.RND.between(100, 300),
        "star"
      ).setOrigin(0, 0)
      this.lastStar = star.y;
      this.starGap += 1000;
      this.lastCreatedStar = star;
    }

    //Sets velocity of platforms
    this.platformGroup.getChildren().forEach(item => {
      item.body.setVelocityY(-400)
    })

    // Sets velocity of stars
    this.starsGroup.getChildren().forEach(item => {
      item.body.setVelocityY(-400);
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
    this.physics.collide(this.player, )

    // Platform Collision Detection

    const hitPlatform = () => {
      if(this.gameInProgress){
        this.gameMusic.platformImpactSFX.play();
        this.cameras.main.shake(500, 0.004)
        this.gameInProgress = false;
        this.player.body.setVelocity(0);
        this.player.body.position.x = 300;
        this.player.body.position.y = this.player.body.position.y - 100;
        this.physics.pause();
        this.updateScore(-2000)
        this.platformGroup.children.iterate((platform => {
          if(this.cameras.main.worldView.contains(platform.x, platform.y)){
              this.platformGroup.killAndHide(platform);
              if(!this.gameEndInProgress) {
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
              
          }
        }))
        this.time.addEvent({delay: 1500, loop: false, callback: () => {
          this.gameInProgress = true;
          this.physics.resume()}
        })
      }
    }

    //Floor
    this.time.addEvent({delay: 10000, loop: false, callback: () => {
        this.gameEndInProgress = true

        const playerPosition = this.player.body.y
        this.player.setGravityY(300)
        this.player.setMaxVelocity(300)
        this.player.setVelocityY(300)
        console.log(this.player.body)
        this.gameInProgress = false

        this.physics.world.setBounds(0, 0, 600, playerPosition + 1000);

        this.platformGroup.children.iterate((platform)=>{
          if(!this.cameras.main.worldView.contains(platform.x, platform.y)) {
            this.platformGroup.killAndHide(platform)
          } 
        })

        this.cameras.main.setBounds(0, 0, 600, playerPosition + 1000);
        this.floor = this.physics.add.image(300 , playerPosition + 971.5, 'floor').setImmovable()
        this.physics.add.collider(this.player, this.floor, endLevel, null, this)
      }})
    
    const endLevel = () => {
      console.log("End of game")
    }

    this.physics.add.collider(this.platformGroup);
    this.physics.add.overlap(this.player, this.platformGroup, hitPlatform, null, this);

    // Star Collision detection

    const hitStarAddScore = () => {
      // Increment score
    }

    // || resolves the issue of stars spawning inside platforms
    // if star inside platform, killandHide, respawn star
    const hitStar = () => {
      this.starsGroup.children.iterate((star => {
        if(this.cameras.main.worldView.contains(star.x, star.y) || this.physics.add.overlap(star, this.platformGroup, null, this)){
          this.gameMusic.starCollectionSFX.play();
          this.starsGroup.killAndHide(star);
          const newStarY = this.lastCreatedStar.y + Phaser.Math.RND.between(1000, 1200);
          const newStar = this.starsGroup.get(Phaser.Math.RND.between(0, 338), newStarY);
          this.lastStar = newStarY;
          hitStarAddScore();
          if(!newStar){
            return
          }
          this.starGap += 1000;
          newStar.setActive(true);
          newStar.setVisible(true);
          this.lastCreatedStar = newStar;
        }
      }))
    }

    this.physics.add.collider(this.starsGroup);
    this.physics.add.overlap(this.player, this.starsGroup, hitStar, null, this);

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
    this.scoreText = this.add.text(50, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#000",
    });
    //Not affected by scrolling
    this.scoreText.setScrollFactor(0);

    

  }

  update() {

    if (this.player.body.velocity.y > 10 && this.player.y > 0) {
      this.scrollingBackground.tilePositionY += 10;
      // this.score += 10
      // this.scoreText.setText(`score: ${this.score}`)
      this.updateScore(10)
    }

    if (this.player.y < 800 && !this.gameEndInProgress) {
      this.player.setGravityY(50);
    } else if(this.player.y > 800 && !this.gameEndInProgress) {
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
      if(platform.y < this.player.y - 600 && !this.gameEndInProgress){
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

    // Star random generation
    this.starsGroup.children.iterate((star) => {
      
      if(star.y < this.player.y - 600){
        this.starsGroup.killAndHide(star);
        // Iterate through, get biggest Y
        const newStarY = this.lastCreatedStar.y + Phaser.Math.RND.between(900, 1100);
        const newStar = this.starsGroup.get(Phaser.Math.RND.between(0, 338), newStarY);
        this.lastCreatedStar = newStarY;
        if(!newStar){
          return
        }
        newStar.setActive(true);
        newStar.setVisible(true);
        this.lastCreatedStar = newStar;
      }
    })
  }


  updateScore(updateAmount){

    const color = updateAmount < 0 ? '#d40000' : '#000'

    this.score += updateAmount
    this.scoreText.setText(`Score: ${this.score}`)
    this.scoreText.setFill(color)
  }  


}
