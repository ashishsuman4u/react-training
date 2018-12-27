import * as _ from "lodash";

import * as actionType from "../action/type";

const initialState = {
  items: [],
  promocode: {},
  address: {}
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, { id: action.payload, count: 1 }]
      };
    case actionType.INCREASE_ITEM_COUNT:
    case actionType.DECREASE_ITEM_COUNT:
      return {
        ...state,
        items: [
          ..._.reject(state.items, item => {
            return item.id === action.payload.id;
          }),
          { id: action.payload.id, count: action.payload.count }
        ]
      };
    case actionType.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        items: [
          ..._.reject(state.items, item => {
            return item.id === action.payload;
          })
        ]
      };
    case actionType.CHECK_PROMOCODE_START:
      return { ...state, isFetching: true };
    case actionType.CHECK_PROMOCODE_SUCCESS:
      return { ...state, isFetching: false, promocode: action.payload };
    case actionType.CHECK_PROMOCODE_ERROR:
      return { ...state, isFetching: false, error: action.error };
    case actionType.PROCEED_TO_CONFIRM:
      return { ...state, address: action.address };
    default:
      return state;
  }
};

export default CartReducer;
