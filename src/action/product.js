import axios from "axios";

import * as actionTypes from "./type";
import { errorMessage, BASE_URL } from "./api";

const productSuccessMessage = (
  payload,
  pageIndex,
  pageSize,
  sortDirection,
  filterBySize
) => ({
  ...payload,
  pageIndex,
  pageSize,
  sortDirection,
  filterBySize
});

export const fetchProductsStart = () => ({
  type: actionTypes.FETCH_PRODUCTS_START
});

export const fetchProductSuccess = payload => ({
  type: actionTypes.FETCH_PRODUCTS_SUCCESS,
  payload
});

export const fetchProductError = error => ({
  type: actionTypes.FETCH_PRODUCTS_ERROR,
  error
});

export const updateCurrentIndex = (
  pageIndex,
  pageSize,
  sortDirection,
  filterBySize
) => {
  return {
    type: actionTypes.UPDATE_CURRENT_INDEX,
    currentPage: { pageIndex, pageSize, sortDirection, filterBySize }
  };
};

export const fetchProduct = (
  pageIndex,
  pageSize,
  sortDirection,
  filterBySize
) => async dispatch => {
  let url = `${BASE_URL}/item?page=${pageIndex}&limit=${pageSize}&sortBy=price&order=${sortDirection}`;
  if (filterBySize) {
    url = `${url}&filter=availableSizes|${filterBySize}`;
  }
  dispatch(fetchProductsStart());
  await axios
    .get(url)
    .then(response => {
      dispatch(
        fetchProductSuccess(
          productSuccessMessage(
            response.data,
            pageIndex,
            pageSize,
            sortDirection,
            filterBySize
          )
        )
      );
    })
    .catch(error => {
      dispatch(fetchProductError(errorMessage(error)));
    });
};
