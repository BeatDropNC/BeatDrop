import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserUidContext } from "../../contexts/UserUidContext";
import "../../styles/SocialFeedCommentCard.css";

const SocialFeedCommentCard = ({commentObject}) => {
  const { userUid } = useContext(UserUidContext);
  const timestamp = new Date(commentObject.timestamp.seconds * 1000).toUTCString()

  return (
    <div className="SocialFeedCommentCard">
      <p className="social-comment-card-body">{commentObject.commentBody}</p>
      <p className="social-comment-card-username">{commentObject.username}</p>

      <p className="social-comment-card-time">{timestamp}</p>
    </div>
  );
};

export default SocialFeedCommentCard;
