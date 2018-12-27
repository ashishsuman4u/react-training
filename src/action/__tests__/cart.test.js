import { addToCart } from "../cart";
import { ADD_TO_CART } from "../type";

it("checks the add to cart action object", () => {
  const action = addToCart(1);
  expect(action).toEqual({ type: ADD_TO_CART, payload: 1 });
});
