import Phaser from "phaser";
import EndScreen from "./EndScreen";
import PauseMenu from "./PauseMenu";
import PhaserScene from "./PhaserScene";

export default class PhaserGame extends Phaser.Game {
    constructor(levelChoice, width, height, destroyPhaserGame, submitScore, username, avatar) {
      const config = {
        type: Phaser.AUTO,
        parent: "phaser-container",

        width: width,
        height: height,
        scale: {
          zoom: 2,
          mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
      },
        physics: {
            
            default: 'arcade',
          
        },
      };

      
      super(config);
      
      this.avatar = avatar
      this.username = username;
      this.levelChoice = levelChoice;
      this.globals = {  };
      this.destroyPhaserGame = destroyPhaserGame;
      this.pauseScene = new PauseMenu(destroyPhaserGame);
      this.endScreen = new EndScreen(destroyPhaserGame)
      this.phaserScene = new PhaserScene(levelChoice, submitScore)
      this.scene.add("PhaserScene", this.phaserScene);
      this.scene.add("PauseMenu", this.pauseScene);
      this.scene.add("EndScreen", this.endScreen);
      this.scene.start("PhaserScene");
      this.textColor = () => {
        switch (this.levelChoice) {
          case "level1":
            return "#5dc416";
          case "level2":
            return "#bdbb8c";
          case "level3":
            return "#848461";
          case "level4":
            return "#c33c16";
          case "level5":
            return "#e6d678";
          default:
            return "#5dc416";
        }
      };
    }


    getPlayTime() {
        return this.loop.now - this.loop.startTime
    }
  }
  