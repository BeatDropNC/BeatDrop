import Phaser from "phaser";
import PauseMenu from "./PauseMenu";
import PhaserScene from "./PhaserScene";

export default class PhaserGame extends Phaser.Game {
    constructor(colorChoice, width, height, destroyPhaserGame) {
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
      this.colorChoice = colorChoice;
      this.pauseScene = new PauseMenu(destroyPhaserGame);
      this.scene.add("PhaserScene", PhaserScene);
      this.scene.add("PauseMenu", this.pauseScene);
      this.scene.start("PhaserScene");
    }
    getPlayTime() {
        console.log(this)
        console.log(this.loop.now - this.loop.startTime)
        return this.loop.now - this.loop.startTime
    }
  }
  