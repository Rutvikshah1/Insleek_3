import {
  GET_MESSAGES_SUPPLIERSIDE,
  GET_MESSAGES_USERSIDE,
} from '../actions/types';

const initialState = {
  loading: true,
  usersideChats: [],
  suppliersideChats: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MESSAGES_SUPPLIERSIDE:
      return {
        ...state,
        loading: false,
        suppliersideChats: payload,
      };
    case GET_MESSAGES_USERSIDE:
      return {
        ...state,
        loading: false,
        usersideChats: payload,
      };

    default:
      return state;
  }
}
