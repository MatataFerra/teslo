import { NextPage } from "next";
import { useRouter } from "next/router";
import { ShopLayout } from "../../components/layouts";
import { CartList, OrderSummary } from "../../components/cart";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { FullScreenLoading } from "../../components/ui";

const CartPage: NextPage = () => {
  const { numberOfItems } = useContext(CartContext);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();
  const productText = numberOfItems === 1 ? "producto" : "productos";

  // useEffect(() => {
  //   if (numberOfItems === 0) {
  //     router.push("/cart/empty");
  //   } else {
  //     setLoading(false);
  //   }
  // }, [numberOfItems, router]);

  return (
    <ShopLayout
      title={`Carrito - ${numberOfItems} ${productText} `}
      pageDescription="Carrito de compras de la tienda"
    >
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider />
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" fullWidth className="circular-btn">
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
