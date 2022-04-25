import { CartState, CartActionType } from "./";

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case "[Cart] - Load cart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
        cart: action.payload,
      };

    case "[Cart] - Add product to cart":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };

    case "[Cart] - Update cart quantity":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - Remove item from cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - Update order summary":
      return {
        ...state,
        ...action.payload,
      };

    case "[Cart] - Update shippingAddress":
    case "[Cart] - Load address from cookie":
      return {
        ...state,
        shippingAddress: { ...action.payload },
      };
    default:
      return state;
  }
};
