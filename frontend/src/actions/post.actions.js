import axios from 'axios';

export const GET_POSTS= "GET_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_POST = "ADD_POST";

export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = (num) => {
    return (dispatch) => {
      return axios
        .get(`http://localhost:4000/api/post/`)
        .then((res) => {
          const array = res.data.slice(0, num);
          dispatch({ type: GET_POSTS, payload: array });
        })
        .catch((err) => console.log(err));
    };
  };



  export const updatePost = (postId, post_name) => {
    return (dispatch) => {
      return axios({
        method: "put",
        url: `http://localhost:4000/api/post/${postId}`,
        data: { post_name },
      })
        .then((res) => {
          dispatch({ type: UPDATE_POST, payload: { post_name, postId } });
        })
        .catch((err) => console.log(err));
    };
  };

  export const deletePost = (postId) => {
    return (dispatch) => {
      return axios({
        method: "delete",
        url: `http://localhost:4000/api/post/${postId}`,
      })
        .then((res) => {
          dispatch({ type: DELETE_POST, payload: { postId } });
        })
        .catch((err) => console.log(err));
    };
  };

  export const addPost = (data) => {
    return (dispatch) => {
      return axios
        .post(`http://localhost:4000/api/post/create`, data)
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
          } else {
            dispatch({ type: GET_POST_ERRORS, payload: "" });
          }
        });
    };
  };
  