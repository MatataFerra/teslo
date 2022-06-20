import { NextPage, GetServerSideProps } from "next";

import { Typography, Grid, Card, CardContent, Divider, Box, Chip } from "@mui/material";
import { CartList, OrderSummary } from "../../../components/cart";
import { AdminLayout } from "../../../components/layouts";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { dbOrders } from "../../../database";
import { IOrder } from "../../../interfaces";

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order;

  return (
    <AdminLayout title='Resumen de orden' subtitle={``}>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const id = query.id as string;

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/admin/orders`,
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
