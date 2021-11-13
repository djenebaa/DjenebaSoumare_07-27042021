import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, Getcomment, getPosts } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";


const CardComments =({post})=> {
    const [text, setText] = useState("");
   const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch

  const handleComment =(e)=>{
         e.preventDefault();

    if (text) {
      dispatch(addComment(post.id, userData.id, text, userData.first_name))
        .then(() => dispatch(Getcomment()))
        .then(() => setText(''));
    }
  }
  
      return (
        <div className="comments-container">
         {text.map((comment) => {
        return (
          <div
            className={
              comment.id === userData.id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment.id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user.id === comment.id) return user.photo;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commenterPseudo}</h3>
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={Comment.id} />
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}    
        </div>
    )
}
export default CardComments;
