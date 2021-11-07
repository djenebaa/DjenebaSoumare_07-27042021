import Log from "../components/log";
import React, { useContext } from "react";
import { LoginContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import NewPostForm from "../components/Post/NewPostForm";

const Home = () => {
  const login = useContext(LoginContext);

  return (
    <div className="home">
      <LeftNav />
      <div className="main">
      <div className="home-header">
        {login ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
    <Thread/>
      </div>
    </div>
  );
};
export default Home;
