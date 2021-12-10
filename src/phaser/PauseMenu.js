import Phaser from 'phaser';

export default class PauseMenu extends Phaser.Scene {
    constructor(destroyPhaserGame) {
        super("PauseMenu");
        this.background = undefined;
        this.menuBackground = undefined;

        this.resumeButton = undefined;
        this.resumeButtonText = undefined;

        this.exitButton = undefined;
        this.exitButtonText = undefined;

        this.muteButton = undefined;
        this.muteButtonText = undefined;

        this.isMuted = false;

        this.destroyPhaserGame = destroyPhaserGame;
    }

    preload() {
        // load in lightblue background
        this.load.image("menuBackground","assets/lightblue-background.png");
        //load in background grey background
        this.load.image("menuBackground2","assets/grey-background3.png");
        // load in menu button
        this.load.image("menuButton","assets/menu-button.png");
    }

    create() {
        // add blue background 
        this.background = this.add.image(300,400,'menuBackground');
        this.add.text(10,10,"Blue 600x800 png", {
            fontSize: "12px",
        });
        this.background.alpha = 0.5;
        
        // add grey background
        this.menuBackground = this.add.image(300,400,"menuBackground2");
        this.add.text(100,130,"Grey 450x600 png", {
            fontSize: "12px",
        });
        this.menuBackground.alpha = 0.5;

        // add resume button
        this.resumeButton = this.add.image(300,250,"menuButton");
        // add text
        this.resumeButtonText = this.add.text(250, 240, "Resume", {
            fontSize: "30px",
            color: "black",
        });
        // make interactive
        this.resumeButton.setInteractive();
        this.resumeButton.on("pointerdown", () => {
            this.sound.resumeAll();
        })

        // exit button
        this.exitButton = this.add.image(300,400,"menuButton");
        this.exitButtonText = this.add.text(265, 390, "Exit", {
            fontSize: "30px",
            color: "black",
        });
        this.exitButton.setInteractive();
        //set onclick handler to exit game
        this.exitButton.on('pointerdown', () => {
            this.game.destroyPhaserGame()
        })

        // mute button
        this.muteButton = this.add.image(300, 550, "menuButton");
        this.muteButtonText = this.add.text(265, 540, this.sound.mute ? "Unmute" : "Mute", {
            fontSize: "30px",
            color: "black",
        });
        // make interactive
        this.muteButton.setInteractive();
        // mute button onclick handler
        this.muteButton.on('pointerdown', ()=> {
            if(this.sound.mute) {
                this.sound.mute = false;
                this.muteButtonText.text = "Mute";
            } else {
                this.sound.mute = true;
                this.muteButtonText.text = "Unmute";
            }
            
        })


        // add onClick event listener to resume button.
        // Closes this scene, and resumes game. 
        this.resumeButton.on('pointerdown', () => {
            console.log('clicked resume');
            this.scene.stop();
            this.scene.resume("PhaserScene");
        })
    }

    update() {

    }
}