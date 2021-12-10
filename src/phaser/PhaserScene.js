import Phaser from 'phaser'

export default class PhaserScene extends Phaser.Scene {
    constructor() {
        super('PhaserScene')
        this.gameOver = false
        this.player = undefined
        this.score = 0
        this.scoreText = undefined
        this.gameInfo = {
            playTime: 0,
        }
        this.scrollingBackground = undefined
        this.scrollingPlatforms = undefined
        this.platformGroup = undefined
        this.cursors = undefined
        this.lastPlatform = undefined
        this.gameInProgress = true
        this.gap = 1000
        this.starGap = 500
        this.lastCreatedPlatform = undefined
        this.floor = undefined
        this.gameEndInProgress = false
        this.gameOver = false
        this.starsGroup = undefined
        this.lastStar = undefined
        this.lastCreatedStar = undefined
        this.gameTimer = undefined
        this.gameMusic = {}

        this.powerupGap = 1500
        this.powerupsGroup = undefined
        this.lastPowerup = undefined
        this.lastCreatedPowerup = undefined

        this.menuButton = undefined
    }

    loadAudio = () => {
        this.load.audio('initial_sixty', 'assets/music/funny_bit_60_sec.mp3')
        this.load.audio(
            'platform_impact',
            'assets/music/sfx_sounds_falling3.wav'
        )
        this.load.audio(
            'star_collection',
            'assets/music/sfx_sounds_fanfare3.wav'
        )
    }

