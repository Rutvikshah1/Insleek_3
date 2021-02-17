import axios from 'axios';

import {
  REGISTER_SUPPLIER,
  REGISTER_SUPPLIER_FAIL,
  LOAD_SUPPLIER,
  LOGIN_SUPPLIER,
  LOGIN_SUPPLIER_FAIL,
  LOGOUT_SUPPLIER,
  AUTH_ERROR_SUPPLIER,
  GET_CURRENT_SUPPLIER,
  UPDATE_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { toastSuccessful } from '../utils/Toast';

// LOADING SUPPLIER
export const loadSupplier = () => async (dispatch) => {
  if (localStorage.tokenSupplier) {
    setAuthToken(localStorage.tokenSupplier);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: LOAD_SUPPLIER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR_SUPPLIER,
    });
  }
};

// LOGIN SUPPLIER
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await axios.post('/api/auth', body);

    dispatch({
      type: LOGIN_SUPPLIER,
      payload: res.data,
    });
    dispatch(loadSupplier());
    toastSuccessful('LoggedIn Successfully!');
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: LOGIN_SUPPLIER_FAIL,
      payload: errors,
    });
  }
};

// REGISTER SUPPLIER
export const register = (newSupplier) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(newSupplier);

  try {
    const res = await axios.post('/api/supplier', body, config);
    dispatch({
      type: REGISTER_SUPPLIER,
      payload: res.data,
    });
    dispatch(loadSupplier());
    toastSuccessful('Registered Successfully!');
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: REGISTER_SUPPLIER_FAIL,
      payload: errors,
    });
  }
};

// LOGOUT SUPPLIER
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_SUPPLIER,
    });
    toastSuccessful('LoggedOut Successfully!');
  } catch (err) {
    console.error(err);
  }
};

//GET CURRENT SUPPLIER PROFILE
export const getCurrentProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/supplier/search/${id}`);
    dispatch({
      type: GET_CURRENT_SUPPLIER,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

//UPDATE SUPPLIER PROFILE
export const updateProfile = (formData, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);

  try {
    const res = await axios.post(
      `/api/supplier/update-profile/${id}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    toastSuccessful('Profile Updated!');
  } catch (err) {
    console.error(err);
  }
};
