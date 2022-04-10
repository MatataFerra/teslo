import { NextPage } from "next";
import NextLink from "next/link";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Link,
  Chip,
} from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import {
  CreditCardOffOutlined,
  CreditCardOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

const OrderPage: NextPage = () => {
  return (
    <ShopLayout
      title="Resumen de orden 012939048203"
      pageDescription="Resumen de la orden"
    >
      <Typography variant="h1" component="h1">
        Orden N° 012939048203
      </Typography>

      <Chip
        sx={{ my: 2 }}
        label="Pendiente de pago"
        color="error"
        variant="outlined"
        icon={<CreditCardOffOutlined />}
      />
      <Chip
        sx={{ my: 2 }}
        label="Orden ya fue pagada"
        color="success"
        variant="outlined"
        icon={<CreditScoreOutlined />}
      />

      <Grid container mt={2}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar Dirección</Link>
                </NextLink>
              </Box>

              <Typography> Nombre </Typography>
              <Typography> Dirección </Typography>
              <Typography> Ciudad </Typography>
              <Typography> teléfono </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar productos</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <h1>Pagar</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Orden ya fue pagada"
                  color="success"
                  variant="outlined"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
