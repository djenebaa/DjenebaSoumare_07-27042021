import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import axios from "axios";
import { LoginContext } from "./components/AppContext";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const userAuthenticated = async () => {
      await axios ({
      method: "get",  
        url: `http://localhost:4000/api/user/login`,
        withCredentials: true,
        // headers:{
        //   "x-access-token":localStorage.getItem("token")
        // }
           })
        .then((response) => {
          setLoggedIn(response.data.user[0].id);
        })
        .catch((err) => console.log("No token"));
    };
    userAuthenticated();
    if (loggedIn) dispatch(getUser(loggedIn))
  }, [loggedIn, dispatch]);

  return(
  
    <LoginContext.Provider value={loggedIn}>
    <Routes />
  </LoginContext.Provider>
  );
};
export default App;
//