import * as _ from "lodash";
import * as actionType from "../action/type";

const initialState = {
  items: [],
  totalItemCount: 0,
  pagination: [],
  error: "",
  currentPage: {}
};

const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_PRODUCTS_SUCCESS:
      return {
        items: [..._.uniqBy([...state.items, ...action.payload.items], "id")],
        totalItemCount: action.payload.count,
        pagination: [
          ...state.pagination,
          {
            pageIndex: action.payload.pageIndex,
            sortDirection: action.payload.sortDirection,
            filterBySize: action.payload.filterBySize,
            itemIds: action.payload.items.map(i => i.id)
          }
        ],
        currentPage: {
          pageIndex: action.payload.pageIndex,
          pageSize: action.payload.pageSize,
          sortDirection: action.payload.sortDirection,
          filterBySize: action.payload.filterBySize
        },
        isFetching: false
      };
    case actionType.FETCH_PRODUCTS_ERROR:
      return { ...state, error: action.error, isFetching: false };
    case actionType.FETCH_PRODUCTS_START:
      return { ...state, isFetching: true };
    case actionType.UPDATE_CURRENT_INDEX:
      return { ...state, currentPage: action.currentPage };
    default:
      return state;
  }
};

export default ProductsReducer;
