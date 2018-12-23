import React, { Component, Fragment } from "react";

import CartStep from "../../container/Steps/CartStep";
import ShippingStep from "../../container/Steps/ShippingStep";
import ConfirmStep from "../../container/Steps/ConfirmStep";

class Cart extends Component {
  state = { step: 1 };

  updateStep = step => {
    this.setState({ step });
  };

  renderStep() {
    if (this.state.step === 1) {
      return <CartStep step={this.state.step} updateStep={this.updateStep} />;
    }
    if (this.state.step === 2) {
      return (
        <ShippingStep step={this.state.step} updateStep={this.updateStep} />
      );
    }
    if (this.state.step === 3) {
      return (
        <ConfirmStep step={this.state.step} updateStep={this.updateStep} />
      );
    }
  }

  render() {
    return (
      <Fragment>
        <div className="ui three top attached steps">
          <div className={this.state.step === 1 ? "active step" : "step"}>
            <i className="cart icon" />
            <div className="content">
              <div className="title">Cart</div>
              <div className="description">Add or Update items in cart</div>
            </div>
          </div>
          <div className={this.state.step === 2 ? "active step" : "step"}>
            <i className="truck icon" />
            <div className="content">
              <div className="title">Shipping Details</div>
              <div className="description">
                Add or Update your shipping details
              </div>
            </div>
          </div>
          <div className={this.state.step === 3 ? "active step" : "step"}>
            <i className="info icon" />
            <div className="content">
              <div className="title">Confirm Order</div>
              <div className="description">Verify order details</div>
            </div>
          </div>
        </div>
        <div className="ui attached segment">
          <div className="row">{this.renderStep()}</div>
        </div>
      </Fragment>
    );
  }
}
export default Cart;
