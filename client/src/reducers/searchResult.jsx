const {
  STATE_SEARCH,
  GET_ALL_SUPPLIERS,
  NICHE_SEARCH,
  PRODUCT_SEARCH,
  CLEAR_SEARCH,
  OPEN_PROFILE,
  LOAD_FAVOURITE_SUPPLIERS,
  REMOVE_FAVOURITE_SUPPLIER,
  ADD_FAVOURITE_SUPPLIER,
} = require('../actions/types');

const initialState = {
  loading: true,
  suppliers: [],
  msg: '',
  supplier: {},
  products: [],
  favouriteSuppliers: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case STATE_SEARCH:
      return {
        ...state,
        suppliers: payload.data,
        loading: false,
      };
    case NICHE_SEARCH:
      return {
        ...state,
        suppliers: payload.data,
        loading: false,
      };
    case GET_ALL_SUPPLIERS:
      return {
        ...state,
        suppliers: payload,
        loading: false,
      };
    case PRODUCT_SEARCH:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        loading: false,
        suppliers: [],
        products: [],
      };
    case OPEN_PROFILE:
      return {
        ...state,
        loading: false,
        supplier: payload,
      };
    case ADD_FAVOURITE_SUPPLIER:
      const newSupplier = payload;
      const existSupplier = state.favouriteSuppliers.find(
        (x) => x._id === newSupplier._id
      );
      if (existSupplier) {
        return {
          ...state,
          favouriteSuppliers: state.favouriteSuppliers.map((x) =>
            x._id === existSupplier._id ? newSupplier : x
          ),
        };
      } else {
        return {
          ...state,
          favouriteSuppliers: [...state.favouriteSuppliers, newSupplier],
        };
      }
    case REMOVE_FAVOURITE_SUPPLIER:
      return {
        ...state,
        favouriteSuppliers: state.favouriteSuppliers.filter(
          (x) => x._id !== payload
        ),
      };

    case LOAD_FAVOURITE_SUPPLIERS:
      return {
        ...state,
        favouriteSuppliers: JSON.parse(
          localStorage.getItem('favouriteSuppliers')
        ),
        loading: false,
      };
    default:
      return state;
  }
}
