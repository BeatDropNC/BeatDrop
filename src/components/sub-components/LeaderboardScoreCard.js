import React, { useContext } from "react";
import { UserUidContext } from "../../contexts/UserUidContext";
import "../../styles/LeaderboardScoreCard.css";

const LeaderboardScoreCard = ({scoreInformation, rank, leaderboardToShow}) => {
    const {  userInformation } = useContext(UserUidContext)

    const username = leaderboardToShow === 'personal' ? userInformation.username : scoreInformation.username

    // let topScoreColour = ""

    // switch(rank){
    //     case 1:
    //         topScoreColour = 'gold';
    //         break
    //     case 2:
    //         topScoreColour = 'silver'
    //         break
    //     case 3:
    //         topScoreColour = 'bronze'
    //         break
    // }
    
    return (
    <div className={`LeaderboardScoreCard `}>
     
        <p className="leaderboard-item leaderboard-rank">{rank}</p>
        <p className="leaderboard-item">{scoreInformation.score === 0 ? "--" : scoreInformation.score}</p>
        {leaderboardToShow === 'personal' ? null : <p className="leaderboard-item">{username}</p>}
        {leaderboardToShow === 'global' ? null :  <p className="leaderboard-item">{scoreInformation.timeCompletedAt}</p>}

       

    </div>
  );
};

export default LeaderboardScoreCard;
