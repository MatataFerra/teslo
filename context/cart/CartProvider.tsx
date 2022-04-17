import { FC, useReducer } from "react";
import { Children, ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: FC<Children> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addProductsToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart) {
      return dispatch({
        type: "[Cart] - Add product to cart",
        payload: [...state.cart, product],
      });
    }

    const productWithDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productWithDifferentSize) {
      return dispatch({
        type: "[Cart] - Add product to cart",
        payload: [...state.cart, product],
      });
    }

    // const productWithNoStock = state.cart.find((p) => p.restStock === 0);
    // if (productWithNoStock) {
    //   return dispatch({
    //     type: "[Cart] - Add product to cart",
    //     payload: [...state.cart, product],
    //   });
    // }

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      if (p.quantity + product.quantity > p.productStock) {
        return {
          ...p,
          quantity: p.productStock,
          restStock: 0,
        };
      }

      p.quantity += product.quantity;
      p.restStock -= p.quantity;

      return p;
    });

    dispatch({
      type: "[Cart] - Add product to cart",
      payload: updatedProducts,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductsToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
