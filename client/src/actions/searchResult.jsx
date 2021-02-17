import axios from 'axios';
import { toastSuccessful } from '../utils/Toast';

const {
  STATE_SEARCH,
  NICHE_SEARCH,
  PRODUCT_SEARCH,
  CLEAR_SEARCH,
  GET_ALL_SUPPLIERS,
  OPEN_PROFILE,
  ADD_FAVOURITE_SUPPLIER,
  REMOVE_FAVOURITE_SUPPLIER,
  LOAD_FAVOURITE_SUPPLIERS,
  USERS_VISITED,
} = require('./types');

export const searchState = (state) => async (dispatch) => {
  try {
    const suppliers = await axios.get(`/api/supplier/state/${state}`);

    dispatch({
      type: STATE_SEARCH,
      payload: suppliers,
    });
  } catch (err) {
    toastSuccessful('No Supplier Found');
    console.error(err);
  }
};

export const searchNiche = (niche) => async (dispatch) => {
  try {
    const suppliers = await axios.get(`/api/supplier/niche/${niche}`);
    dispatch({
      type: NICHE_SEARCH,
      payload: suppliers,
    });
  } catch (err) {
    toastSuccessful('No Supplier Found');
    console.error(err);
  }
};

export const searchProducts = (keyword) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/product/products/${keyword}`);
    dispatch({
      type: PRODUCT_SEARCH,
      payload: data,
    });

    if (data.length === 0) {
      toastSuccessful('No Results Found');
    }
  } catch (err) {
    // const errors = err.response.data.errors;
    console.error(err);
  }
};

export const clearSearch = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_SEARCH,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAllSuppliers = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/supplier/find-all/suppliers`);
    dispatch({
      type: GET_ALL_SUPPLIERS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const openProfile = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/supplier/search/${id}`);

    dispatch({
      type: OPEN_PROFILE,
      payload: res.data,
    });
    history.push(`/supplier/${id}`);
  } catch (err) {
    console.error(err);
  }
};

export const profileVisitCount = (id) => async (dispatch) => {
  try {
    await axios.get(`/api/supplier/count/${id}`);
    dispatch({
      type: USERS_VISITED,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addToFavourite = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/supplier/search/${id}`);

    dispatch({
      type: ADD_FAVOURITE_SUPPLIER,
      payload: data,
    });
    localStorage.setItem(
      'favouriteSuppliers',
      JSON.stringify(getState().searchResult.favouriteSuppliers)
    );
    toastSuccessful('Added To Favourites');
  } catch (err) {
    console.error(err);
  }
};

export const getFavouriteSuppliers = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_FAVOURITE_SUPPLIERS,
    });
  } catch (err) {
    console.error(err);
  }
};

export const removeFavouriteSuppliers = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_FAVOURITE_SUPPLIER,
      payload: id,
    });
    localStorage.setItem(
      'favouriteSuppliers',
      JSON.stringify(getState().searchResult.favouriteSuppliers)
    );
    toastSuccessful('Removed From Favourites');
  } catch (err) {
    console.error(err);
  }
};
