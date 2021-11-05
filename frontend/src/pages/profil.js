import React, {useContext}from "react";
import Log from "../components/log";
import { LoginContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";


const  Profil = () => {
const login =useContext(LoginContext);
    return (
      <div className="profil-page">
      {login ?(
   <UpdateProfil/>
      ):(
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
           
        </div>
     )}
    </div>
    );
};
  export default Profil;
