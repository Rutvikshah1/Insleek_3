import axios from 'axios';

import {
  REGISTER_USER,
  REGISTER_USER_FAIL,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOAD_USER,
  LOGOUT_USER,
  AUTH_ERROR_USER,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { toastSuccessful } from '../utils/Toast';

// LOADING USER
export const loadUser = () => async (dispatch) => {
  if (localStorage.tokenUser) {
    setAuthToken(localStorage.tokenUser);
  }

  try {
    const res = await axios.get('/api/authUser');

    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR_USER,
    });
  }
};

// LOGIN USER
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await axios.post('/api/authUser/signin', body);

    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
    dispatch(loadUser());
    toastSuccessful('LoggedIn Successfully!');
  } catch (err) {
    console.error(err);
    const errors = err.response.data.errors;

    dispatch({
      type: LOGIN_USER_FAIL,
      payload: errors,
    });
  }
};

// REGISTER USER
export const register = (newUser) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(newUser);

  try {
    const res = await axios.post('/api/user/user-register', body, config);
    dispatch({
      type: REGISTER_USER,
      payload: res.data,
    });
    dispatch(loadUser());
    toastSuccessful('Registered Successfully!');
  } catch (err) {
    console.error(err);
    const errors = err.response.data.errors;

    dispatch({
      type: REGISTER_USER_FAIL,
      payload: errors,
    });
  }
};

// LOGOUT USER
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_USER,
    });
    toastSuccessful('LoggedOut Successfully!');
  } catch (err) {
    console.error(err);
  }
};
