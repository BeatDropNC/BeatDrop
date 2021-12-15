import { Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserUidContext } from "../contexts/UserUidContext";
import { getGlobalLeaderboard, patchGlobalLeaderboardScore, patchUserBadges, patchUserScores, postNewActivity } from "../firebase/firebase.api";
import CreateGame from "../phaser/CreateGame";
import "../styles/ReactGameContainer.css";
function ReactGameContainer({
  levelChoice,
  setGameTime,
}) {
  const { userInformation, setUserInformation, userUid } = useContext(UserUidContext);
  const [gameEnd, setGameEnd] = useState(false);

  const submitScore = async (newScore) => {

    // get current highscores for played level from user context
    const currentLevelScores = userInformation["userScores"][levelChoice];
    // if score is a personal user high score, continue posting to users collection and updating local state.
    if (newScore > currentLevelScores[currentLevelScores.length - 1].score) {
      const newLevelScores = [...currentLevelScores];
      newLevelScores.push({ score: newScore, timeCompletedAt: Timestamp.fromDate(new Date()) })
      newLevelScores.sort((a, b) => b.score - a.score);
      newLevelScores.pop();

      // patch new highscore to 'users' collection on firestore
      await patchUserScores(userUid, newLevelScores, levelChoice)
        .then(async () => {
          console.log("New high score was updated!")
        })

      // set local user state
      setUserInformation(currentUserInformation => {
        const newUserInformation = JSON.parse(JSON.stringify(currentUserInformation));
        newUserInformation["userScores"][levelChoice] = newLevelScores;
        return newUserInformation
      })



      // check global leaderboard. If a global highscore, also patch that level's global leaderboard.
      const response = await getGlobalLeaderboard();
      const currentGlobalLevelScores = response[levelChoice]["scoresList"];
      currentGlobalLevelScores.sort((a, b) => b.score - a.score);
      if (newScore > currentGlobalLevelScores[currentGlobalLevelScores.length - 1].score) {
        const newGlobalLevelScores = [...currentGlobalLevelScores];
        console.log(newGlobalLevelScores)
        newGlobalLevelScores.push({ score: newScore, username: userInformation.username, timeCompletedAt: Timestamp.fromDate(new Date()) })
        newGlobalLevelScores.sort((a, b) => b.score - a.score);
        newGlobalLevelScores.pop();

        //patch new global highscore to global leaderboard
        await patchGlobalLeaderboardScore(levelChoice, newGlobalLevelScores)
          .then(() => {
            console.log("New global high score was achieved!")
            await postNewActivity(userInformation.username, null, newScore, levelChoice);
          })

      } else {
        console.log("Not a global high score.")
      }
    } else {
      console.log("Not a high score.")
    }


    // copies existing user badges from user context, and assigns to toPatchBadgesObj variable.
    const toPatchBadgesObj = JSON.parse(JSON.stringify(userInformation.badges));
    
    // sequentially updates toPatchBadgesObj badges based on game score
    const isUpdatedObj = {};
    if (newScore > 50 && !userInformation.badges[levelChoice].bronze) {
      toPatchBadgesObj[levelChoice].bronze = true;
      isUpdatedObj.bronze = true;
    } else {
      isUpdatedObj.bronze = false;
    }

    if (newScore > 100000 && !userInformation.badges[levelChoice].silver) {
      toPatchBadgesObj[levelChoice].silver = true;
      isUpdatedObj.silver = true;
    } else {
      isUpdatedObj.silver = false;
    }

    if (newScore > 300000 && !userInformation.badges[levelChoice].gold) {
      toPatchBadgesObj[levelChoice].gold = true
      isUpdatedObj.gold = true;
    } else {
      isUpdatedObj.gold = false;
    }


    // If any new badges have been earned, sends a patch request to update these badges in 'users' collection
    const isUpdatedArray = Object.values(isUpdatedObj);
    if (isUpdatedArray.includes(true)) {
      await patchUserBadges(userUid, toPatchBadgesObj)
        .then(() => console.log("Send user badges patch"))
      
      // then updates local state
      setUserInformation(currentUserInformation => {
        const newUserInformation = JSON.parse(JSON.stringify(currentUserInformation));
        newUserInformation.badges = toPatchBadgesObj;
        return newUserInformation
      })

      // sends a post request to create a new social feed entry featuring the new badges that have been earned
      const newBadges = Object.entries(isUpdatedObj).filter(badgeEntry => badgeEntry[1] === true).map(badgeEntry => badgeEntry[0])
      await postNewActivity(userInformation.username, newBadges, null, levelChoice)
      .then(() => console.log("create new activity post"))
    } else {
      console.log("No new badges were earned")
    }
    


  }

  const navigate = useNavigate();
  const destroyPhaserGame = () => {
    document.game.destroy(true);
    navigate('/main-menu');
  }

  useEffect(() => {
    const height = 800;
    const width = 600;
    document.game = new CreateGame(levelChoice, width, height, destroyPhaserGame, submitScore);

    return () => {
      setGameTime(Math.round(document.game.getPlayTime() / 1000));
      document.game.destroy(true);
    };
  }, []);

  if (!userInformation) {
    return <p>Loading...</p>
  } else {
    return (
      <div className="ReactGameContainer">
        <div id="phaser-container"></div>
        <Link className="quit-button" to={"/level-select"}>
          Quit
        </Link>
      </div>
    );
  }

}

export default ReactGameContainer;
