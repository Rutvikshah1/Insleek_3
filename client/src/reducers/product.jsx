const {
  PRODUCT_ADDED,
  GET_ALL_PRODUCTS,
  DELETE_PRODUCT,
  VIEW_PRODUCT,
  CLEAR_ALL_PRODUCTS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
} = require('../actions/types');

const initialState = {
  loading: true,
  product: {},
  products: [],
  showProductEditModal: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_ADDED:
      return {
        ...state,
        loading: false,
        product: payload,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        loading: false,
        products: state.products.filter((product) => product._id !== payload),
      };
    case VIEW_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    case CLEAR_ALL_PRODUCTS:
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
