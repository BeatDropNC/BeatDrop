import React, { useEffect, useRef, useState } from "react";
import "../../styles/SocialFeedCommentsContainer.css";
import CollapsibleContainer from "./CollapsibleContainer";
import SocialFeedCommentCard from "./SocialFeedCommentCard";
import HiddenContainer from "./HiddenContainer";

const SocialFeedCommentsContainer = ({
  commentsVisibility,
  commentsForPost,
}) => {
  const [commentsDisplayed, setCommentsDisplayed] = useState([]);
  const [loadMoreVisibility, setLoadMoreVisibility] = useState(false);
  const totalCommentsDisplayed = useRef(0);
  const [userAddedComments, setUserAddedComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("")



  const submitNewComment = () => {
    //Make call to firebase here!
    setUserAddedComments((previousComments) => {
      //Need username from firebase to create object to add to the displayed comments
      return [...previousComments, ...newCommentText]
    })
  
  }


  //Loads comments 3 at a time until there are none left - triggered by the user
  const loadMoreComments = () => {
    if (commentsForPost.length > totalCommentsDisplayed.current) {
      if (commentsForPost.length - totalCommentsDisplayed.current > 3) {
        setCommentsDisplayed((previousComments) => {
          const newComments = [
          
            ...previousComments,
            ...commentsForPost.slice(
              totalCommentsDisplayed.current,
              totalCommentsDisplayed.current + 3
            ),
          ];
          totalCommentsDisplayed.current = totalCommentsDisplayed.current + 3;

          return newComments;
        });
      } else {
        setCommentsDisplayed((previousComments) => {
          setLoadMoreVisibility(false);

          const newComments = [
    
            ...previousComments,
            ...commentsForPost.slice(totalCommentsDisplayed.current),
          ];
          const newTotalCommentsDisplayed =
            totalCommentsDisplayed.current +
            commentsForPost.length -
            totalCommentsDisplayed.current;
          return newComments;
        });
      }
    }
  };



  //Load initial comments
  useEffect(() => {
    if (totalCommentsDisplayed.current === 0) {
      if (commentsForPost.length > 3) {
        setCommentsDisplayed((previousComments) => {
          totalCommentsDisplayed.current = 3;
          setLoadMoreVisibility(true);
          return [...previousComments, ...commentsForPost.slice(0, 3)];
        });
      } else {
        setCommentsDisplayed((previousComments) => {
          totalCommentsDisplayed.current = commentsForPost.length;
          return [...previousComments, ...commentsForPost];
        });
      }
    }
  }, [commentsForPost, setCommentsDisplayed, setLoadMoreVisibility]);


  return (
    <div className="SocialFeedCommentsContainer">
      <CollapsibleContainer isVisible={commentsVisibility}>
        <div className="social-comments-container-collapsed-content">
          <div className="social-comments-container-new-comment-container">
            <input
              className={"social-comments-container-submit-new-comment-input"}
              value={newCommentText}
              onChange={(e) => {
                setNewCommentText(e.target.value);
              }}
            ></input>
            <button className="social-comments-container-submit-new-comment-button" onClick={() => {
              submitNewComment()
            }}>
              Submit
            </button>
          </div>
        </div>
      </CollapsibleContainer>
      {console.log("redrawing with ", commentsDisplayed)}
      {commentsDisplayed.map((comment, index) => {
        return (
          <SocialFeedCommentCard
            key={`${comment.username}${index}`}
            commentObject={comment}
          ></SocialFeedCommentCard>
        );
      })}
      <HiddenContainer isVisible={loadMoreVisibility}>
        <div className={`hidden-comments-container`}>
        <button
          className="social-comments-container-load-more-comments-button"
          onClick={() => {
            loadMoreComments();
          }}
        >
          Load More Comments
        </button>
        </div>
      </HiddenContainer>
    </div>
  );
};

export default SocialFeedCommentsContainer;
