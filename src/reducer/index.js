import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";

import ProductsReducer from "./productsReducer";
import CartReducer from "./cartReducer";

const combinedReducers = combineReducers({
  products: ProductsReducer,
  cart: CartReducer,
  form: FormReducer
});

export default combinedReducers;
