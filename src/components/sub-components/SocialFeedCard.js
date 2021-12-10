import React, { useContext } from "react";
import { UserUidContext } from "../../contexts/UserUidContext";
import "../../styles/SocialFeedCard.css";

const SocialFeedCard = ({postData}) => {
  const { userUid } = useContext(UserUidContext);
  let postDescription = `${postData.username} has `

  if (postData.highscore === null){
    postDescription += `posted has a new achievement! They completed the ${postData.achievement} challenge while playing ${postData.level}.`

  } else {
      postDescription += `posted a new highscore! They scored ${postData.highscore} on ${postData.level}!`
  }
  
  return (
    <div className="SocialFeedCard">
      <div className="social-card-container">
        <img className="social-card-image"></img>
        <div className="social-card-user-info-container">
          <h3 className="social-card-username">{postData.username}</h3>
          <h4 className="social-card-timestamp">{postData.timestamp}</h4>
        </div>
        <h2 className="social-card-description">{postDescription}</h2>
        <button className="social-card-show-comments">C</button>
      </div>
    </div>
  );
};

export default SocialFeedCard;
