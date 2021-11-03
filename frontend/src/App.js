// import React, { useEffect, useState } from "react";
// import Routes from "./components/Routes";
// import axios from "axios";
// import { UidContext } from "./components/AppContext";
// import { useDispatch } from "react-redux";
// import { getUser } from "./actions/user.actions";

// const App = () => {
//   const [uid, setUid] = useState(0);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const userAuthenticated = async () => {
//       await axios
//         .get("http://localhost:4000/jwtid", {
//           headers: {
//             "x-access-token": localStorage.getItem("token"),
//           },
          
//         })
//         .then((response) => {
//           console.log(response);
//           setUid(response.data.config)
//         })
//         .catch((err) => console.log("No token"));
//     };
//     userAuthenticated();

//     if (uid) dispatch(getUser(uid));
//   }, [uid, dispatch]);

//   return(
  
//     <UidContext.Provider value={uid}>
//     <Routes />
//   </UidContext.Provider>
//   );
// };
// export default App;
import React from "react";
import Routes from "./components/Routes";


const App = () => {

  return <Routes />;
};

export default App;