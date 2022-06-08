import { FC, useMemo } from "react";
import { Grid } from "@mui/material";
import { WishListCard } from "./WishListCard";
import { IProductSize } from "../../interfaces";
import { parseImagesOnProducts } from "../../utils";

interface Props {
  products: IProductSize[];
}

export const WishListCardList: FC<Props> = ({ products }) => {
  const memoProducts = useMemo(() => parseImagesOnProducts(products), [products]);

  return (
    <Grid container spacing={4} p={{ md: 8, xs: 0, sm: 2 }}>
      {memoProducts.map((product: IProductSize) => (
        <WishListCard key={product.slug} product={product} isImageLoaded={!!product.title} skeleton={!!product.title} />
      ))}
    </Grid>
  );
};
