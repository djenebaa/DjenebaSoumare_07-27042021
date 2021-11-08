import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post_name, setMessage] = useState("");
  const [postPhoto, setPhoto] = useState(null);
  const [file, setFile] = useState();   // image
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

 const handlePost = async () => {
    if (post_name || postPhoto ) {
      const data = new FormData();
      data.append('userId', userData.id);
      data.append('post_name', post_name);
      if (file) data.append("photo", file);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message")
    }
  };

  const handlePicture = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }; 

  const cancelPost = () => {
    setMessage("");
    setPhoto("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false)
  },[userData])
  return (
    <div className="post-container">
    {
      isLoading ? (
        <i className ="fas fa-spinner fa-pulse"></i>
      ):(   
      <>
     <NavLink exact to ="/profil">
     <div className="user-info">
     <img src={userData.photo} alt="user-img"/>
     </div>
     </NavLink>
   <div className="post-form">
            <textarea
              name="post_name"
              id="message"
              placeholder="Une nouvelle a partager ?"
              onChange={(e) => setMessage(e.target.value)}
              value={post_name}
            />
   {post_name || postPhoto ? (
   <li className="card-container">
      <div className="card-left">
                  <img src={userData.photo} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.first_name}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{post_name}</p>
                    <img src={postPhoto} alt="" />
                  </div>
                </div>
    </li>

   ): null }
   <div className="footer-form">
    <div className="icon">
     <img src="./img/icons/picture.svg" alt="img"/>
       <input type="file" id="file-upload" name="photo" accecpt=".jpg, .jpeg, .png" onChange={(e)=> handlePicture(e)}/>
    </div>
   </div>
 
</div>
 <div className="btn-send">
                {post_name || postPhoto ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}
<button className ="send" onClick={handlePost} >Envoyer</button>
</div>
</> 
)}
</div>
  );
};
export default NewPostForm;
// 