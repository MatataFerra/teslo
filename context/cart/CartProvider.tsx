import { FC, useReducer, useEffect } from "react";
import { Children, ICartProduct, ShippingAddress, IOrder } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import Cookie from "js-cookie";
import { tesloApi } from "../../api";
import axios from "axios";

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  total: number;
  subTotal: number;
  tax: number;
  numberOfItems: number;
  shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  total: 0,
  subTotal: 0,
  tax: 0,
  numberOfItems: 0,
  shippingAddress: undefined,
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
    if (state.shippingAddress) return;

    const shippingAddress: ShippingAddress = {
      firstName: Cookie.get("firstName") ?? "",
      lastName: Cookie.get("lastName") ?? "",
      address: Cookie.get("address") ?? "",
      address2: Cookie.get("address2") ?? "",
      zip: Cookie.get("zip") ?? "",
      city: Cookie.get("city") ?? "",
      country: Cookie.get("country") ?? "",
      phone: Cookie.get("phone") ?? "",
    };

    dispatch({
      type: "[Cart] - Load address from cookie",
      payload: shippingAddress,
    });
  }, [state.shippingAddress]);

  useEffect(() => {
    if (state.cart.length > 0) {
      Cookie.set("cart", JSON.stringify(state.cart));
    } else {
      Cookie.remove("cart");
    }
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
    const subTotal = state.cart.reduce((prev, current) => current.quantity * current.price + prev, 0);
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
      (p) => p._id === product._id && p.size?.size === product.size?.size
    );
    if (!productWithDifferentSize) {
      return dispatch({
        type: "[Cart] - Add product to cart",
        payload: [...state.cart, product],
      });
    }

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size?.size !== product.size?.size) return p;

      if (p.quantity + product.quantity > (p.size?.stock ?? 0)) {
        return {
          ...p,
          quantity: p.size?.stock ?? 0,
          size: {
            ...p!.size,
            sizeRestStock: 0,
            items: p.size?.stock,
          },
        };
      }

      p.quantity += product.quantity;
      p.size!.sizeRestStock -= product.quantity;

      return p;
    }) as ICartProduct[];

    dispatch({
      type: "[Cart] - Add product to cart",
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size?.size !== product.size?.size) return p;

      return p;
    });

    dispatch({
      type: "[Cart] - Update cart quantity",
      payload: updatedProducts,
    });
  };

  const removeItemFromCart = (product: ICartProduct) => {
    const updatedProducts = state.cart.filter((p) => !(p._id === product._id && p.size?.size === product.size?.size));

    dispatch({
      type: "[Cart] - Remove item from cart",
      payload: updatedProducts,
    });
  };

  const updateAddress = (data: ShippingAddress) => {
    const { firstName, lastName, address, address2, zip, city, country, phone } = data;

    Cookie.set("firstName", firstName);
    Cookie.set("lastName", lastName);
    Cookie.set("address", address);
    Cookie.set("address2", address2 ?? "");
    Cookie.set("zip", zip);
    Cookie.set("city", city);
    Cookie.set("country", country);
    Cookie.set("phone", phone);
    dispatch({ type: "[Cart] - Update shippingAddress", payload: data });
  };

  const createOrder = async (): Promise<{ hasError: boolean; message: string }> => {
    if (!state.shippingAddress) {
      throw new Error("Please provide shipping address");
    }

    const body: IOrder = {
      orderItems: state.cart.map((p) => ({
        ...p,
        size: {
          stock: p.size!.sizeRestStock,
          size: p.size!.size,
          sizeRestStock: p.size!.sizeRestStock,
        },
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
      status: "pending",
    };

    try {
      const { data } = await tesloApi.post<IOrder>("/orders", body);

      if (data.orderItems.length > 0) {
        data.orderItems.forEach(async (p) => {
          await tesloApi.put(`/products/${p.slug}`, { sizeStock: p.size });
        });
      }

      dispatch({ type: "[Cart] - Order complete" });

      return {
        hasError: false,
        message: data._id!,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data?.message ?? "",
        };
      }

      return {
        hasError: true,
        message: "Something went wrong",
      };
    }
  };

  const cartIsLoaded = () => {
    dispatch({ type: "[Cart] - cart is loaded" });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        cartIsLoaded,
        addProductsToCart,
        updateCartQuantity,
        removeItemFromCart,
        updateAddress,
        createOrder,
      }}>
      {children}
    </CartContext.Provider>
  );
};
