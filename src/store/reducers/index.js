import { combineReducers } from 'redux';
import notes from "./notes";
import auth from "./auth";

const ponyApp = combineReducers({
  notes, auth,
});

const rootReducer = (state, action) => {
  console.log('tipo de action'+action.type);
  switch (action.type) {
    case 'AUTHENTICATION_ERROR':
      console.log('erro reducers/index');
      break;
    case 'LOGIN_FAILED':
    case 'REGISTRATION_FAILED':
    case 'LOGOUT_SUCCESSFUL':
      state = { ...state, 'notes': [] };
      break;

    default:
      break;
  }

  return ponyApp(state, action);
};

export default rootReducer;