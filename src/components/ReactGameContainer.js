import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CreateGame from "../phaser/CreateGame";
import "../styles/ReactGameContainer.css";
function ReactGameContainer({
  levelChoice,
  setGameTime,
}) {
  const [gameEnd, setGameEnd] = useState(false);

  const navigate = useNavigate();
  const destroyPhaserGame = () => {
    document.game.destroy(true);
    navigate('/main-menu');
  }

  useEffect(() => {
    const height = 800;
    const width = 600;
    console.log(height);
    document.game = new CreateGame(levelChoice, width, height, destroyPhaserGame);

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
