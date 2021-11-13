import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_PHOTO = "UPDATE_PHOTO";
export const DELETE_USER = "DELETE_USER";
export const GET_USER_ERRORS = "GET_USER_ERRORS";

// Récuperer un utilisateur
export const getUser = (loggedIn) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:4000/api/user/${loggedIn}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
// Mettre a jour la photo de profil 
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:4000/api/user/${id}`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`http://localhost:4000/api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPDATE_PHOTO, payload: res.data.photo });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};
// Supprimer un utilisateur 

  export const deleteUser = (userId) => {
    return (dispatch) => {
      return axios({
        method: "delete",
        url: `http://localhost:4000/api/user/${userId}`,
      })
        .then((res) => {
          dispatch({ type: DELETE_USER, payload: { userId } });
        })
        .catch((err) => console.log(err));
    };
  };