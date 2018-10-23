import {combineReducers} from 'redux';
import UserReducer from "store/User/UserReducer";

export default combineReducers({
  user: UserReducer,
});
