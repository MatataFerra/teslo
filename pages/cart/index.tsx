import { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { CartList, OrderSummary } from "../../components/cart";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
} from "@mui/material";

const CartPage: NextPage = () => {
  return (
    <ShopLayout
      title="Carrito - 3"
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
