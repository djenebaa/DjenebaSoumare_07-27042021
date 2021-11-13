import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../actions/user.actions";

// Création d'une constante pour suppimer le profil 
const DeleteProfil = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deleteUser(props.id));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce compte ?")) {
          deleteQuote();
        }
      }}
    >
      <p> Supprimer ce compte </p>
      <img src="./img/icons/trash.svg" alt="trash" />
    </div>
  );
};

export default DeleteProfil;
