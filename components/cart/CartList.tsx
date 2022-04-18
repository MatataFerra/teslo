import { FC, useContext } from "react";
import NextLink from "next/link";
import {
  Grid,
  Link,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";
import { ItemCounter } from "../ui";
import { Button } from "@mui/material";
import { CartContext } from "../../context";

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateCartQuantity } = useContext(CartContext);

  const handleUpdateCartQuantity = (
    product: any,
    quantity: number,
    stock: number
  ) => {
    product.quantity = quantity;
    product.restStock = stock;
    updateCartQuantity(product);
  };

  return (
    <>
      {cart.map((product) => (
        <Grid
          container
          spacing={2}
          sx={{ mb: 1 }}
          key={product.slug + product.size}
        >
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1"> {product.title} </Typography>
              <Typography variant="body2">
                Talla: <strong> {product.size} </strong>
              </Typography>
              {editable ? (
                <ItemCounter
                  quantity={product.quantity}
                  inStock={product.productStock}
                  restStock={product.restStock}
                  onStock={(stock, productQuantity) =>
                    handleUpdateCartQuantity(product, productQuantity, stock)
                  }
                />
              ) : (
                <Typography variant="body2">
                  Cantidad:
                  <strong>
                    {product.quantity}
                    {product.quantity > 1 ? "productos" : "producto"}
                  </strong>
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1"> {`$${product.price}`} </Typography>

            {editable && (
              <Button variant="text" color="secondary">
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
