import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import ThemeContext from "../../context/ThemeContext";

const cartButton = (item, isAdded, addItemToCart, theme) => {
  if (isAdded) {
    return (
      <Link to="/cart" className="ui right floated green label">
        <i className="credit card icon" />
        Checkout
      </Link>
    );
  }
  return (
    <button
      id={item.id}
      onClick={addItemToCart}
      className={`ui right floated ${theme} button label`}>
      <i className="shop icon" /> Add
    </button>
  );
};

const Card = ({ item, isAdded, addItemToCart }) => {
  const imageUrl = `https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/master/src/static/products/${
    item.sku
  }_1.jpg`;

  const freeShipping = isFreeShipping => {
    if (isFreeShipping) {
      return <div className="ui red right ribbon label">Free Shipping</div>;
    }
    return <div />;
  };

  return (
    <ThemeContext.Consumer>
      {value => (
        <div className="column">
          <div className="ui card">
            <div className="image">
              {freeShipping(item.isFreeShipping)}
              <img alt="" src={imageUrl} />
            </div>
            <div className="content">
              <div className="header">{item.title}</div>
              <div className="description">{item.style}</div>
            </div>
            <div className="extra content">
              <div className="ui teal tag label">{`${item.currencyFormat} ${
                item.price
              }`}</div>
              {cartButton(item, isAdded, addItemToCart, value.theme)}
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

Card.propTypes = {
  item: PropTypes.object.isRequired,
  isAdded: PropTypes.bool.isRequired,
  addItemToCart: PropTypes.func.isRequired
};

export default Card;
