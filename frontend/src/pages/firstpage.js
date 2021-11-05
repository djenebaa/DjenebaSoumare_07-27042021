
// import Log from "../components/log/signin";
import React, {useContext}from "react";
import { LoginContext } from "../components/AppContext";

const Home = () => {
  const Login = useContext(LoginContext);

  return (
    <div className="profil-page">
      {Login ? (
        <div>
          <h1>Yes</h1>
          </div>
      ) : (
       <div>
         <h1>Not</h1>
         </div>
      )}
    </div>
  );
}
  export default Home;
