import { react, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateGame from "../phaser/CreateGame";
import "../styles/ReactGameContainer.css";
function ReactGameContainer({
  colorProp,
  setColorChoice,
  colorChoice,
  setGameTime,
}) {
  useEffect(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    console.log(height);
    document.game = new CreateGame(colorChoice, height, width);

    return () => {
      setGameTime(Math.round(document.game.getPlayTime() / 1000));
      document.game.destroy(true);
    };
  }, []);

  return (
    <div className="ReactGameContainer">
      <Link className="quit-button" to={"/"}>
        Quit
      </Link>
    </div>
  );
}

export default ReactGameContainer;
