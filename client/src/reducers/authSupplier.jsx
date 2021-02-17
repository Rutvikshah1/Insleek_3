import {
  REGISTER_SUPPLIER,
  REGISTER_SUPPLIER_FAIL,
  LOGIN_SUPPLIER,
  LOGIN_SUPPLIER_FAIL,
  LOAD_SUPPLIER,
  AUTH_ERROR_SUPPLIER,
  LOGOUT_SUPPLIER,
  UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('tokenSupplier'),
  isAuthenticated: null,
  loading: true,
  loginErrors: {},
  registerErrors: {},
  supplier: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_SUPPLIER:
    case UPDATE_PROFILE:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        supplier: payload,
      };

    case LOGIN_SUPPLIER:
    case REGISTER_SUPPLIER:
      localStorage.setItem('tokenSupplier', payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };

    case LOGIN_SUPPLIER_FAIL:
      localStorage.removeItem('tokenSupplier');
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        loginErrors: payload,
      };

    case REGISTER_SUPPLIER_FAIL:
    case LOGOUT_SUPPLIER:
      localStorage.removeItem('tokenSupplier');
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        registerErrors: payload,
        supplier: null,
      };
    case AUTH_ERROR_SUPPLIER:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        supplier: null,
      };
    default:
      return state;
  }
}
