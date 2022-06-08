import Cookies from "js-cookie";
import { NextPage, GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { tesloApi } from "../../api";
import { ShopLayout } from "../../components/layouts";
import { WishListCardList } from "../../components/wishlist";
import { dbProducts, dbWishList } from "../../database";
import { getAllDataProductsBySlug } from "../../database/dbProducts";
import { IProductSize } from "../../interfaces";

interface WishList {
  products: IProductSize[];
}

interface Props {
  favorites: IProductSize[];
}

const WishList: NextPage<Props> = ({ favorites }) => {
  useEffect(() => {
    const cookies = Cookies.get("wishlist");
    if (!cookies) {
      const slugs = favorites.map((item: any) => item.slug);
      Cookies.set("wishlist", JSON.stringify(slugs));
    }
  }, [favorites]);

  return (
    <ShopLayout title='Wishlist' pageDescription='Wishlist'>
      <WishListCardList products={favorites} />
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
