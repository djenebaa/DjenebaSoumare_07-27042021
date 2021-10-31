import React, { useState } from "react";
import Axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [status, setStatus] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    Axios.defaults.withCredentials = true;
    Axios({
      method: "post",
      url: `http://localhost:4000/api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
          // setStatus(false);
        } else {
          window.location = "/";
          console.log(res.data);
          // setStatus(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const userAuthenticated = () => {
  //   Axios.get("http://localhost:4000/jwtid", {
  //     headers: {
  //       "x-access-token":localStorage.getItem("token")
  //     },
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };
  
  // const logout =()=>{
  //   localStorage.removeItem("user");
  //
  // ********************************
  // useEffect(() => {
  //   Axios.get("http://localhost:4000/api/user/login").then((res) => {
  //     if (res.data.loggedIn === false) {
  //       setStatus(res.data);
  //     }
  //   });
  // }, []);

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <input type="submit" value="Se connecter" />
      {/* {status && (
        <button onClick={userAuthenticated}>Check if Auth true </button>
      )} */}
    </form>
  );
};

export default SignInForm;
