import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import studentReducer from './studentReducer';
import messageReducer from './messageReducer';


export default combineReducers({
  auth: authReducer,
  student: studentReducer,
  errors: errorReducer,
  message: messageReducer
});



