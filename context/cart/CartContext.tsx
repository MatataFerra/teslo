import { createContext } from "react";
import { ICartProduct, ShippingAddress } from "../../interfaces";

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  total: number;
  subTotal: number;
  tax: number;
  numberOfItems: number;

  shippingAddress?: ShippingAddress;

  cartIsLoaded: () => void;
  addProductsToCart: (products: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeItemFromCart: (product: ICartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
  createOrder: () => Promise<{
    hasError: boolean;
    message: string;
  }>;
}

export const CartContext = createContext({} as ContextProps);
