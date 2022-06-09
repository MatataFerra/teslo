import Cookies from "js-cookie";
import { NextPage, GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ShopLayout } from "../../components/layouts";
import { WishListCardList } from "../../components/wishlist";
import { dbProducts, dbWishList } from "../../database";
import { getAllDataProductsBySlug } from "../../database/dbProducts";
import { IProductSize } from "../../interfaces";
import { WishListEmpty } from "../../components/wishlist";

interface Props {
  favorites: IProductSize[];
}

const WishList: NextPage<Props> = ({ favorites }) => {
  const [wishlist, setWishlist] = useState(favorites);

  useEffect(() => {
    const cookies = Cookies.get("wishlist");
    if (!cookies) {
      if (wishlist.length > 0) {
        const slugs = wishlist.map((item: any) => item.slug);
        Cookies.set("wishlist", JSON.stringify(slugs));
      }
    }
  }, [wishlist]);

  return (
    <ShopLayout title='Wishlist' pageDescription='Wishlist'>
      {favorites.length > 0 ? <WishListCardList products={wishlist} setWishlist={setWishlist} /> : <WishListEmpty />}
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.cookies ?? null;
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/wishlist`,
        permanent: false,
      },
    };
  }

  if (!cookies.wishlist) {
    const favorites = await dbWishList.getFavorites(session.user._id);

    if (!favorites || favorites.length === 0) {
      return {
        props: {
          favorites: null,
        },
      };
    }

    const slugs = await dbProducts.getProductsById(favorites.products);

    return {
      props: {
        favorites: slugs,
      },
    };
  }

  await fetch(`${process.env.HOST_NAME}/api/wishlist`, {
    method: "PUT",
    body: JSON.stringify({
      userId: session.user._id,
      cookies: cookies.wishlist,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const favorites = await getAllDataProductsBySlug(JSON.parse(cookies.wishlist));

  return {
    props: {
      favorites,
    },
  };
};

export default WishList;
