import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//import { createLogger } from "redux-logger";

import reducers from "./reducer";
import { loadState, saveState } from "./sessionStorage";
import logger from "./middleware/loggerMiddleware";

const persistentState = loadState();
const store = createStore(
  reducers,
  persistentState,
  applyMiddleware(thunk, logger)
);

store.subscribe(() => {
  saveState(store.getState());
});

export default props => {
  return <Provider store={store}>{props.children}</Provider>;
};
