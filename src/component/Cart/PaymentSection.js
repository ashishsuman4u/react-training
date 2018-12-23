import React, { Fragment } from "react";
import _ from "lodash";

import Promocode from "./Promocode";
import Payment from "./Payment";
import ThemeContext from "../../context/ThemeContext";

const PaymentSection = ({
  products,
  cart,
  checkPromocodeFromApi,
  stepDetails,
  nextStep
}) => {
  const { billing } = stepDetails;
  const productList = _.filter(products.items, function(item) {
    return _.some(cart.items, cartItem => {
      return cartItem.id === item.id;
    });
  });
  billing.totalItemPrice = calculatePrice(productList, cart.items);
  billing.totalDeliveryCharges = calculateDeliveryCharges(
    productList,
    cart.items
  );
  billing.subTotal = billing.totalItemPrice + billing.totalDeliveryCharges;
  billing.promoDiscount = 0;
  if (
    billing.totalItemPrice !== 0 &&
    cart.promocode &&
    cart.promocode.discount &&
    billing.subTotal >= cart.promocode.minimumAmount
  ) {
    billing.promoDiscount = cart.promocode.discount;
  }
  billing.grandTotal =
    Math.round(
      (billing.totalItemPrice +
        billing.totalDeliveryCharges -
        billing.promoDiscount) *
        100
    ) / 100;
  const firstItem = _.first(productList);
  billing.currencyFormat = "";
  if (firstItem) {
    billing.currencyFormat = firstItem.currencyFormat;
  }
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
                className={
                  billing.grandTotal > 0
                    ? `ui ${value.theme} button`
                    : `ui disabled ${value.theme} button`
                }>
                Continue to Shipping Details
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </ThemeContext.Consumer>
  );
};

const calculatePrice = (items, counts) => {
  let total = 0;
  _.each(items, item => {
    const count = _.find(counts, count => {
      return count.id === item.id;
    });
    total += count.count * item.price;
  });
  return Math.round(total * 100) / 100;
};

const calculateDeliveryCharges = items => {
  let total = 0;
  if (
    _.some(items, item => {
      return !item.isFreeShipping;
    })
  ) {
    total = 10;
  }
  return total;
};

export default PaymentSection;
