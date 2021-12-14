import React, { useContext, useState } from "react";
import { UserUidContext } from "../../contexts/UserUidContext";
import "../../styles/Leaderboard.css";
import LeaderboardScoreCard from "./LeaderboardScoreCard";

const Leaderboard = ({scoreObjects, levelToShow, setLevelToShow, leaderboardToShow}) => {




  return (
    <div className="Leaderboard">
      <h2 className="leaderboard-level-select-title">Level</h2>
      <div className="leaderboard-level-select-container">
        
    <button className={`leaderboard-level-select-button ${levelToShow === 'level1' ? "selected-button" : ""}`} onClick={()=>{setLevelToShow('level1')}}>1</button>
    <button className={`leaderboard-level-select-button ${levelToShow === 'level2' ? "selected-button" : ""}`} onClick={()=>{setLevelToShow('level2')}}>2</button>
    <button className={`leaderboard-level-select-button ${levelToShow === 'level3' ? "selected-button" : ""}`} onClick={()=>{setLevelToShow('level3')}}>3</button>
    <button className={`leaderboard-level-select-button ${levelToShow === 'level4' ? "selected-button" : ""}`}onClick={()=>{setLevelToShow('level4')}}>4</button>
    <button className={`leaderboard-level-select-button ${levelToShow === 'level5' ? "selected-button" : ""}`} onClick={()=>{setLevelToShow('level5')}}>5</button>

      </div>
      <div className="leaderboard-scorecard-container">
        <div className="leaderboard-scorecard-titles">
        <p className="leaderboard-title  leaderboard-rank">Rank</p>
        <p className="leaderboard-title">Score</p>
        {leaderboardToShow === 'personal' ? null : <p className="leaderboard-title">User</p>}

        <p className="leaderboard-title">Date</p>
        </div>
   {scoreObjects.map((scoreInformation, index) => {
     console.log(scoreInformation, "score info")
      return <LeaderboardScoreCard key={index} rank={index + 1} scoreInformation={scoreInformation} leaderboardToShow={leaderboardToShow}></LeaderboardScoreCard>
    })}
    </div>
    </div>
  );
};

export default Leaderboard;
