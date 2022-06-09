import { WishlistState } from "./";
import { IProductSize } from "../../interfaces/products";

type WishlistActionType = { type: "[WishList] - Load wishlist"; payload: string[] };

export const wishlistReducer = (state: WishlistState, action: WishlistActionType): WishlistState => {
  switch (action.type) {
    case "[WishList] - Load wishlist":
      return {
        ...state,
        wishlist: action.payload,
      };

    default:
      return state;
  }
};
