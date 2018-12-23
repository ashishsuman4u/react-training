import React, { Fragment } from "react";

const Payment = props => {
  const { itemInCart, billing } = props;
  const delivery = `${billing.currencyFormat} ${billing.totalDeliveryCharges}`;
  return (
    <Fragment>
      <h3>Payment</h3>
      <div className="field">
        <label>Price ({itemInCart} items)</label> {billing.currencyFormat}{" "}
        {billing.totalItemPrice}
      </div>
      <div className="field">
        <label>Delivery Charges</label>
        {billing.totalDeliveryCharges === 0 ? "Free" : delivery}
      </div>
      {getPromoDiscountField(billing.currencyFormat, billing.promoDiscount)}
      <div className="field">
        <label>Amount Payable</label> {billing.currencyFormat}{" "}
        {billing.grandTotal}
      </div>
    </Fragment>
  );
};

const getPromoDiscountField = (currencyFormat, promoDiscount) => {
  if (promoDiscount !== 0) {
    return (
      <div className="field">
        <label>Promotional Discount</label>
        {currencyFormat} {promoDiscount}
      </div>
    );
  }
};
export default Payment;
