import { createSelector } from "reselect";

const calculatePrice = (items, counts) => {
  let total = 0;
  items.forEach(item => {
    const count = counts.find(count => {
      return count.id === item.id;
    });
    total += count.count * item.price;
  });
  return Math.round(total * 100) / 100;
};

const calculateDeliveryCharges = items => {
  let total = 0;
  if (
    items.some(item => {
      return !item.isFreeShipping;
    })
  ) {
    total = 10;
  }
  return total;
};

const productListSelector = state =>
  state.products.items.filter(item => {
    return state.cart.items.some(cartItem => {
      return cartItem.id === item.id;
    });
  });

export const currencyFormatSelector = createSelector(
  productListSelector,
  products => (products && products[0] ? products[0].currencyFormat : "")
);

const cartItemsSelector = state => state.cart.items;

const promocodeSelector = state => state.cart.promocode;

export const totalItemPriceSelector = createSelector(
  productListSelector,
  cartItemsSelector,
  (products, items) => calculatePrice(products, items)
);

export const totalDeliveryChargesSelector = createSelector(
  productListSelector,
  products => calculateDeliveryCharges(products)
);

export const subTotalSelector = createSelector(
  totalItemPriceSelector,
  totalDeliveryChargesSelector,
  (totalItemPrice, totalDeliveryCharges) =>
    totalItemPrice + totalDeliveryCharges
);

export const promoDiscountSelector = createSelector(
  totalItemPriceSelector,
  promocodeSelector,
  subTotalSelector,
  (totalItemPrice, promocode, subTotal) =>
    totalItemPrice !== 0 &&
    promocode &&
    promocode.discount &&
    subTotal >= promocode.minimumAmount
      ? promocode.discount
      : 0
);

export const grandTotalSelector = createSelector(
  totalItemPriceSelector,
  totalDeliveryChargesSelector,
  promoDiscountSelector,
  (totalItemPrice, totalDeliveryCharges, promoDiscount) =>
    Math.round((totalItemPrice + totalDeliveryCharges - promoDiscount) * 100) /
    100
);
