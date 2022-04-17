import { ICartProduct } from "../../interfaces";

export type CartActionType =
  | {
      type: "[Cart] - Load cart from cookies | storage";
      payload: ICartProduct[];
    }
  | { type: "[Cart] - Add product to cart"; payload: ICartProduct[] };
