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
    color = this.game.textColor,
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
    this.load.image("menuBackground", "assets/lightblue-background.png");
    this.load.image("menuBackground2", "assets/grey-background3.png");

    this.load.image("retry-button", "assets/Buttons/Retry.png");
    this.load.image("quit-button", "assets/Buttons/Quit.png");

    this.load.image("resume-button", "assets/Buttons/Resume.png");
    this.load.image("menu-button", "assets/Buttons/Menu.png");
    this.load.image("mute-button", "assets/Buttons/Mute.png");
    this.load.image("unmute-button", "assets/Buttons/Unmute.png");
  }

  create() {
    this.background = this.add.image(300, 400, "menuBackground");
    this.background.alpha = 0.5;

    this.menuBackground = this.add.image(300, 400, "menuBackground2");
    this.menuBackground.alpha = 0.5;

    this.resumeButton = this.add
      .image(300, 250, "resume-button")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.resumeAll();
        this.scene.stop().resume("PhaserScene");
      });

    this.quitButton = this.add
      .image(300, 400, "quit-button")
      .setInteractive()
      .on("pointerdown", () => {
        this.game.destroyPhaserGame();
      });

    this.unMuteButton = this.add
      .image(300, 550, "unmute-button")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.mute = false;
        this.unMuteButton.setVisible(false);
        this.muteButton.setVisible(true);
      });

    this.muteButton = this.add
      .image(300, 550, "mute-button")
      .setInteractive()
      .on("pointerdown", () => {
        this.sound.mute = true;
        this.muteButton.setVisible(false);
        this.unMuteButton.setVisible(true);
      });

    this.sound.mute
      ? this.muteButton.setVisible(false)
      : this.unMuteButton.setVisible(false);
  }
}
