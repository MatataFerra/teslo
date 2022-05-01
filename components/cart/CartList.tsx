import { FC, useContext } from "react";
import NextLink from "next/link";
import { Grid, Link, CardActionArea, CardMedia, Box, Typography } from "@mui/material";
import { ItemCounter } from "../ui";
import { Button } from "@mui/material";
import { CartContext } from "../../context";
import { IOrderItems } from "../../interfaces";

interface Props {
  editable?: boolean;
  products?: IOrderItems[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
  const { cart, updateCartQuantity, removeItemFromCart } = useContext(CartContext);

  const handleUpdateCartQuantity = (product: any, quantity: number, stock: number) => {
    product.quantity = quantity;
    product.restStock = stock;
    updateCartQuantity(product);
  };

  const prodcutsToShow = products ?? cart;

  return (
    <>
      {prodcutsToShow.map((product) => (
        <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug + product.size}>
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia image={`/products/${product.image}`} component='img' sx={{ borderRadius: "5px" }} />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={6}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'> {product.title} </Typography>
              <Typography variant='body2'>
                Talla: <strong> {product.size} </strong>
              </Typography>
              {editable ? (
                <ItemCounter
                  quantity={product.quantity}
                  inStock={product.productStock}
                  restStock={product.restStock}
                  onStock={(stock, productQuantity) => handleUpdateCartQuantity(product, productQuantity, stock)}
                />
              ) : (
                <Box display='flex' gap={1} alignItems='center'>
                  <Typography variant='body2'>Cantidad:</Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                    {product.quantity} {product.quantity > 1 ? "productos" : "producto"}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
            <Typography variant='subtitle1'> {`$${product.price}`} </Typography>

            {editable && (
              <Button variant='text' color='secondary' onClick={() => removeItemFromCart(product)}>
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
