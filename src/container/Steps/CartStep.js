import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import * as selector from "../../component/Cart/reselectCalculation";
import {
  increaseItemCount,
  decreaseItemCount,
  removeItemFromCart,
  checkPromocode
} from "../../action/cart";
import renderStep from "../../component/shared/renderStep";
import PaymentSection from "../../component/Cart/PaymentSection";
import CartItem from "../../component/Cart/CartItem";

const stepDetails = {
  nextStep: 2
};

class CartStep extends Component {
  increaseCount = (id, count) => {
    const { dispatch } = this.props;
    dispatch(increaseItemCount(id, count));
  };
  decreaseCount = (id, count) => {
    const { dispatch } = this.props;
    dispatch(decreaseItemCount(id, count));
  };
  removeItem = id => {
    const { dispatch } = this.props;
    dispatch(removeItemFromCart(id));
  };

  checkPromocodeFromApi = code => {
    const { dispatch } = this.props;
    dispatch(checkPromocode(code));
  };
  render() {
    return (
      <div className="ui two column  grid">
        <div className="ten wide column">
          <div className="ui segment items">
            <h3>Cart Items</h3>
            {renderCartItems(
              this.props.products,
              this.props.cart,
              this.increaseCount,
              this.decreaseCount,
              this.removeItem
            )}
          </div>
        </div>

        <div className="six wide column">
          <PaymentSection
            checkPromocodeFromApi={this.checkPromocodeFromApi}
            cart={this.props.cart}
            stepDetails={stepDetails}
            nextStep={this.props.nextStep}
            billing={this.props.billing}
          />
        </div>
      </div>
    );
  }
}

function renderCartItems(
  products,
  cart,
  increaseItemCount,
  decreaseItemCount,
  removeItem
) {
  const productList = _.filter(products.items, function(item) {
    return _.some(cart.items, cartItem => {
      return cartItem.id === item.id;
    });
  });
  if (productList.length === 0) {
    return <div className="item">No item to show</div>;
  }
  return productList.map(item => {
    const cartItem = _.find(cart.items, i => {
      return i.id === item.id;
    });
    return (
      <CartItem
        key={item.id}
        item={item}
        count={cartItem.count}
        increaseItemCount={increaseItemCount}
        decreaseItemCount={decreaseItemCount}
        removeItemFromCart={removeItem}
      />
    );
  });
}

function mapStateToProps(state) {
  return {
    products: state.products,
    cart: state.cart,
    billing: {
      totalItemPrice: selector.totalItemPriceSelector(state),
      totalDeliveryCharges: selector.totalDeliveryChargesSelector(state),
      subTotal: selector.subTotalSelector(state),
      promoDiscount: selector.promoDiscountSelector(state),
      grandTotal: selector.grandTotalSelector(state),
      currencyFormat: selector.currencyFormatSelector(state)
    }
  };
}

export default connect(mapStateToProps)(renderStep(CartStep));
