import React from "react";
import LeftNav from '../LeftNav'
import { useSelector } from "react-redux";
import Upload from "./UploadImg"
import DeleteProfil from "./DeleteProfil";

// Si l'user est connecter le contenu de la page se change avec ce nouveau contenu

const Profil = ({user}) => {
  const userData = useSelector((state) => state.userReducer);

// const dispatch = useDispatch();
 

  return (
    <div className="profil-container">
    <LeftNav />
    <h1> Profil de {userData.first_name}</h1>
    <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.photo}alt="user-pic" />
         <Upload/>
        </div>  
         </div>
         <div>
          {userData.id  &&(
             <div className="button-container">
                <DeleteProfil id={userData.id} />
              </div>
            )}
         </div>   
  </div>
  )
};

export default Profil;