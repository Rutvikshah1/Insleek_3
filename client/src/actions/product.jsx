import axios from 'axios';
import { toastSuccessful } from '../utils/Toast';
const {
  PRODUCT_ADDED,
  GET_ALL_PRODUCTS,
  DELETE_PRODUCT,
  VIEW_PRODUCT,
  CLEAR_ALL_PRODUCTS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAIL,
} = require('./types');

export const addProduct = (product) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(product);

  try {
    const res = await axios.post('/api/product/create', body, config);
    dispatch({
      type: PRODUCT_ADDED,
      payload: res.data,
    });
    toastSuccessful('Product Added');
  } catch (err) {
    const errors = err.response.data.errors;
    console.error(errors);
  }
};

export const getProducts = (slug) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/${slug}`);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.error(errors);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/product/delete/${id}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
    toastSuccessful('Product Deleted Successfully');
  } catch (err) {
    const errors = err.response.data.errors;
    console.error(errors);
  }
};

export const viewProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/item/${id}`);
    dispatch({
      type: VIEW_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response;
    console.error(errors);
  }
};

export const clearProducts = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ALL_PRODUCTS });
  } catch (err) {
    const errors = err.response.data.errors;
    console.error(errors);
  }
};

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const { user } = getState().authUser;
    review.user = { user };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post(`/api/product/${productId}/reviews`, review, config);

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: message.msg,
    });

    toastSuccessful(error.response.data.msg);
  }
};

export const editProduct = (formData, id) => async (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT_REQUEST,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);

  try {
    const res = await axios.post(
      `/api/product/update-product/${id}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: res.data,
    });
    toastSuccessful('Product Updated');
  } catch (err) {
    console.error(err);
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
    });
  }
};
