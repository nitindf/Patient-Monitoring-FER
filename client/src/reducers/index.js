import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import patientReducer from './patientReducer';
import messageReducer from './messageReducer';


export default combineReducers({
  auth: authReducer,
  patient: patientReducer,
  errors: errorReducer,
  message: messageReducer
});



