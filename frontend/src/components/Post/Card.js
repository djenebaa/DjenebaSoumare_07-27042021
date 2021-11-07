import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, dateParser } from "../Utils";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post.id, textUpdate));
    }
    setIsUpdated(false);
  };


  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post.id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user.id === post.userId) return user.photo;
                    else return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user.id === post.userId) return user.first_name;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
              <span>{dateParser(post.date)}</span>
            </div>
            {/* <p>{post.post_name}</p> */}
            {isUpdated === false && <p>{post.post_name}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.post_name}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            {/* :::::::::::::::::::: */}
            {post.photo && (
              <img src={post.photo} alt="card-pic" className="card-pic" />
            )}
             {userData.id === post.userId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="edit" />
                </div>
                <DeleteCard id={post.id} />
              </div>
            )}
{/* //partie pas active */}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  src="./img/icons/message1.svg"
                  alt="comment"
                />
                <span>Comment</span>
              </div>
              <img src="./img/icons/share.svg" alt="share" />  
            </div>
{/* // fin */}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
