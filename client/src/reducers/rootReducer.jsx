import { combineReducers } from 'redux';
import authSupplier from '../reducers/authSupplier';
import searchResult from '../reducers/searchResult';
import product, { productReviewCreateReducer } from '../reducers/product';
import authUser from '../reducers/authUser';
import cart from '../reducers/cart';
import chat from '../reducers/chat';
import order from '../reducers/order.jsx';

const rootReducer = combineReducers({
  authSupplier,
  searchResult,
  authUser,
  cart,
  chat,
  order,
  product,
  productReviewCreate: productReviewCreateReducer,
});

export default rootReducer;
