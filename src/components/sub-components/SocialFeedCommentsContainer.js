import React, { useContext, useEffect, useState } from "react";
import "../../styles/SocialFeedCommentsContainer.css";
import CollapsibleContainer from "./CollapsibleContainer";
import SocialFeedCommentCard from "./SocialFeedCommentCard";

const SocialFeedCommentsContainer = ({commentsVisibility, commentsForPost}) => {

const [newCommentText, setNewCommentText] = useState("")

  return (
    <div className="SocialFeedCommentsContainer">
        <CollapsibleContainer isVisible={commentsVisibility}>
            <div className="collapsed-content">
            <div className="new-comment-container">
            <input className={"submit-new-comment-input"} value={newCommentText} onChange={(e) => {
                setNewCommentText(e.target.value)
            }}></input>
            <button className="submit-new-comment-button">Submit</button>
            </div>

     </div>
        </CollapsibleContainer>
        {commentsForPost.map((comment) => {
          return <SocialFeedCommentCard commentObject={comment}></SocialFeedCommentCard>

        })}
    </div>
  );
};

export default SocialFeedCommentsContainer;
