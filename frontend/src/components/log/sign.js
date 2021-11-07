import React, { useState } from "react";
import axios from "axios";
import SignInForm from "../log/signin";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  // const [admin, setAdmin] = useState(0);

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `http://localhost:4000/api/user/sign`,
        data: {
          first_name,
          last_name,
          age,
          position,
          email,
          password,
         
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
            localStorage.setItem("user", JSON.stringify(res.data))
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">first_name</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setFirst_name(e.target.value)}
            value={first_name}
          />
          <div className="pseudo error"></div>
          <br />
          <label htmlFor="last_name">last_name</label>
          <br />
          <input
            type="text"
            name="last_name"
            id="last_name"
            onChange={(e) => setLast_name(e.target.value)}
            value={last_name}
          />
          <div className="age error"></div>
          <br />
          <label htmlFor="age">Age</label>
          <br />
          <input
            type="number"
            name="age"
            id="age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
          <div className="position error"></div>
          <br />
          <label htmlFor="age">Position</label>
          <br />
          <input
            type="text"
            name="position"
            id="position"
            onChange={(e) => setPosition(e.target.value)}
            value={position}
          />
          <div className="pseudo error"></div>
          <br />
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
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br/>
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};
// const logout()=>{
//   localStorage.removeItem("user");
// }
export default SignUpForm;