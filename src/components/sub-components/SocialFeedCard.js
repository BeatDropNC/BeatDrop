import React, { useContext, useState } from "react";
import { UserUidContext } from "../../contexts/UserUidContext";
import commentImage from '../../assets/comment.png'
import '../../styles/SocialFeedCard.css'
import SocialFeedCommentsContainer from "./SocialFeedCommentsContainer";
const SocialFeedCard = ({postData, postKey}) => {
  const { userUid } = useContext(UserUidContext);
  const [commentsVisibility, setCommentsVisibility] = useState(false)
  const [commentsForPost, setCommentsForPost] = useState(postData.comments)

  console.log("received post data ", postData)

  console.log("username ", postData.username)
  console.log("time ", postData.timestamp.seconds)
  const timestamp = new Date(postData.timestamp.seconds * 1000).toUTCString()
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
          <h4 className="social-card-timestamp">{timestamp}</h4>
        </div>
        <h2 className="social-card-description">{postDescription}</h2>
        <img onClick={() => {setCommentsVisibility((previousState) => {
          return !previousState
        })}} id={`show-comments-image`} src={commentImage} className="social-card-show-comments"></img>
      </div>
      <SocialFeedCommentsContainer commentsVisibility={commentsVisibility} setCommentsVisibility={setCommentsVisibility} commentsForPost={commentsForPost} postKey={postKey}></SocialFeedCommentsContainer>
    </div>
  );
};

export default SocialFeedCard;
