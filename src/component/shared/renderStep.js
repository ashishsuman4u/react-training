import React, { Component } from "react";
import { PropTypes } from "prop-types";

import { proceedToConfirmStep } from "../../action/cart";

export default WrappedComponent => {
  class RenderStep extends Component {
    nextStep = stepDetails => {
      if (this.props.step === 1) {
        this.props.updateStep(stepDetails.nextStep);
      }
      if (this.props.step === 2) {
        const { dispatch } = this.props;
        dispatch(proceedToConfirmStep(stepDetails.address));
        this.props.updateStep(stepDetails.nextStep);
      }
    };

    render() {
      return <WrappedComponent {...this.props} nextStep={this.nextStep} />;
    }
  }
  RenderStep.propTypes = {
    step: PropTypes.number.isRequired,
    updateStep: PropTypes.func.isRequired
  };
  return RenderStep;
};
