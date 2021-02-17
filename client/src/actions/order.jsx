import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  FETCH_USER_ORDERS,
  UPDATE_PRODUCT_STATUS_FAIL,
  UPDATE_PRODUCT_STATUS,
  FETCH_SUPPLIER_ORDERS,
} from './types';
import axios from 'axios';
import { toastSuccessful } from '../utils/Toast';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const user = getState().authUser.user;
    order.user = user._id;
    const body = JSON.stringify(order);

    const { data } = await axios.post('/api/order', body, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAIL,
    });
    const errors = err.response;
    console.error(errors);
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/order/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
    });
    const errors = err.response;
    console.error(errors);
  }
};

export const getUserOrders = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/order/myorders/${id}`);
    dispatch({
      type: FETCH_USER_ORDERS,
      payload: data,
    });
  } catch (err) {
    const errors = err.response;
    console.error(errors);
  }
};

export const getSupplierOrders = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/order/supplier/${id}`);
    dispatch({
      type: FETCH_SUPPLIER_ORDERS,
      payload: data,
    });
  } catch (err) {
    const errors = err.response;
    console.error(errors);
  }
};

export const updateProductStatus = (value, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const status = {
    value: value,
  };
  const body = JSON.stringify(status);

  try {
    await axios.post(`/api/order/update-product-status/${id}`, body, config);

    dispatch({
      type: UPDATE_PRODUCT_STATUS,
    });

    toastSuccessful('Status Updated');
  } catch (err) {
    console.error(err);
    dispatch({
      type: UPDATE_PRODUCT_STATUS_FAIL,
    });
  }
};
