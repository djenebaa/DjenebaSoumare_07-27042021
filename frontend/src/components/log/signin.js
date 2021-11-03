import React, { useState,useEffect} from "react";
import Axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[status, setstatus]= useState("");
  Axios.defaults.withCredentials = true;
  const handleLogin = (e) => {
    e.preventDefault();
   
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
   
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
          setstatus(res.data.erros)
        } else {
          // window.location = "/";
          console.log(res.data);
        localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data));
          setstatus(res.data.first_name)
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
  useEffect(() => {
    Axios.get("http://localhost:4000/api/user/login").then((res) => {
      if(res.data.loggedIn === true){
     setstatus(res.data.user[0].first_name);
      }
    });
  }, []);

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
      <input  type="submit" value="Se connecter" />
      <h1>{status}</h1>
    </form>
  );
};

export default SignInForm;
