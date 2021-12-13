import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserUidContext } from "../../contexts/UserUidContext";
import "../../styles/SocialFeedCommentCard.css";

const SocialFeedCommentCard = ({commentObject}) => {
  const { userUid } = useContext(UserUidContext);

  return (
    <div className="SocialFeedCommentCard">
      <p className="social-comment-card-body">{commentObject.commentBody}</p>
      <p className="social-comment-card-username">{commentObject.username}</p>

      <p className="social-comment-card-time">{commentObject.postedAt}</p>
    </div>
  );
};

export default SocialFeedCommentCard;