    loadImages = () => {
        this.load.image('background', 'assets/Backgrounds/Bg01/Repeated.png')
        this.load.image('platform', 'assets/Platform/35.png')
        this.load.image('star', 'assets/star.png')

        this.load.image('powerup1', 'assets/Items/no animations/01.png')
        this.load.image('powerup2', 'assets/Items/no animations/02.png')
        this.load.image('powerup3', 'assets/Items/no animations/03.png')
        this.load.image('powerup4', 'assets/Items/no animations/04.png')
        this.load.image('powerup5', 'assets/Items/no animations/05.png')

        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48,
        })
        this.load.image('floor', 'assets/Platform/floor.png')
    }

    startMusic = () => {
        this.gameMusic.music = this.sound.add('initial_sixty')
        this.gameMusic.platformImpactSFX = this.sound.add('platform_impact')
        this.gameMusic.starCollectionSFX = this.sound.add('star_collection')
        this.gameMusic.music.play()
    }

    animateBackground = () => {
        //Repeating background
        this.scrollingBackground = this.add
            .tileSprite(0, 0, 600, 800, 'background')
            .setOrigin(0, 0)
        //Doesn't move with camera
        this.scrollingBackground.setScrollFactor(0)
    }

    createPlatforms = () => {
        this.platformGroup = this.physics.add.group()

        for (let i = 0; i < 4; i++) {
            const platform = this.platformGroup
                .create(
                    Phaser.Math.RND.between(0, 338),
                    this.gap + Phaser.Math.RND.between(100, 300),
                    'platform'
                )
                .setOrigin(0, 0)
            this.lastPlatform = platform.y
            this.gap += 1000
            this.lastCreatedPlatform = platform
        }

        this.platformGroup.getChildren().forEach((item) => {
            item.setVelocityY(-400)
        })
    }

    createStars = () => {
        this.starsGroup = this.physics.add.group()

        for (let i = 0; i < 4; i++) {
            const star = this.starsGroup
                .create(
                    Phaser.Math.RND.between(0, 570),
                    this.starGap + Phaser.Math.RND.between(100, 300),
                    'star'
                )
                .setOrigin(0, 0)
            this.lastStar = star.y
            this.starGap += 1000
            this.lastCreatedStar = star
        }

        //   Move overlapping stars
        this.physics.world.step(0)
        this.physics.world.overlap(
            this.starsGroup,
            this.platformGroup,
            (star, platform) => {
                star.body.reset(star.body.x, star.body.y + 300)
            }
        )

        this.starsGroup.getChildren().forEach((item) => {
            item.setVelocityY(-400)
        })
    }

    createPowerups = () => {
        const powerups = [
            'powerup1',
            'powerup2',
            'powerup3',
            'powerup4',
            'powerup5',
        ]

        this.powerupsGroup = this.physics.add.group()

        for (let i = 0; i < 10; i++) {
            const powerup = this.powerupsGroup
                .create(
                    Phaser.Math.RND.between(0, 570),
                    this.powerupGap + Phaser.Math.RND.between(300, 600),
                    powerups[Math.floor(Math.random() * 5)]
                )
                .setOrigin(0, 0)
            this.lastPowerup = powerup.y
            this.powerupGap += 1000
            this.lastCreatedPowerup = powerup
        }

        //   Move overlapping powerups
        this.physics.world.step(0)
        this.physics.world.overlap(
            this.powerupsGroup,
            this.platformGroup,
            (powerup, platform) => {
                powerup.body.reset(powerup.body.x, powerup.body.y + 300)
            }
        )

        this.powerupsGroup.getChildren().forEach((item) => {
            item.setVelocityY(-400)
        })
    }

    createPlayer = () => {
        this.player = this.physics.add.sprite(300, 400, 'dude')
        this.player.setCollideWorldBounds(true)
        this.player.body.setBounceY(0.1)

        // Player input
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    setPlayerPhysics = () => {
        this.player.body.setGravityY(50)
        this.player.body.setMaxVelocityY(70)
        this.player.setBounce(0.1)

        this.physics.add.overlap(
            this.player,
            this.platformGroup,
            this.detectPlatformCollisions,
            null,
            this
        )
    }

    setPlayerAnimation = () => {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20,
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        })
    }

    detectPlatformCollisions = (player, platform) => {
        if (this.gameInProgress) {
            this.gameMusic.platformImpactSFX.play()
            this.tweens.add({
                targets: this.player,
                alpha: 0,
                ease: 'Cubic.easeOut',
                duration: 100,
                repeat: 2,
                yoyo: true,
            })
            this.cameras.main.shake(500, 0.004)
            this.gameInProgress = false
            this.player.body.setVelocity(0)
            this.physics.pause()
            this.updateScore(-2000)
            this.platformGroup.killAndHide(platform)

            if (!this.gameEndInProgress) {
                const newY =
                    this.lastCreatedPlatform.y +
                    Phaser.Math.RND.between(1000, 1200)
                const newPlatform = this.platformGroup.get(
                    Phaser.Math.RND.between(0, 338),
                    newY
                )
                this.lastPlatform = newY
                if (!newPlatform) {
                    return
                }
                this.gap += 1000
                newPlatform.setActive(true)
                newPlatform.setVisible(true)
                this.lastCreatedPlatform = newPlatform
            } else {
                this.platformGroup.killAndHide(platform)

                platform.destroy()
            }

            this.time.addEvent({
                delay: 1500,
                loop: false,
                callback: () => {
                    this.gameInProgress = true
                    this.physics.resume()
                },
            })
        }
    }

    setupUserStarInteraction = () => {
        // || resolves the issue of stars spawning inside platforms
        // if star inside platform, killandHide, respawn star

        this.physics.add.collider(this.starsGroup)
        this.physics.add.overlap(
            this.player,
            this.starsGroup,
            this.detectStarCollisions,
            null,
            this
        )
    }

    detectStarCollisions = (player, star) => {
        this.starsGroup.killAndHide(star)
        const newStarY =
            this.lastCreatedStar.y + Phaser.Math.RND.between(1000, 1200)
        const newStar = this.starsGroup.get(
            Phaser.Math.RND.between(0, 338),
            newStarY
        )
        this.lastStar = newStarY
        this.hitStarAddScore()
        if (!newStar) {
            return
        }
        this.starGap += 1000
        newStar.setActive(true)
        newStar.setVisible(true)
        this.lastCreatedStar = newStar
    }

    startEndGame = () => {
        this.gameTimer = this.time.addEvent({
            delay: 50000,
            callbackScope: this,
            loop: false,
            callback: this.endGame,
        })
    }

    pauseMenu = () => {
        this.button = this.add
            .text(470, 40, 'Pause', {
                fontSize: '26px',
                fill: '#000',
                backgroundColor: 'green',
            })
            .setOrigin(0, 0)
        this.button.setScrollFactor(0)
        this.button.setInteractive()
        this.button.on('pointerdown', () => {
            console.log('CLICKED PAUSE')

            this.sound.pauseAll()
            this.scene.pause('PhaserScene')
            this.scene.launch('PauseMenu')
        })
    }

    endGame = () => {
        this.gameEndInProgress = true
        const playerPosition = this.player.body.y
        const newWorldBounds = playerPosition + 1000

        this.physics.world.setBounds(0, 0, 600, newWorldBounds)
        this.cameras.main.setBounds(0, 0, 600, newWorldBounds)
        this.floor = this.physics.add
            .image(300, newWorldBounds - 28.5, 'floor')
            .setImmovable()
        this.physics.add.collider(
            this.player,
            this.floor,
            this.endLevel,
            null,
            this
        )

        this.player.setGravityY(300)
        this.player.setMaxVelocity(300)
        this.player.setVelocityY(300)
    }

    endLevel = () => {
        if (!this.gameOver) {
            console.log('End of game')
            this.gameOver = true
            this.physics.pause()
        }
    }

    hitStarAddScore = () => {
        // Increment score
        this.updateScore(5000)
        this.gameMusic.starCollectionSFX.play()
    }

    updateScore(updateAmount) {
        const color = updateAmount < 0 ? '#d40000' : '#000'

        this.score += updateAmount
        this.scoreText.setText(`Score: ${this.score}`)
        this.scoreText.setFill(color)
    }

    playerScore = () => {
        this.scoreText = this.add.text(50, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#000',
        })

        //Not affected by scrolling
        this.scoreText.setScrollFactor(0)
    }

    recyclePowerups = () => {
        if (!this.gameEndInProgress) {
            this.powerupsGroup.children.iterate((powerup) => {
                if (powerup !== undefined && powerup.y < this.player.y - 800) {
                    this.powerupsGroup.killAndHide(powerup)

                    if (!this.gameEndInProgress) {
                        // Iterate through, get biggest Y
                        const newPowerupY =
                            this.lastCreatedPowerup.y +
                            Phaser.Math.RND.between(900, 1100)
                        const newPowerup = this.powerupsGroup.get(
                            Phaser.Math.RND.between(0, 338),
                            newPowerupY
                        )

                        this.lastCreatedPowerup = newPowerupY
                        if (!newPowerup) {
                            return
                        }
                        newPowerup.setActive(true)
                        newPowerup.setVisible(true)
                        this.lastCreatedPowerup = newPowerup
                    }
                }
            })
        } else {
            this.powerupsGroup.children.iterate((powerup) => {
                if (!powerup) {
                    return
                }
                if (
                    powerup.y > this.player.body.y + 400 ||
                    powerup.y < this.player.body.y - 800
                ) {
                    powerup.destroy()
                }
            })
        }
    }
    preload() {
        this.loadImages()
        this.loadAudio()
    }

    create() {
        this.startMusic()
        this.animateBackground()

        this.cameras.main.setViewport(0, 0, 600, 800)

        //Sets the size of the whole world, first two are the top corner of the word and then
        //we set height and width
        this.physics.world.setBounds(0, 0, 600, 100000)

        this.createPlatforms()
        this.createStars()
        this.createPowerups()
        this.createPlayer()

        //Set how much of the screen the camera sees
        this.cameras.main.setBounds(0, 0, 600, 100000)

        //Set the camera to follow the player
        this.cameras.main.startFollow(this.player)

        this.setPlayerPhysics()

        this.startEndGame()

        this.setupUserStarInteraction()

        this.setPlayerAnimation()

        this.pauseMenu()
        this.playerScore()
    }

    update() {
        if (this.player.body.velocity.y > 10 && this.player.y > 0) {
            this.scrollingBackground.tilePositionY += 10
            // this.score += 10
            // this.scoreText.setText(`score: ${this.score}`)
            this.updateScore(10)
        }

        // Movement controls listener
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300)

            this.player.anims.play('left', true)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300)

            this.player.anims.play('right', true)
        } else {
            this.player.setVelocityX(0)
            this.player.anims.play('turn')
        }

        // Platform random generation

        if (!this.gameEndInProgress) {
            this.platformGroup.children.iterate((platform) => {
                if (
                    platform !== undefined &&
                    platform.y < this.player.y - 800
                ) {
                    this.platformGroup.killAndHide(platform)

                    if (!this.gameEndInProgress) {
                        const newY =
                            this.lastCreatedPlatform.y +
                            Phaser.Math.RND.between(900, 1100)
                        const newPlatform = this.platformGroup.get(
                            Phaser.Math.RND.between(0, 338),
                            newY
                        )
                        this.lastPlatform = newY
                        if (!newPlatform) {
                            return
                        }
                        newPlatform.setActive(true)
                        newPlatform.setVisible(true)
                        this.lastCreatedPlatform = newPlatform
                    }
                }
            })
        } else {
            this.platformGroup.children.iterate((platform) => {
                if (!platform) {
                    return
                }

                if (
                    platform.y > this.player.body.y + 400 ||
                    platform.y < this.player.body.y - 800
                ) {
                    platform.destroy()
                }
            })
        }

        if (!this.gameEndInProgress) {
            this.starsGroup.children.iterate((star) => {
                if (star !== undefined && star.y < this.player.y - 800) {
                    this.starsGroup.killAndHide(star)

                    if (!this.gameEndInProgress) {
                        // Iterate through, get biggest Y
                        const newStarY =
                            this.lastCreatedStar.y +
                            Phaser.Math.RND.between(900, 1100)
                        const newStar = this.starsGroup.get(
                            Phaser.Math.RND.between(0, 338),
                            newStarY
                        )

                        this.lastCreatedStar = newStarY
                        if (!newStar) {
                            return
                        }
                        newStar.setActive(true)
                        newStar.setVisible(true)
                        this.lastCreatedStar = newStar
                    }
                }
            })
        } else {
            this.starsGroup.children.iterate((star) => {
                if (!star) {
                    return
                }
                if (
                    star.y > this.player.body.y + 400 ||
                    star.y < this.player.body.y - 800
                ) {
                    star.destroy()
                }
            })
        }
        this.recyclePowerups()
    }
}
