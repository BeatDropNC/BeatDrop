import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserUidContext } from "../contexts/UserUidContext";
import { getGlobalLeaderboard, patchGlobalLeaderboardScore, patchUserScores, postNewActivity } from "../firebase/firebase.api";
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
    // 
    if (newScore >= currentLevelScores[currentLevelScores.length - 1].score) {
      const newLevelScores = [...currentLevelScores];
      newLevelScores.push({ score: newScore, timeCompletedAt: currentDateTimeString() })
      newLevelScores.sort((a, b) => b.score - a.score);
      newLevelScores.pop();

      // set local user state
      setUserInformation(currentUserInformation => {
        const newUserInformation = JSON.parse(JSON.stringify(currentUserInformation));
        newUserInformation["userScores"][levelChoice] = newLevelScores;
        return newUserInformation
      })

      // patch new highscore to 'users' collection on firestore
      await patchUserScores(userUid, newLevelScores, levelChoice)
        .then(() => {
          console.log("New high score was updated!")
        })

      // check global leaderboard
      const response = await getGlobalLeaderboard();
      const currentGlobalLevelScores = response[levelChoice]["scoresList"];
      currentGlobalLevelScores.sort((a, b) => b.score - a.score);
      if (newScore >= currentGlobalLevelScores[currentGlobalLevelScores.length-1].score) {
        const newGlobalLevelScores = [...currentGlobalLevelScores];
        newGlobalLevelScores.push({ score: newScore, timeCompletedAt: currentDateTimeString() })
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

    // send any new badges
    let badge;
    if(newScore > 0) {
      badge = "badge1";
    }

    if(badge !== undefined) {
      // console.log(userInformation.username, "Username")
      // console.log(badge, "badge")
      // console.log(newScore, "newScore")
      // console.log(levelChoice, "level choice")
      await postNewActivity(userInformation.username, badge, newScore, levelChoice)
      .then(() => console.log("posted new achievement activity"))
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

  return (
    <div className="ReactGameContainer">
      <div id="phaser-container"></div>
      <Link className="quit-button" to={"/level-select"}>
        Quit
      </Link>
    </div>
  );
}

export default ReactGameContainer;
