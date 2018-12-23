import React from "react";

import Item from "./Item";

const CartItem = ({
  item,
  count,
  increaseItemCount,
  decreaseItemCount,
  removeItemFromCart
}) => {
  return (
    <Item item={item}>
      <div className="extra content">
        <button
          type="button"
          className={
            count === 1
              ? "ui secondary inverted disabled button"
              : "ui secondary inverted button"
          }
          onClick={() => {
            decreaseItemCount(item.id, count - 1);
          }}>
          -
        </button>
        <label className="ui input">{count}</label>
        <button
          type="button"
          className="ui secondary inverted button"
          onClick={() => {
            increaseItemCount(item.id, count + 1);
          }}>
          +
        </button>
        <button
          type="button"
          className="ui small red button"
          onClick={() => {
            removeItemFromCart(item.id);
          }}>
          Remove
        </button>
      </div>
    </Item>
  );
};

export default CartItem;
