import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { PropTypes } from "prop-types";

import * as selector from "../../selector/cart";
import renderStep from "../../component/shared/renderStep";
import ShowAddress from "../../component/Address/ShowAddress";
import Payment from "../../component/Cart/Payment";
import Item from "../../component/Cart/Item";
import Modal from "../../portal/Modal";
import ThemeContext from "../../context/ThemeContext";

class ConfirmStep extends Component {
  static contextType = ThemeContext;
  state = { showModal: false };
  renderCartItems() {
    const { productList, cart } = this.props;
    if (productList.length === 0) {
      return <div className="item">No item to show</div>;
    }
    return productList.map(item => {
      const updateItem = _.assign(item, _.find(cart.items, { id: item.id }));
      return (
        <Item key={item.id} item={updateItem}>
          <div className="extra content">Quantity - {updateItem.count}</div>
        </Item>
      );
    });
  }

  getContainer() {
    return document.querySelector("#modal");
  }

  renderLoader = () => {
    const { billing } = this.props;
    return (
      <Modal
        title="Checkout"
        description={`Please pay the final amount of ${
          billing.currencyFormat
        } ${billing.grandTotal}`}
        dismiss={() => {
          return false;
        }}
        action={
          <Link to="/" className={`ui ${this.context.theme} button`}>
            Go back to Home
          </Link>
        }
        getContainer={this.getContainer}
      />
    );
  };

  renderConfirmation = () => {
    const cart = this.props.cart;
    const { billing } = this.props;
    return (
      <Fragment>
        <div className="ui three column grid">
          <div className="five wide column">
            <div className="ui segment items">{this.renderCartItems()}</div>
          </div>
          <div className="six wide column">
            <div className="ui form segment items">
              <h2>Shipping Address</h2>
              <ShowAddress address={cart.address} />
            </div>
          </div>
          <div className="five wide column">
            <div className="ui segment items">
              <div className="ui form">
                <Payment itemInCart={cart.items.length} billing={billing} />
              </div>
            </div>
          </div>
        </div>
        <div className="ui center aligned grid">
          <div className="sixteen wide column">
            <div className="ui right floated">
              <button
                onClick={() => {
                  this.setState({ showModal: true });
                }}
                className={`ui ${this.context.theme} button`}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    if (this.state.showModal) {
      return (
        <Fragment>
          {this.renderConfirmation()}
          {this.renderLoader()}
        </Fragment>
      );
    }
    return <Fragment>{this.renderConfirmation()}</Fragment>;
  }
}

ConfirmStep.propTypes = {
  cart: PropTypes.object.isRequired,
  productList: PropTypes.array.isRequired,
  billing: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
    productList: state.products.items.filter(item => {
      return state.cart.items.some(cartItem => {
        return cartItem.id === item.id;
      });
    }),
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

export default connect(mapStateToProps)(renderStep(ConfirmStep));
