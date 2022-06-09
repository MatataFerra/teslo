import { createContext } from "react";
import { IProductSize } from "../../interfaces";

interface ContextProps {
  wishlist: string[];
}

export const WishlistContext = createContext({} as ContextProps);
