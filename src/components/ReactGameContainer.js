import { Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserUidContext } from "../contexts/UserUidContext";
import { getGlobalLeaderboard, patchGlobalLeaderboardScore, patchUserBadges, patchUserScores, postNewActivity } from "../firebase/firebase.api";
import CreateGame from "../phaser/CreateGame";
import "../styles/ReactGameContainer.css";
import { currentDateTimeString } from "../utils";
function ReactGameContainer({
  levelChoice,
  setGameTime,
}) {
  const { userInformation, setUserInformation, userUid } = useContext(UserUidContext);
  const [gameEnd, setGameEnd] = useState(false);

  const submitScore = async (newScore) => {

    const currentLevelScores = userInformation["userScores"][levelChoice];

    currentLevelScores.sort((a, b) => b.score - a.score);
    // if score is a personal user high score, continue with setting local state and posting to users collection.
    if (newScore >= currentLevelScores[currentLevelScores.length - 1].score) {
      const newLevelScores = [...currentLevelScores];
      newLevelScores.push({ score: newScore, timeCompletedAt: currentDateTimeString() })
      newLevelScores.sort((a, b) => b.score - a.score);
      newLevelScores.pop();

      // patch new highscore to 'users' collection on firestore
      await patchUserScores(userUid, newLevelScores, levelChoice)
        .then(() => {
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
      if (newScore >= currentGlobalLevelScores[currentGlobalLevelScores.length - 1].score) {
        const newGlobalLevelScores = [...currentGlobalLevelScores];
        newGlobalLevelScores.push({ score: newScore, username: userInformation.username, timeCompletedAt: currentDateTimeString() })
        newGlobalLevelScores.sort((a, b) => b.score - a.score);
        newGlobalLevelScores.pop();

        //patch new global highscore to global leaderboard
        await patchGlobalLeaderboardScore(levelChoice, newGlobalLevelScores, userInformation.username)
          .then(() => {
            console.log("New global high score was achieved!")
          })

      } else {
        console.log("Not a global high score.")
      }
    } else {
      console.log("Not a high score.")
    }


    // check existing badges
    const toPatchBadgesObj = JSON.parse(JSON.stringify(userInformation.badges));
    
    // assign badges based on score
    const isUpdatedObj = {};
    if (newScore > 50000 && !userInformation.badges[levelChoice].bronze) {
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


    // sends patch to update badges if any new ones have been earned
    const isUpdatedArray = Object.values(isUpdatedObj);
    console.log(isUpdatedArray)
    if (isUpdatedArray.includes(true)) {
      // patch user badges
      await patchUserBadges(userUid, toPatchBadgesObj)
        .then(() => console.log("Send user badges patch"))
      // update local state
      setUserInformation(currentUserInformation => {
        const newUserInformation = JSON.parse(JSON.stringify(currentUserInformation));
        newUserInformation.badges = toPatchBadgesObj;
        return newUserInformation
      })
      // sends post request to create a new social feed post that medal has been earned
      const newBadges = Object.entries(isUpdatedObj).filter(badgeEntry => badgeEntry[1] === true).map(badgeEntry => badgeEntry[0])
      console.log(newBadges)
      await postNewActivity(userInformation.username, newBadges, newScore, levelChoice)
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
