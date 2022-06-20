import { WishlistState } from "./";

type WishlistActionType =
  | { type: "[WishList] - Load wishlist"; payload: string[] }
  | { type: "[WishList] - Add to wishlist"; payload: string }
  | { type: "[WishList] - Remove from wishlist"; payload: string };

export const wishlistReducer = (state: WishlistState, action: WishlistActionType): WishlistState => {
  switch (action.type) {
    case "[WishList] - Load wishlist":
      return {
        ...state,
        wishlist: action.payload,
      };

    case "[WishList] - Add to wishlist":
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case "[WishList] - Remove from wishlist":
      return {
        ...state,
        wishlist: state.wishlist.filter((slug) => slug !== action.payload),
      };

    default:
      return state;
  }
};
