import axios from "axios";

import * as actionTypes from "./type";
import { errorMessage, BASE_URL } from "./api";

export const addToCart = id => ({
  type: actionTypes.ADD_TO_CART,
  payload: id
});

export const increaseItemCount = (id, count) => ({
  type: actionTypes.INCREASE_ITEM_COUNT,
  payload: { id, count }
});

export const decreaseItemCount = (id, count) => ({
  type: actionTypes.DECREASE_ITEM_COUNT,
  payload: { id, count }
});

export const removeItemFromCart = id => ({
  type: actionTypes.REMOVE_ITEM_FROM_CART,
  payload: id
});

export const checkPromocodeStart = () => ({
  type: actionTypes.CHECK_PROMOCODE_START
});

export const checkPromocodeSuccess = payload => ({
  type: actionTypes.CHECK_PROMOCODE_SUCCESS,
  payload
});

export const checkPromocodeError = error => ({
  type: actionTypes.CHECK_PROMOCODE_ERROR,
  error
});

export const proceedToConfirmStep = address => ({
  type: actionTypes.PROCEED_TO_CONFIRM,
  address
});

export const checkPromocode = promocode => async dispatch => {
  dispatch(checkPromocodeStart());
  const url = `${BASE_URL}/promocode/${promocode}`;
  await axios
    .get(url)
    .then(response => {
      dispatch(checkPromocodeSuccess(response.data));
    })
    .catch(error => {
      dispatch(checkPromocodeError(errorMessage(error)));
    });
};
