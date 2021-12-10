import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserUidContext } from "../../contexts/UserUidContext";
import "../../styles/SocialFeedCommentCard.css";

const SocialFeedCard = () => {
  const { userUid } = useContext(UserUidContext);

  return (
    <div className="SocialFeedCommentCard">
      <p className="social-comment-card-text">UserName</p>
      <p className="social-comment-card-timestamp">TimeStamp</p>
    </div>
  );
};

export default SocialFeedCommentCard;
