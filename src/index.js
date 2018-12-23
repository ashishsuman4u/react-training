import React from "react";
import ReactDOM from "react-dom";

import Store from "./store";
import AppRouter from "./component/AppRouter";
import "./style/style.css";

ReactDOM.render(
  <Store>
    <AppRouter />
  </Store>,
  document.querySelector("#root")
);
