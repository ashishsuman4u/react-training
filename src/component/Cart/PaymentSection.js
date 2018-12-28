import React, { Fragment } from "react";
import classNames from "classnames";
import { PropTypes } from "prop-types";

import Promocode from "./Promocode";
import Payment from "./Payment";
import ThemeContext from "../../context/ThemeContext";

const PaymentSection = ({
  cart,
  checkPromocodeFromApi,
  stepDetails,
  nextStep,
  billing
}) => {
  return (
    <ThemeContext.Consumer>
      {value => (
        <Fragment>
          <Promocode
            checkPromocodeFromApi={checkPromocodeFromApi}
            isFetching={cart.isFetching}
            error={cart.error}
            promocode={cart.promocode}
            grandTotal={billing.subTotal}
          />
          <div className="ui form segment">
            <Payment itemInCart={cart.items.length} billing={billing} />
            <div>
              <button
                onClick={() => {
                  nextStep(stepDetails);
                }}
                className={classNames(
                  "ui",
                  { disabled: billing.grandTotal <= 0 },
                  `${value.theme} button`
                )}>
                Continue to Shipping Details
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </ThemeContext.Consumer>
  );
};

PaymentSection.propTypes = {
  cart: PropTypes.object.isRequired,
  checkPromocodeFromApi: PropTypes.func.isRequired,
  stepDetails: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  billing: PropTypes.object.isRequired
};

export default PaymentSection;
