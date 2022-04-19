import { createContext } from "react";
import { ICartProduct } from "../../interfaces";

interface ContextProps {
  cart: ICartProduct[];
  total: number;
  subTotal: number;
  tax: number;
  numberOfItems: number;
  addProductsToCart: (products: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeItemFromCart: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
