import {combineReducers} from 'redux';
import UserReducer from "store/User/UserReducer";
import ChatReducer from 'store/Chat/ChatReducer';

export default combineReducers({
  user: UserReducer,
  chat: ChatReducer,
});
