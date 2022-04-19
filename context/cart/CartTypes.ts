import { ICartProduct } from "../../interfaces";

export type CartActionType =
  | {
      type: "[Cart] - Load cart from cookies | storage";
      payload: ICartProduct[];
    }
  | { type: "[Cart] - Add product to cart"; payload: ICartProduct[] }
  | { type: "[Cart] - Update cart quantity"; payload: ICartProduct[] }
  | { type: "[Cart] - Remove item from cart"; payload: ICartProduct[] }
  | {
      type: "[Cart] - Update order summary";
      payload: {
        total: number;
        subTotal: number;
        tax: number;
        numberOfItems: number;
      };
    };
