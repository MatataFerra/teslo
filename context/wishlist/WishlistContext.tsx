import { createContext } from "react";
import { IProductSize } from "../../interfaces";

interface ContextProps {
  wishlist: string[];
  addToWishlist: (product: IProductSize) => void;
  removeToWishlist: (product: IProductSize) => void;
}

export const WishlistContext = createContext({} as ContextProps);
