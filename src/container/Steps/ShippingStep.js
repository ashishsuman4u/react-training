import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import renderStep from "../../component/shared/renderStep";
import ThemeContext from "../../context/ThemeContext";

const stepDetails = {
  nextStep: 3,
  address: {}
};

class ShippingStep extends Component {
  static contextType = ThemeContext;
  onSubmit = address => {
    const { nextStep } = this.props;
    stepDetails.address = address;
    nextStep(stepDetails);
  };

  renderField({ input, type, label, meta }) {
    return (
      <div className={meta.touched && meta.error ? "error field" : "field"}>
        <label>{label}</label>
        <input {...input} type={type} />
      </div>
    );
  }
  render() {
    return (
      <div className="ui three column grid">
        <div className="three wide column" />
        <div className="ten wide column">
          <div className="ui segment items">
            <div className="ui form segment">
              <h2>Shipping Address</h2>
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field
                  name="name"
                  label="Name"
                  type="text"
                  component={this.renderField}
                />
                <Field
                  name="address1"
                  label="Address line 1"
                  type="text"
                  component={this.renderField}
                />
                <Field
                  name="address2"
                  label="Address line 2"
                  type="text"
                  component={this.renderField}
                />
                <Field
                  name="city"
                  label="City"
                  type="text"
                  component={this.renderField}
                />
                <Field
                  name="state"
                  label="State"
                  type="text"
                  component={this.renderField}
                />
                <Field
                  name="country"
                  label="Country"
                  type="text"
                  component={this.renderField}
                />
                <Field
                  name="pin"
                  label="Pin code"
                  type="text"
                  component={this.renderField}
                />
                <div>
                  <button className={`ui ${this.context.theme} button`}>
                    Continue to Confirm Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="three wide column" />
      </div>
    );
  }
}

function validateInput(formValues) {
  const error = {};
  if (!formValues.name) {
    error.name = "Required";
  }
  if (!formValues.address1) {
    error.address1 = "Required";
  }
  if (!formValues.address2) {
    error.address2 = "Required";
  }
  if (!formValues.city) {
    error.city = "Required";
  }
  if (!formValues.state) {
    error.state = "Required";
  }
  if (!formValues.country) {
    error.country = "Required";
  }
  if (!formValues.pin) {
    error.pin = "Required";
  }
  return error;
}

const ShippingStepForm = reduxForm({
  form: "address",
  validate: validateInput
})(ShippingStep);

function mapStateToProps(state) {
  return {
    initialValues: state.cart.address
  };
}

export default connect(mapStateToProps)(renderStep(ShippingStepForm));
