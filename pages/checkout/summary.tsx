import NextLink from "next/link";
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link } from "@mui/material";
import { NextPage } from "next";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { useContext, useMemo, useEffect } from "react";
import { CartContext } from "../../context";
import { countries } from "../../utils";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

const SummaryPage: NextPage = () => {
  const router = useRouter();
  const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);
  const memorizeCountry = useMemo(
    () => countries.find((c) => c.code === shippingAddress?.country),
    [shippingAddress?.country]
  );

  useEffect(() => {
    if (!Cookie.get("firstName")) {
      return router.back();
    }
  }, [router]);

  const onCreateOrder = () => {
    createOrder();
  };

  if (!shippingAddress) {
    return <></>;
  }

  const { address, city, country, firstName, lastName, phone, zip, address2 = "" } = shippingAddress;

  return (
    <ShopLayout title='Resumen de orden' pageDescription='Resumen de la orden'>
      <Typography variant='h1' component='h1'>
        Resumen de la orden
      </Typography>

      <Grid container mt={2}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Resumen ( {numberOfItems} {numberOfItems === 1 ? "producto" : "productos"})
              </Typography>
              <Divider />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>Editar Dirección</Link>
                </NextLink>
              </Box>

              <Typography>
                {" "}
                {firstName} {lastName}{" "}
              </Typography>
              <Typography>
                {" "}
                {address}
                {address2 ? `,${address2}` : ""}{" "}
              </Typography>
              <Typography>
                {" "}
                {city}, {zip}{" "}
              </Typography>
              <Typography> {memorizeCountry?.name ?? "País no encontrado"} </Typography>
              <Typography> {phone} </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Editar productos</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button onClick={onCreateOrder} color='secondary' fullWidth className='circular-btn'>
                  Confirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
