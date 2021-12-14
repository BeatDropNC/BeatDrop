import Phaser from "phaser";
import EndScreen from "./EndScreen";
import PauseMenu from "./PauseMenu";
import PhaserScene from "./PhaserScene";

export default class PhaserGame extends Phaser.Game {
    constructor(levelChoice, width, height, destroyPhaserGame, submitScore) {
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
      

      this.globals = {  };
      this.destroyPhaserGame = destroyPhaserGame;
      this.pauseScene = new PauseMenu(destroyPhaserGame);
      this.endScreen = new EndScreen(destroyPhaserGame)
      this.phaserScene = new PhaserScene(levelChoice, submitScore)
      this.scene.add("PhaserScene", this.phaserScene);
      this.scene.add("PauseMenu", this.pauseScene);
      this.scene.add("EndScreen", this.endScreen);
      this.scene.start("PhaserScene");
    }
    getPlayTime() {
        console.log(this)
        console.log(this.loop.now - this.loop.startTime)
        return this.loop.now - this.loop.startTime
    }
  }
  