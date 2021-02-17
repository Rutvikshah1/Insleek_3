import {
  REGISTER_USER,
  REGISTER_USER_FAIL,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOAD_USER,
  LOGOUT_USER,
  AUTH_ERROR_USER,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  loginErrors: {},
  registerErrors: {},
  user: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };

    case LOGIN_USER:
    case REGISTER_USER:
      localStorage.setItem('tokenUser', payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };

    case LOGIN_USER_FAIL:
      localStorage.removeItem('tokenUser');
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        loginErrors: payload,
      };

    case REGISTER_USER_FAIL:
    case LOGOUT_USER:
      localStorage.removeItem('tokenUser');
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        registerErrors: payload,
        user: null,
      };
    case AUTH_ERROR_USER:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
