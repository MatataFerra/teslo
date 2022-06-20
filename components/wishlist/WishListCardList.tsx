import { FC, SetStateAction, useMemo } from "react";
import { Grid } from "@mui/material";
import { WishListCard } from "./WishListCard";
import { IProductSize } from "../../interfaces";
import { parseImagesOnProducts } from "../../utils";

interface Props {
  products: IProductSize[];
  setWishlist: (value: SetStateAction<IProductSize[]>) => void;
}

export const WishListCardList: FC<Props> = ({ products, setWishlist }) => {
  const memoProducts = useMemo(() => parseImagesOnProducts(products), [products]);

  return (
    <Grid container spacing={4} p={{ md: 8, xs: 0, sm: 2 }}>
      {memoProducts.map((product: IProductSize) => (
        <WishListCard
          key={product.slug}
          product={product}
          isImageLoaded={!!product.title}
          skeleton={!!product.title}
          setWishlist={setWishlist}
        />
      ))}
    </Grid>
  );
};
