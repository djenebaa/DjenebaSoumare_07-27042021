import {

    GET_USER,
    UPDATE_PHOTO,
  } from "../actions/user.actions";
  
  const initialState = {};
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case GET_USER:
        return action.payload;
        case UPDATE_PHOTO:
      return {
        ...state,
        photo: action.payload,
      };
      default:
        return state;
    }
  }
  