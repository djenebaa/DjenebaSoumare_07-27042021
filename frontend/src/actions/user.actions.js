import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_PHOTO = "UPLOAD_PICTURE";
export const DELETE_USER = "DELETE_USER";
// export const FOLLOW_USER = "FOLLOW_USER";
// export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

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

export const uploadPicture = (id) => {
   return (dispatch) => {
    return axios
      .put(`http://localhost:4000/api/user/${id}`)
      .then((res) => {
        dispatch({ type: UPDATE_PHOTO, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};



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