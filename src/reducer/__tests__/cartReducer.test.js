import cartReducer from "../cartReducer";
import { ADD_TO_CART } from "../../action/type";

it("checks the item is added successfully", () => {
  const action = {
    type: ADD_TO_CART,
    payload: 1
  };

  const newState = cartReducer({ items: [] }, action);
  expect(newState).toEqual({ items: [{ id: 1, count: 1 }] });
});
