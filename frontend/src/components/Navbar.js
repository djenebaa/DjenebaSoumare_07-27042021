import React, {useContext} from 'react';
import { NavLink } from "react-router-dom";
import { LoginContext } from './AppContext';
import Logout from "./log/Logout";
import { useSelector } from "react-redux";

// Si l'utilisateur est connecter changement de contenu de la navbar
const Navbar =()=> {
  const loggedIn = useContext(LoginContext);
  const userData = useSelector((state) => state.userReducer);
   return (
 <nav>
 { <div className="nav-container">
   <div className="logo">
     <NavLink exact to="/">
              <div className="logo">
       <img src="./img/icon.png" alt="icon" />
       <h3>Groupomania</h3>
    </div>
    </NavLink>
   </div>
   {loggedIn ? (
    <ul>
      <li></li>
      <li className="welcome">
        <NavLink exact to="/profil">
          <h5>Bienvenue {userData.first_name}</h5>
        </NavLink>
      </li>
      <Logout />
    </ul>
  ) : (
    <ul>
      <li></li>
      <li>
        <NavLink exact to="/profil">
          <img src="./img/icons/login.svg" alt="login"/>
        </NavLink>
      </li>
    </ul>
  )}
</div>}
</nav>
);
};

export default Navbar;
