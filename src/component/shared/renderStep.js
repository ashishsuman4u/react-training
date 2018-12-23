import React, { Component } from "react";

import { proceedToShippingStep, proceedToConfirmStep } from "../../action/cart";

export default WrappedComponent => {
  class RenderStep extends Component {
    nextStep = stepDetails => {
      if (this.props.step === 1) {
        const { dispatch } = this.props;
        dispatch(proceedToShippingStep(stepDetails.billing));
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
  return RenderStep;
};
