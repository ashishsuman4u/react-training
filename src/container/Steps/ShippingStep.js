import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import classNames from "classnames";
import { compose } from "redux";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import renderStep from "../../component/shared/renderStep";
import ThemeContext from "../../context/ThemeContext";

const stepDetails = {
  nextStep: 3,
  address: {}
};

const fields = [
  { name: "name", label: "Name" },
  { name: "address1", label: "Address line 1" },
  { name: "address2", label: "Address line 2" },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "country", label: "Country" },
  { name: "pin", label: "Pin Code" }
];

class ShippingStep extends Component {
  static contextType = ThemeContext;
  onSubmit = address => {
    const { nextStep } = this.props;
    stepDetails.address = address;
    nextStep(stepDetails);
  };

  renderField({ input, type, label, meta }) {
    return (
      <div
        className={classNames({ error: meta.touched && meta.error }, "field")}>
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
                {fields.map(field => {
                  return (
                    <Field
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      type="text"
                      component={this.renderField}
                    />
                  );
                })}
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

ShippingStep.propTypes = {
  nextStep: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    initialValues: state.cart.address
  };
}
export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: "address",
    validate: validateInput
  })
)(renderStep(ShippingStep));
