import { FC, useReducer, useEffect } from "react";
import { Children, ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";

export interface CartState {
  cart: ICartProduct[];
  total: number;
  subTotal: number;
  tax: number;
  numberOfItems: number;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  total: 0,
  subTotal: 0,
  tax: 0,
  numberOfItems: 0,
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

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.quantity * current.price + prev,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.21);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (1 + taxRate),
    };

    dispatch({
      type: "[Cart] - Update order summary",
      payload: orderSummary,
    });
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

  const removeItemFromCart = (product: ICartProduct) => {
    const updatedProducts = state.cart.filter(
      (p) => p._id !== product._id && p.size !== product.size
    );
    dispatch({
      type: "[Cart] - Remove item from cart",
      payload: updatedProducts,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductsToCart,
        updateCartQuantity,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
