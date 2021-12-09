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
    this.gap = 1000;
    this.starGap = 500;
    this.lastCreatedPlatform = undefined;
    this.floor = undefined
    this.gameEndInProgress = false;
    this.gameOver = false
    this.starsGroup = undefined;
    this.lastStar = undefined;
    this.lastCreatedStar = undefined;
    this.gameTimer = undefined
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

    for (let i = 0; i < 4; i++) {
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
    for(let i = 0; i < 4; i++){
      const star = this.starsGroup.create(
        Phaser.Math.RND.between(0, 570),
        this.starGap + Phaser.Math.RND.between(100, 300),
        "star"
      ).setOrigin(0, 0)
      this.lastStar = star.y;
      this.starGap += 1000;
      this.lastCreatedStar = star;
    }


  //   Move overlapping stars
  this.physics.world.step(0);
  this.physics.world.overlap(this.starsGroup, this.platformGroup, function (star, platform) {
    star.body.reset(star.body.x, star.body.y + 300);
  });





    //Sets velocity of platforms
    this.platformGroup.getChildren().forEach(item => {
      item.setVelocityY(-400)
    })

    // Sets velocity of stars
    this.starsGroup.getChildren().forEach(item => {
      item.setVelocityY(-400);
    })

    // Create Player
    this.player = this.physics.add.sprite(300, 400, "dude");

    //Allows player to stop when reaches the end of the 'world'
    this.player.setCollideWorldBounds(true);
    this.player.body.setBounceY(0.1);

    //Set how much of the screen the camera sees
    this.cameras.main.setBounds(0, 0, 600, 100000);

    //Set the camera to follow the player
    this.cameras.main.startFollow(this.player);

    // Player physics
    this.player.body.setGravityY(50);
    this.player.body.setMaxVelocityY(70)
    this.player.setBounce(0.1);
   

    // Platform Collision Detection

    const hitPlatform = (player, platform) => {

      if(this.gameInProgress){
        this.gameMusic.platformImpactSFX.play();
        this.tweens.add({
          targets: this.player,
          alpha: 0,
          ease: 'Cubic.easeOut',
          duration: 100,
          repeat: 2,
          yoyo: true,
        })
        this.cameras.main.shake(500, 0.004)
        this.gameInProgress = false;
        this.player.body.setVelocity(0);
        this.physics.pause();
        this.updateScore(-2000)
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
        } else {
          this.platformGroup.killAndHide(platform)

          platform.destroy()
        }


        this.time.addEvent({delay: 1500, loop: false, callback: () => {
          this.gameInProgress = true;
          this.physics.resume()}

        })
      } 
    }



    this.physics.add.overlap(this.player, this.platformGroup, hitPlatform, null, this);


    const endGame = () => {
      this.gameEndInProgress = true
      const playerPosition = this.player.body.y
      const newWorldBounds = playerPosition + 1000
      
      this.physics.world.setBounds(0, 0, 600, newWorldBounds);
      this.cameras.main.setBounds(0, 0, 600, newWorldBounds);
      this.floor = this.physics.add.image(300 , newWorldBounds - 28.5, 'floor').setImmovable()
      this.physics.add.collider(this.player, this.floor, endLevel, null, this)

      this.player.setGravityY(300)
      this.player.setMaxVelocity(300)
      this.player.setVelocityY(300)
    }
  

    //Start End Game
    this.gameTimer = this.time.addEvent({delay: 50000, callbackScope:this, loop: false, callback: endGame})
    
    const endLevel = () => {
      if(!this.gameOver){
      console.log("End of game")
        this.gameOver = true
       this.physics.pause()
      }
    }



    // Star Collision detection

    const hitStarAddScore = () => {
      // Increment score
      this.updateScore(5000)
      this.gameMusic.starCollectionSFX.play();
    }

    // || resolves the issue of stars spawning inside platforms
    // if star inside platform, killandHide, respawn star
    const hitStar = (player, star) => {

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

    if (!this.gameEndInProgress){

    this.platformGroup.children.iterate((platform) =>{

      if(platform !== undefined && platform.y < this.player.y - 800){

        this.platformGroup.killAndHide(platform);

        if (!this.gameEndInProgress){
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
      }
    })
  } else {
    this.platformGroup.children.iterate((platform) =>{
      if (!platform){
        return
      }
      
      if (platform.y > this.player.body.y + 400 || platform.y < this.player.body.y - 800){
        
        platform.destroy()
      }

    })
  }


  if (!this.gameEndInProgress){

    this.starsGroup.children.iterate((star) =>{

      if(star !== undefined && star.y < this.player.y - 800){

        this.starsGroup.killAndHide(star);

        if (!this.gameEndInProgress){
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
      }
    })
  } else {
    this.starsGroup.children.iterate((star) =>{
      if (!star){
        return
      }
      if (star.y > this.player.body.y + 400 || star.y < this.player.body.y - 800){
        
        star.destroy()
      }

    })
  }




  }


  updateScore(updateAmount){

    const color = updateAmount < 0 ? '#d40000' : '#000'

    this.score += updateAmount
    this.scoreText.setText(`Score: ${this.score}`)
    this.scoreText.setFill(color)
  }  


}
