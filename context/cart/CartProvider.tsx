import { FC, useReducer, useEffect } from "react";
import { Children, ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: FC<Children> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    const cart = Cookie.get("cart");
    if (cart) {
      dispatch({
        type: "[Cart] - Load cart from cookies | storage",
        payload: JSON.parse(cart),
      });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) {
      Cookie.set("cart", JSON.stringify(state.cart));
    } else {
      Cookie.remove("cart");
    }
  }, [state.cart]);

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
      p.restStock -= product.quantity;

      return p;
    });

    dispatch({
      type: "[Cart] - Add product to cart",
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // if (p.quantity + product.quantity > p.productStock) {
      //   return {
      //     ...p,
      //     quantity: p.productStock,
      //     restStock: 0,
      //   };
      // }

      return p;
    });

    dispatch({
      type: "[Cart] - Update cart quantity",
      payload: updatedProducts,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductsToCart,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
