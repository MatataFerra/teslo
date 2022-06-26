import NextLink from "next/link";
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip } from "@mui/material";
import { NextPage } from "next";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { useContext, useMemo, useEffect, useState } from "react";
import { CartContext } from "../../context";
import { countries } from "../../utils";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { FullScreenLoading, ModalTransition } from "../../components/ui";

const SummaryPage: NextPage = () => {
  const router = useRouter();
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formIsLoaded, setFormIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { shippingAddress, numberOfItems, createOrder, subTotal, tax, total } = useContext(CartContext);
  const memorizeCountry = useMemo(
    () => countries.find((c) => c.code === shippingAddress?.country),
    [shippingAddress?.country]
  );

  useEffect(() => {
    const noFormData = async () => {
      if (!Cookie.get("firstName")) {
        return router.push("/checkout/address");
      }

      return setFormIsLoaded(true);
    };
    noFormData();
  }, [router]);

  const onCreateOrder = async () => {
    setIsPosting(true);
    changeModalState(true);
    const { hasError, message } = await createOrder();

    if (hasError) {
      setIsPosting(false);
      changeModalState(false);
      setErrorMessage(message);
      return router.replace("/auth/login?p=/checkout/summary");
    }

    !hasError && router.replace(`/orders/${message}`);
  };

  if (!formIsLoaded || !shippingAddress) {
    return <FullScreenLoading />;
  }

  const changeModalState = (state: boolean) => {
    setIsModalOpen(state);
  };

  const { address, city, firstName, lastName, phone, zip, address2 = "" } = shippingAddress;

  return (
    <ShopLayout title='Resumen de orden' pageDescription='Resumen de la orden'>
      <Typography variant='h1' component='h1'>
        Resumen de la orden
      </Typography>

      <ModalTransition isOpen={isModalOpen} message='Crando Orden' onClose={() => changeModalState(isModalOpen)} />

      <Grid container mt={2}>
        <Grid item xs={12} sm={7}>
          <CartList isProcessing={isPosting} />
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
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address}
                {address2 ? `,${address2}` : ""}
              </Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              <Typography> {memorizeCountry?.name ?? "País no encontrado"} </Typography>
              <Typography> {phone} </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Editar productos</Link>
                </NextLink>
              </Box>

              <OrderSummary numberOfItems={numberOfItems} subTotal={subTotal} tax={tax} total={total} />

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                <Button
                  disabled={isPosting}
                  onClick={onCreateOrder}
                  color='secondary'
                  fullWidth
                  className='circular-btn'>
                  Confirmar orden
                </Button>
                <Chip
                  className='fadeIn'
                  color='error'
                  label={errorMessage}
                  sx={{ display: errorMessage ? "flex" : "none", mt: 4 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
