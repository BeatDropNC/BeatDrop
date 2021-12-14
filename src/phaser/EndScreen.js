import Phaser from "phaser";

export default class EndScreen extends Phaser.Scene {
  constructor(destroyPhaserGame) {
    super("EndScreen");
    this.destroyPhaserGame = destroyPhaserGame;
    this.scoreCounter = 0;
    this.playerName = "Player";
  }

  init = (data) => {
    this.score = data.score;
  };

  loadImages = () => {
    this.load.image("badge1", "assets/Items/no animations/18.png");
    this.load.image("badge2", "assets/Items/no animations/19.png");
    this.load.image("badge3", "assets/Items/no animations/20.png");
    this.load.image("menu-button", "assets/menu-button.png");
  };

  createText = (
    xPosition,
    yPosition,
    propName,
    value,
    fontSize = "48px",
    color = "#5dc416",
    strokeText = true
  ) => {
    this[propName] = this.add
      .text(xPosition, yPosition, value, {
        fontSize: fontSize,
        align: "center",
        fontFamily: "'Press Start 2P'",
        color: color,
        "-webkit-text-stroke": "1px black",
      })
      .setOrigin(0.5, 0.5)
      .setShadow(2, 2, "#333333", 2, false, true)

      if (strokeText) this[propName].setStroke("black", 4)
  };

  createBadges = () => {
    if (this.score > 1000) this.add.sprite(150, 500, "badge1");
    if (this.score > 5000) this.add.sprite(300, 500, "badge2");
    if (this.score > 6000) this.add.sprite(450, 500, "badge3");

    this.badgesCreated = true;
  };

  createButtons = () => {
    this.retryButton = this.add
      .image(150, 620, "menu-button")
      .setInteractive()
      .on("pointerdown", () => {
        console.log("retry clicked");
      });
    this.createText(150, 620, "retryButtonText", "Retry", "32px", "black", false);

    this.retryButton = this.add
      .image(450, 620, "menu-button")
      .setInteractive()
      .on("pointerdown", () => {
        this.game.destroyPhaserGame();
      });
    this.createText(450, 620, "exitButtonText", "Exit", "32px", "black", false);
  };

  preload = () => {
    this.loadImages();
  };

  create = () => {
    this.createText(300, 200, "playerText", this.playerName);

    this.time.delayedCall(
      1000,
      this.createText,
      [300, 300, "youScoredText", "you scored"],
      this
    );

    this.time.delayedCall(
      2000,
      this.createText,
      [300, 400, "scoreText", 0],
      this
    );
  };

  update = () => {
    if (this.scoreText?.text < this.score) {
      if (this.score > 10000) this.scoreCounter += 100;
      else this.scoreCounter += 10;
      this.scoreText.setText(this.scoreCounter);
    } else if (this.scoreText) {
      this.scoreCounter = this.score;
      this.scoreText.setText(this.scoreCounter);
    }

    if (this.scoreCounter === this.score) {
      this.time.delayedCall(1000, this.createBadges, [], this);
    }

    if (this.badgesCreated) {
      this.time.delayedCall(1000, this.createButtons, [], this);
    }
  };
}
