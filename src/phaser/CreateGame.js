import Phaser from "phaser";
import PhaserScene from "./PhaserScene";

export default class PhaserGame extends Phaser.Game {
    constructor(colorChoice, width, height) {
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
            arcade: {
                gravity: { y: -200 },
                debug: false
            }
        },
      };

      
      super(config);
      

      this.globals = {  };

      this.colorChoice = colorChoice;
      this.scene.add("PhaserScene", PhaserScene);
      this.scene.start("PhaserScene");
    }
    getPlayTime() {
        console.log(this)
        console.log(this.loop.now - this.loop.startTime)
        return this.loop.now - this.loop.startTime
    }
  }
  