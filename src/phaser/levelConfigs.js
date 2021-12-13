
   exports.getLevelConfig = (levelName) => {
    return levels[levelName]
   }
   
   const levels = {
    level1: {
    levelName: "Level 1",
    assetsPath: "assets/levels/Level 1/",
    background: "background.png",
    platformInformation: {platform1: {path: "assets/levels/Level 1/platform1.png",
    size: 260,
    distance: 900,
    randomY: 100,}},
    platformDistance: 1000,
    platformRandomY: 300,
    objectVelocityY: -400,
    starDistance: 900,
    powerups: ["powerup1", "powerup2", "powerup3", "powerup4"],
    powerupDistance: 3000,
    music: {
      name: "initial_sixty",
      path: "assets/music/funny_bit_60_sec.mp3",
    },
    platformSfx: {
      name: "platform_impact",
      path: "assets/music/sfx_sounds_falling3.wav",
    },
  },

  level2: {
    levelName: "Level 2",
    assetsPath: "assets/levels/Level 2/",
    background: "background.png",
    platformInformation: {platform1: {path: "assets/levels/Level 2/platform1.png",
    size: 57,
    distance: 300,
    randomY: 100,}, platform2: {path: "assets/levels/Level 2/platform2.png",
    size: 57,
    distance: 100,
    randomY: 100,}, platform3: {path: "assets/levels/Level 2/platform3.png",
    size: 57,
    distance: 200,
    randomY: 100,}},
    platformDistance: 1000,
    platformRandomY: 300,
    objectVelocityY: -400,
        starDistance: 1000,
    powerups: ["powerup1", "powerup2", "powerup3", "powerup4"],
      powerupDistance: 3000,
    music: {
      name: "partying_in_russia_60_sec",
      path: "assets/music/partying_in_russia_60_sec.mp3",
    },
    platformSfx: {
      name: "platform_impact",
      path: "assets/music/sfx_sounds_falling3.wav",
    },
  },



  level3: {
      levelName: "Level 3",
      assetsPath: "assets/levels/Level 3/",
      background: "background.png",
      platformInformation: {platform1: {path: "assets/levels/Level 3/platform1.png",
      size: 83,
      distance: 100,
      randomY: 100,}, platform2: {path: "assets/levels/Level 3/platform2.png",
      size: 57,
      distance: 100,
      randomY: 100,}, platform3: {path: "assets/levels/Level 3/platform3.png",
      size: 167,
      distance: 100,
      randomY: 100,}},
      platformDistance: 1000,
      platformRandomY: 300,
      objectVelocityY: -400,
          starDistance: 900,
      powerups: ["powerup1", "powerup2", "powerup3", "powerup4"],
      powerupDistance: 3000,
      music: {
        name: "lets_go_60_sec",
        path: "assets/music/lets_go_60_sec.mp3",
      },
      platformSfx: {
        name: "platform_impact",
        path: "assets/music/sfx_sounds_falling3.wav",
      },
    },

  level4: {
      levelName: "Level 4",
      assetsPath: "assets/levels/Level 4/",
      background: "background.png",
      platformInformation: {platform1: {path: "assets/levels/Level 4/platform1.png",
      size: 260,
      distance: 100,
      randomY: 100,}, platform2: {path: "assets/levels/Level 4/platform2.png",
      size: 57,
      distance: 100,
      randomY: 100,}, platform3: {path: "assets/levels/Level 4/platform3.png",
      size: 57,
      distance: 100,
      randomY: 100,}},
      platformDistance: 200,
      platformRandomY: 100,
      objectVelocityY: -600,
          starDistance: 1200,
      powerups: ["powerup1", "powerup2", "powerup3", "powerup4"],
      powerupDistance: 3000,
      music: {
        name: "boss_time_60_sec",
        path: "assets/music/boss_time_60_sec.mp3",
      },
      platformSfx: {
        name: "platform_impact",
        path: "assets/music/sfx_sounds_falling3.wav",
      },
    },


    level5: {
      levelName: "Level 5",
      assetsPath: "assets/levels/Level 5/",
      background: "background.png",
      platformInformation: {platform1: {path: "assets/levels/Level 5/platform1.png",
      size: 83,
      distance: 75,
      randomY: 50,}, platform2: {path: "assets/levels/Level 5/platform2.png",
      size: 57,
      distance: 100,
      randomY: 75,}, platform3: {path: "assets/levels/Level 5/platform3.png",
      size: 167,
      distance: 100,
      randomY: 50,}},
      platformDistance: 100,
      platformRandomY: 100,
      objectVelocityY: -400,
      starDistance: 900,
      powerups: ["powerup1", "powerup2", "powerup3", "powerup4"],
      powerupDistance: 3000,
      music: {
        name: "boss_time_60_sec",
        path: "assets/music/boss_time_60_sec.mp3",
      },
      platformSfx: {
        name: "platform_impact",
        path: "assets/music/sfx_sounds_falling3.wav",
      },
    }
    }