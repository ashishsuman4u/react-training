import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Products from "../container/Products";
import Cart from "../component/Cart/Cart";
import Header from "./shared/Header";
import { ThemeStore } from "../context/ThemeContext";

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <ThemeStore>
          <Header />
          <Switch>
            <Route path="/cart" component={Cart} />
            <Route path="/:page" component={Products} />
            <Route path="/" component={Products} />
          </Switch>
        </ThemeStore>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
