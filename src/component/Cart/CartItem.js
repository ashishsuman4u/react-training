import React, { Component } from "react";

import renderCartItem from "../shared/renderCartItem";
import Item from "./Item";

class CartItem extends Component {
  render() {
    return <Item item={this.props.item} children={this.props.children} />;
  }
}

export default renderCartItem(CartItem, true);
