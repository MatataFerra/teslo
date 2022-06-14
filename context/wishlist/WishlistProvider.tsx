import { FC, useEffect, useReducer, useState } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { tesloApi } from "../../api";
import { Children, IProductSize } from "../../interfaces";
import { WishlistContext, wishlistReducer } from "./";
import { Router, useRouter } from "next/router";

export interface WishlistState {
  wishlist: string[];
}

const Wishlist_INITIAL_STATE: WishlistState = {
  wishlist: [],
};

export const WishlistProvider: FC<Children> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, Wishlist_INITIAL_STATE);
  const { data: session } = useSession();
  const router = useRouter();

  const wishlistedProducts = Cookies.get("wishlist");
  const wishlist = wishlistedProducts ? JSON.parse(wishlistedProducts) : [];

  useEffect(() => {
    const getWishList = async () => {
      const { data: userId } = await tesloApi.get(`/user/me?email=${session?.user?.email}`);
      const { data } = await tesloApi.get(`/wishlist`);

      Cookies.set("userdataproducts", JSON.stringify(data.products));
      const { data: products } = await tesloApi.get(`/products/id`);

      return products;
    };

    if (!session?.user?.email) {
      Cookies.set("wishlist", JSON.stringify([""]));
      return dispatch({ type: "[WishList] - Load wishlist", payload: [] });
    }

    getWishList()
      .then((wishlist) => {
        if (!wishlist || wishlist.length === 0) Cookies.set("wishlist", JSON.stringify([]));
        const slugs = wishlist.map((item: any) => item.slug);
        Cookies.set("wishlist", JSON.stringify(slugs));
        dispatch({ type: "[WishList] - Load wishlist", payload: slugs });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [session?.user?.email]);

  const addToWishlist = async (product: IProductSize) => {
    const productExists = wishlist.find((p: any) => p === product.slug);

    if (!session?.user?.email) {
      router.push("/auth/login?p=/wishlist");
      return;
    }

    if (!productExists) {
      Cookies.set("wishlist", JSON.stringify([...wishlist, product?.slug]));
      await tesloApi.put(`/wishlist/`);
      dispatch({ type: "[WishList] - Add to wishlist", payload: product?.slug });
    } else {
      const newWishList = wishlist.filter((p: any) => p !== product.slug);
      Cookies.set("wishlist", JSON.stringify(newWishList));
      await tesloApi.put(`/wishlist/`);
      dispatch({ type: "[WishList] - Remove from wishlist", payload: product.slug });
    }
  };

  const removeToWishlist = async (product: IProductSize) => {
    const productExists = wishlist.find((p: any) => p === product.slug);

    if (productExists) {
      const newWishlist = wishlist.filter((p: any) => p !== product.slug);
      Cookies.set("wishlist", JSON.stringify([...newWishlist]));
      await tesloApi.put(`/wishlist/`);
      dispatch({ type: "[WishList] - Remove from wishlist", payload: product.slug });
      return;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        ...state,
        addToWishlist,
        removeToWishlist,
      }}>
      {children}
    </WishlistContext.Provider>
  );
};
