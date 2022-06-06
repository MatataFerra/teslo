import { Box, Button, Grid } from "@mui/material";
import { FC } from "react";
import { ICartProduct } from "../../interfaces";

interface Props {
  product: ICartProduct;
  disableAddToCart: boolean;
  handleAddProductToCart: () => Promise<void>;
  handleBuyNow: () => Promise<void>;
}

export const CtaButtons: FC<Props> = ({ product, handleAddProductToCart, handleBuyNow, disableAddToCart }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            color='secondary'
            className='circular-btn'
            sx={{ width: "100%" }}
            disabled={product.quantity === 0 || product.size === undefined || disableAddToCart}
            onClick={handleAddProductToCart}>
            Agregar al carrito
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button
            color='primary'
            className='circular-btn'
            sx={{ width: "100%" }}
            disabled={product.quantity === 0 || product.size === undefined}
            onClick={handleBuyNow}>
            Comprar ahora
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
