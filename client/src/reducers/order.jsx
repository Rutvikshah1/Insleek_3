import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  FETCH_USER_ORDERS,
  FETCH_SUPPLIER_ORDERS,
} from '../actions/types';

const initialState = {
  loading: true,
  orderItems: [],
  shippingAddress: {},
  orderDetails: {},
  userOrders: [],
  supplierOrders: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        order: payload,
        success: true,
      };

    case ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_USER_ORDERS:
      return {
        ...state,
        loading: false,
        userOrders: payload,
      };
    case FETCH_SUPPLIER_ORDERS:
      return {
        ...state,
        loading: false,
        supplierOrders: payload,
      };
    default:
      return state;
  }
}
