import {
  MESSAGE_SENT,
  USER_MESSAGES_READ,
  SUPPLIER_MESSAGES_READ,
  GET_MESSAGES_SUPPLIERSIDE,
  GET_MESSAGES_USERSIDE,
} from '../actions/types';
import axios from 'axios';

export const sendMessage = (
  user,
  supplier,
  message,
  side,
  userHasRead,
  supplierHasRead
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const data = {
    user,
    supplier,
    message: { message, side, userHasRead, supplierHasRead },
  };
  const body = JSON.stringify(data);

  try {
    await axios.post('/api/chat', body, config);

    dispatch({
      type: MESSAGE_SENT,
    });
  } catch (err) {
    const errors = err.response;
    console.error(errors);
  }
};

export const userReadMessage = (user, supplier) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const data = {
    user,
    supplier,
  };
  const body = JSON.stringify(data);

  try {
    await axios.post('/api/chat/user-message-read', body, config);

    dispatch({
      type: USER_MESSAGES_READ,
    });
  } catch (error) {
    console.error(error);
  }
};

export const supplierReadMessage = (user, supplier) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const data = {
    user,
    supplier,
  };
  const body = JSON.stringify(data);

  try {
    await axios.post('/api/chat/supplier-message-read', body, config);

    dispatch({
      type: SUPPLIER_MESSAGES_READ,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUserChats = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/chat/user-chats/${id}`);
    dispatch({
      type: GET_MESSAGES_USERSIDE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response;
    console.error(errors);
  }
};

export const getSupplierChats = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/chat/supplier-chats/${id}`);
    dispatch({
      type: GET_MESSAGES_SUPPLIERSIDE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response;
    console.error(errors);
  }
};
