import React, { Fragment } from "react";
import { PropTypes } from "prop-types";

const Item = props => {
  const imageUrl = `https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/master/src/static/products/${
    props.item.sku
  }_2.jpg`;
  return (
    <Fragment>
      <div className="item">
        <div className="ui tiny image">
          <img alt="" src={imageUrl} />
        </div>
        <div className="content">
          <div className="header">{props.item.title}</div>
          <div className="meta">
            <span>{props.item.style}</span>
          </div>
          <div className="description">
            <p />
          </div>
          <div className="extra">
            Price - {`${props.item.currencyFormat} ${props.item.price}`}
          </div>
          {props.children}
        </div>
      </div>
    </Fragment>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item;
