import { useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { getSession } from "next-auth/react";
import { Typography, Grid, Card, CardContent, Divider, Box, Chip, CircularProgress } from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { PaymentButtonsStatus } from "../../components/orders";
import { ShopLayout } from "../../components/layouts";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
import tesloApi from "../../api/tesloApi";

interface Props {
  order: IOrder;
}

type OrderResponseBody = {
  id: string;
  status: "COMPLETED" | "SAVED" | "APPROVED" | "VOIDED" | "COMPLETED" | "PAYER_ACTION_REQUIRED";
};

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order;
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== "COMPLETED") {
      return alert("Order failed");
    }

    setIsPaying(true);

    try {
      await tesloApi.post("/orders/pay", {
        orderId: order._id,
        transactionId: details.id,
      });
      await order.orderItems.forEach((p) => {
        tesloApi.put(`/products/${p.slug}`, p.size);
      });
      await tesloApi.put("/orders", { status: "processing", orderId: order._id });

      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert("Error");
    }
  };

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
                {isPaying ? (
                  <Box display='flex' justifyContent='center' className='fadeIn'>
                    <CircularProgress />
                  </Box>
                ) : (
                  <PaymentButtonsStatus isPaid={order.isPaid} onOrderCompleted={onOrderCompleted} total={order.total} />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const id = query.id as string;
  const session: any = await getSession({ req });

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
