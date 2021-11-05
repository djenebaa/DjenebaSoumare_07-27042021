import { combineReducers } from "redux";
import userReducer from "./user.reducers";
import usersReducer from "./users.reducer";

export default combineReducers ({
 userReducer,
 usersReducer,
});