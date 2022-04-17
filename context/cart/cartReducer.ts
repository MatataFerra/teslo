import { ICartProduct } from "../../interfaces";
import { CartState, CartActionType } from "./";

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - Load cart from cookies | storage":
      return {
        ...state,
      };

    case "[Cart] - Add product to cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    default:
      return state;
  }
};
