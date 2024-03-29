import React, { useState } from "react";
import commentImage from '../../assets/comment.png'
import '../../styles/SocialFeedCard.css'
import SocialFeedCommentsContainer from "./SocialFeedCommentsContainer";
import { createBadgeActivityBody } from "../../utils";
const SocialFeedCard = ({postData, postKey}) => {
  const [commentsVisibility, setCommentsVisibility] = useState(false)
  const [ commentsForPost ] = useState(postData.comments)

 
  const timestamp = new Date(postData.timestamp.seconds * 1000).toUTCString()
  let postDescription = `${postData.username} has `

  if (postData.highscore === null){
    postDescription += createBadgeActivityBody(postData.achievements, postData.level)

  } else {
      postDescription += `posted a new global highscore! They scored ${postData.highscore} on ${postData.level}!`
  }
  
  return (
    <div className="SocialFeedCard">
      <div className="social-card-container">
        <img className="social-card-image" src={postData.avatar_url} alt='social card'></img>
        <div className="social-card-user-info-container">
          <h3 className="social-card-username">{postData.username}</h3>
          <h4 className="social-card-timestamp">{timestamp}</h4>
        </div>
        <h2 className="social-card-description">{postDescription}</h2>
        <img onClick={() => {setCommentsVisibility((previousState) => {
          return !previousState
        })}} id={`show-comments-image`} src={commentImage} alt='comment' className="social-card-show-comments"></img>
      </div>
      <SocialFeedCommentsContainer commentsVisibility={commentsVisibility} setCommentsVisibility={setCommentsVisibility} commentsForPost={commentsForPost} postKey={postKey}></SocialFeedCommentsContainer>
    </div>
  );
};

export default SocialFeedCard;
