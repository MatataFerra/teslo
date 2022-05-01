import { NextPage, GetServerSideProps } from "next";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip } from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order;

  return (
    <ShopLayout title='Resumen de orden' pageDescription='Resumen de la orden'>
      <Typography variant='h1' component='h1'>
        Orden N° {order._id}
      </Typography>

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label='Orden ya fue pagada'
          color='success'
          variant='outlined'
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label='Pendiente de pago'
          color='error'
          variant='outlined'
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container mt={2} className='fadeIn'>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? "productos" : "producto"})
              </Typography>
              <Divider />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
              </Box>

              <Typography>
                {shippingAddress.firstName}, {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address} ,{shippingAddress.address2 ? shippingAddress.address2 : ""}
              </Typography>
              <Typography> {shippingAddress.city} </Typography>
              <Typography> {shippingAddress.phone} </Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary
                numberOfItems={order.numberOfItems}
                subTotal={order.subTotal}
                tax={order.tax}
                total={order.total}
              />

              <Box sx={{ mt: 3 }}>
                {order.isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label='Orden ya fue pagada'
                    color='success'
                    variant='outlined'
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: "1.99",
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order!.capture().then((details) => {
                        const name = details.payer.name?.given_name;
                        alert(`Transaction completed by ${name}`);
                      });
                    }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const id = query.id as string;
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
