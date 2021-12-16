# BeatDrop
BeatDrop is a vertical scrolling video game created by [Atlas Sproson](https://www.linkedin.com/in/asproson/), [Alex Evans](https://github.com/alevans99), [Jack Marsden](https://github.com/marsj96), [James Jinks](https://www.linkedin.com/in/jamesajinks/), and [Sachin Naranji](https://github.com/snaranji01). 

It uses [PhaserJS](https://phaser.io) and [React](https://reactjs.org) to bundle, render, and serve the application, and [Firebase](https://firebase.google.com) to keep track of user's activities, accounts, and scores.

You have to dodge platforms, collect power ups, and avoid power downs to get a high score. You can keep track of your personal bests in the leaderboards and compare yourself to the all time records. Interact with other players and congratulate them on their high scores and achievements in the social feed and customise your game with a variety of levels and characters.

## Requirements
- npm 7.22.0 or above
- A Firebase account

## Installation
To install, clone this repository then in the root folder, type in a terminal:
`npm install`
You'll need an extra file called `firebaseConfig.json` with your Firebase credentials for the back-end of your instance to run in the `src/firebase` folder.
The file should have the following format:
`{
    "apiKey": "yourKey",
    "authDomain": "domain",
    "projectId": "yourProjectId",
    "storageBucket": "bucket",
    "messagingSenderId": "message",
    "appId": "yourAppId",
    "measurementId": "yourMeasurementId"
}`
You can find this information upon creating a new project on your [Firebase console](https://console.firebase.google.com/).

## Usage
Please note that the game assets currently aren't in the repository. Please contact a member of the team if you'd like them so you can run a local instance. To run a local instance of the app, type `npm start` in the terminal while in the root project folder.
