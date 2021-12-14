import React, { useEffect, useRef, useState, useContext } from "react";
import "../../styles/SocialFeedCommentsContainer.css";
import CollapsibleContainer from "./CollapsibleContainer";
import SocialFeedCommentCard from "./SocialFeedCommentCard";
import HiddenContainer from "./HiddenContainer";
import { postCommentToActivity } from "../../firebase/firebase.api";
import { Timestamp } from "@firebase/firestore";
import { UserUidContext } from "../../contexts/UserUidContext";

const SocialFeedCommentsContainer = ({
  commentsVisibility,
  setCommentsVisibility,
  commentsForPost,
  postKey
}) => {
  const [commentsDisplayed, setCommentsDisplayed] = useState([]);
  const [loadMoreVisibility, setLoadMoreVisibility] = useState(false);
  const totalCommentsDisplayed = useRef(0);
  const [userAddedComments, setUserAddedComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("")
  const { userInformation } = useContext(UserUidContext);



  const submitNewComment = () => {
    const timestamp = Timestamp.fromDate(new Date());
    const newComment = {commentBody: newCommentText, timestamp: timestamp, username: userInformation.username}

    
    postCommentToActivity(postKey, newComment).then(() => {
      setNewCommentText("")
      setCommentsVisibility(false)
    }).catch((err) => {
      console.log(err, "error posting comment")
    })

    // //Make call to firebase here!
    // setUserAddedComments((previousComments) => {
    //   //Need username from firebase to create object to add to the displayed comments
    //   return [...previousComments, ...newCommentText]
    // })
  
  }


  const sortComments = (commentsArray) => {
    const newArray = commentsArray.sort((a, b) => {return b.timestamp.seconds - a.timestamp.seconds})
    return newArray
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
          return sortComments(newComments);
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
            return sortComments(newComments);
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
          const sortedComments = sortComments(commentsForPost)
          const initialComments = [...previousComments, ...sortedComments.slice(0, 3)];

          return initialComments

        });
      } else {
        setCommentsDisplayed((previousComments) => {
          totalCommentsDisplayed.current = commentsForPost.length;
          const sortedComments = sortComments(commentsForPost)

          const initialComments = [...previousComments, ...sortedComments];
          return initialComments;

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
