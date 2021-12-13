import { Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserUidContext } from "../contexts/UserUidContext";
import { patchUserScores } from "../firebase/firebase.api";
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

    currentLevelScores.sort((a,b) => b.score - a.score);
    if (newScore >= currentLevelScores[4].score) {
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

      // post new score to 'users' collection on firestore
      patchUserScores(userUid, newLevelScores, levelChoice)
      .then(() => {
        console.log("New high score was updated!")
      })      
    } else {
      console.log("Not a high score.")
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
    console.log(height);
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
