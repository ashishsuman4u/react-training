import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//import { createLogger } from "redux-logger";

import reducers from "./reducer";
import { loadState, saveState } from "./sessionStorage";
import logger from "./middleware/loggerMiddleware";

const getInitialState = initialState => {
  if (initialState) {
    return initialState;
  } else {
    return loadState();
  }
};

export default ({ initialState, children }) => {
  const store = createStore(
    reducers,
    getInitialState(initialState),
    applyMiddleware(thunk, logger)
  );

  store.subscribe(() => {
    saveState(store.getState());
  });
  return <Provider store={store}>{children}</Provider>;
};
