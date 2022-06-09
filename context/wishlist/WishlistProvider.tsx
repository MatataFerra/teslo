import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { FC, useEffect, useReducer } from "react";
import { tesloApi } from "../../api";
import { Children, IProductSize } from "../../interfaces";
import { WishlistContext, wishlistReducer } from "./";

export interface WishlistState {
  wishlist: string[];
}

const Wishlist_INITIAL_STATE: WishlistState = {
  wishlist: [],
};

export const WishlistProvider: FC<Children> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, Wishlist_INITIAL_STATE);
  const { data: session } = useSession();

  useEffect(() => {
    const getWishList = async () => {
      const { data: userId } = await tesloApi.get(`/user/me?email=${session?.user?.email}`);
      const { data } = await tesloApi.get(`/wishlist?userId=${userId.userId}`);
      Cookies.set("userdataproducts", JSON.stringify(data.products));
      const { data: products } = await tesloApi.get(`/products/id`);

      return products;
    };

    getWishList()
      .then((wishlist) => {
        const slugs = wishlist.map((item: any) => item.slug);
        Cookies.set("wishlist", JSON.stringify(slugs));
        dispatch({ type: "[WishList] - Load wishlist", payload: slugs });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [session?.user?.email]);

  return (
    <WishlistContext.Provider
      value={{
        ...state,
      }}>
      {children}
    </WishlistContext.Provider>
  );
};
