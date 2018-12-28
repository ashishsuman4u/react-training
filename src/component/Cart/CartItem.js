import React from "react";
import { PropTypes } from "prop-types";

import renderCartItem from "../shared/renderCartItem";
import Item from "./Item";

const CartItem = props => {
  return <Item item={props.item} children={props.children} />;
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default renderCartItem(CartItem, true);
