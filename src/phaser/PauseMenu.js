import Phaser from "phaser";

export default class PauseMenu extends Phaser.Scene {
  constructor(destroyPhaserGame) {
    super("PauseMenu");
    this.isMuted = false;
    this.destroyPhaserGame = destroyPhaserGame;
  }

  createText = (
    xPosition,
    yPosition,
    propName,
    value,
    fontSize = "36px",
    color = "#5dc416",
    strokeText = true
  ) => {
    this[propName] = this.add
      .text(xPosition, yPosition, value, {
        fontSize: fontSize,
        align: "center",
        fontFamily: "'Press Start 2P'",
        color: color,
      })
      .setOrigin(0.5, 0.5)
      .setShadow(4, 4, "#333333", 4, false, true)
      .setScrollFactor(0);

    if (strokeText) this[propName].setStroke("black", 4);
  };

  preload() {
    // load in lightblue background
    this.load.image("menuBackground", "assets/lightblue-background.png");
    //load in background grey background
    this.load.image("menuBackground2", "assets/grey-background3.png");
    // load in menu button
    this.load.image("menuButton", "assets/Buttons/Blank.png");
  }

  create() {
    // add blue background
    this.background = this.add.image(300, 400, "menuBackground")
    this.background.alpha = 0.5;

    // add grey background
    this.menuBackground = this.add.image(300, 400, "menuBackground2");
    this.menuBackground.alpha = 0.5;

    // add resume button
    this.resumeButton = this.add
      .image(300, 250, "menuButton")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.resumeAll();
      });
    this.createText(300, 250, "resumeButtonText", "Resume");

    // exit button
    this.exitButton = this.add
      .image(300, 400, "menuButton")
      .setInteractive()
      .on("pointerdown", () => {
        this.game.destroyPhaserGame();
      });
    this.createText(300, 400, "menuButtonText", "Menu");

    // mute button
    this.muteButton = this.add
      .image(300, 550, "menuButton")
      .setInteractive()
      .on("pointerdown", () => {
        if (this.sound.mute) {
          this.sound.mute = false;
          this.muteButtonText.text = "Mute";
        } else {
          this.sound.mute = true;
          this.muteButtonText.text = "Unmute";
        }
      });

    this.createText(
      300,
      550,
      "muteButtonText",
      this.sound.mute ? "Unmute" : "Mute"
    );

    // add onClick event listener to resume button.
    // Closes this scene, and resumes game.
    this.resumeButton.on("pointerdown", () => {
      this.scene.stop().resume("PhaserScene");
    });
  }

  update() {}
}
