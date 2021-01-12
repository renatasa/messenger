import * as actionTypes from "../actions/actionTypes";

let initialState = {
  password: null,
  email: null,
};

const setEmailPassword = (state, action) => {
  return { ...state, email: action.email, password: action.password };
};

const logout = (state, action) => {
  return { ...state, email: null, password: null };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EMAIL_PASSWORD:
      return setEmailPassword(state, action);
    case actionTypes.LOGOUT:
        return logout(state, action);
    default:
      return state;
  }
};

export default reducer;
