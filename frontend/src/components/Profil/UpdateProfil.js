import React from "react";
import LeftNav from '../LeftNav'
import { useSelector } from "react-redux";
import Uploadphoto from "./UploadImg"

const Profil = () => {
  const userData = useSelector((state) => state.userReducer);
  return (
    <div className="profil-container">
    <LeftNav />
    <h1> Profil de {userData.first_name}</h1>
    <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.photo}alt="user-pic" />
      <Uploadphoto/>
        </div>
      </div>
  </div>
  )
};

export default Profil;