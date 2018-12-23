import * as actionType from "../action/type";

export default store => next => action => {
  switch (action.type) {
    case actionType.FETCH_PRODUCTS_ERROR:
    case actionType.CHECK_PROMOCODE_ERROR:
    case actionType.FETCH_PRODUCTS_START:
    case actionType.CHECK_PROMOCODE_START:
    case actionType.FETCH_PRODUCTS_SUCCESS:
    case actionType.CHECK_PROMOCODE_SUCCESS:
    case actionType.UPDATE_CURRENT_INDEX:
    case actionType.INCREASE_ITEM_COUNT:
    case actionType.PROCEED_TO_CONFIRM:
    case actionType.PROCEED_TO_SHIPPING:
    case actionType.REMOVE_ITEM_FROM_CART:
    case actionType.DECREASE_ITEM_COUNT:
    case actionType.ADD_TO_CART:
      console.groupCollapsed(`ACTION - ${action.type}`);
      console.log(store.getState());
      console.log(action);
      next(action);
      console.log(store.getState());
      console.groupEnd();
      break;
    default:
      next(action);
  }
};
