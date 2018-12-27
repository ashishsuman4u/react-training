import React, { Component, Fragment } from "react";
import classNames from "classnames";

import CartStep from "../../container/Steps/CartStep";
import ShippingStep from "../../container/Steps/ShippingStep";
import ConfirmStep from "../../container/Steps/ConfirmStep";
import ErrorBoundary from "../shared/ErrorBoundary";

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
      <ErrorBoundary header="Oops!! We got following error">
        <div className="ui three top attached steps">
          <div
            className={classNames({ active: this.state.step === 1 }, "step")}>
            <i className="cart icon" />
            <div className="content">
              <div className="title">Cart</div>
              <div className="description">Add or Update items in cart</div>
            </div>
          </div>
          <div
            className={classNames({ active: this.state.step === 2 }, "step")}>
            <i className="truck icon" />
            <div className="content">
              <div className="title">Shipping Details</div>
              <div className="description">
                Add or Update your shipping details
              </div>
            </div>
          </div>
          <div
            className={classNames({ active: this.state.step === 3 }, "step")}>
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
      </ErrorBoundary>
    );
  }
}
export default Cart;
