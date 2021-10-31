import React, { useEffect } from "react";
import Routes from "./components/Routes";
import axios from "axios";

const App = () => {
  useEffect(() => {
    const userAuthenticated = async () => {
      axios
        .get("http://localhost:4000/jwtid", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log("No token")); ;
    };
    userAuthenticated();
  });

  return <Routes />;
};

export default App;
