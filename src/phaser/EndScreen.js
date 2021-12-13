import Phaser from 'phaser'

export default class EndScreen extends Phaser.Scene {
    constructor(destroyPhaserGame) {
        super('PauseMenu')
        this.destroyPhaserGame = destroyPhaserGame
        this.scoreCounter = 0
        this.playerName = 'Player'
    }

    init = (data) => {
        this.score = data.score
    }

    loadImages = () => {
        this.load.image('badge1', 'assets/Items/no animations/18.png')
        this.load.image('badge2', 'assets/Items/no animations/19.png')
        this.load.image('badge3', 'assets/Items/no animations/20.png')
    }

    createText = (xPosition, yPosition, propName, value, fontSize = '72px') => {
        this[propName] = this.add
            .text(xPosition, yPosition, value, {
                fontSize: fontSize,
                align: 'center',
            })
            .setOrigin(0.5, 0.5)
    }

    preload = () => {
        this.loadImages()
    }

    create = () => {
        this.createText(300, 200, 'playerText', this.playerName)

        this.time.delayedCall(
            1000,
            this.createText,
            [300, 300, 'youScoredText', 'you scored'],
            this
        )

        this.time.delayedCall(
            2000,
            this.createText,
            [300, 400, 'scoreText', 0],
            this
        )
    }

    update = () => {
        if (this.scoreText?.text < this.score) {
            this.scoreCounter += 10
            this.scoreText.setText(this.scoreCounter)
        }

        if (!this.congratsCreated && this.scoreCounter === this.score) {
            this.time.delayedCall(
                1000,
                this.createText,
                [300, 500, 'congratsText', 'Congratulations!', '48px'],
                this
            )
            this.congratsCreated = true
        }
    }
}
