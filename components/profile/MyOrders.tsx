import { Box, Divider, Grid, Link, Typography } from "@mui/material";
import { FC } from "react";
import { IOrder } from "../../interfaces/order";
import NextLink from "next/link";
import { OrderCard, ProfileTitle } from ".";

interface Props {
  orders: IOrder[];
}

export const MyOrders: FC<Props> = ({ orders }) => {
  return (
    <>
      <Grid item xs={12} className='fadeIn'>
        <ProfileTitle
          title='Últimos 3 pedidos pedientes'
          href='/orders/history'
          linkTitle='Ver historial de pedidos'
          link
        />
      </Grid>
      <Divider />
      <Grid container mt={2}>
        {orders?.length > 0 ? (
          orders?.map((order, i) => {
            return <OrderCard key={i} order={order} />;
          })
        ) : (
          <>
            <Typography variant='h6'>No hay ordenes</Typography>
          </>
        )}
      </Grid>
    </>
  );
};
