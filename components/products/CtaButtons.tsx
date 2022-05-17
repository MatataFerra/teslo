import { Box, Button, Grid } from "@mui/material";
import { FC } from "react";
import { ICartProduct } from "../../interfaces";

interface Props {
  product: ICartProduct;
  handleAddProductToCart: () => Promise<void>;
  handleBuyNow: () => Promise<void>;
}

export const CtaButtons: FC<Props> = ({ product, handleAddProductToCart, handleBuyNow }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            color='secondary'
            className='circular-btn'
            sx={{ width: "100%" }}
            disabled={product.quantity === 0 || product.size === undefined}
            onClick={handleAddProductToCart}>
            {product.size?.size ? "Agregar al carrito" : "Seleccione un tamaño"}
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
