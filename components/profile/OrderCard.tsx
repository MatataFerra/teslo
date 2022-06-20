import { Box, Button, Card, CardContent, CardHeader, CardMedia, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo } from "react";
import { IOrder } from "../../interfaces";
import { getFormatDate } from "../../utils/datefn";

interface Props {
  order: IOrder;
}

const status = {
  pending: "Pendiente",
  processing: "En proceso",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
  error: "Error",
};

export const OrderCard: FC<Props> = ({ order }) => {
  const router = useRouter();
  const orderImageMemo = useMemo(() => order.orderItems.map((o) => o.image), [order.orderItems]);
  const orederLen = order.orderItems.length;

  const goToPayOrder = (id: string) => {
    router.push(`/orders/${id}`);
  };
  return (
    <Box>
      <Grid item xs={12}>
        <Card sx={{ p: 1 }}>
          <CardHeader title={`Pedido ${order._id?.slice(0, 7).concat("...")} `} subheader={`Orden pendiente`} />
          <Divider />
          <CardMedia
            sx={{ height: "170px" }}
            image={orederLen === 1 ? orderImageMemo.toString() : orderImageMemo[0].toString()}
          />
          <CardContent>
            <Grid item xs={12}>
              <Typography variant='body1'>
                <strong>Dirección:</strong> {order.shippingAddress.address}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1'>
                <strong>Estado:</strong> {status[order.status ?? "error"]}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1'>
                <strong>Orden creada el:</strong> {getFormatDate(order.createdAt!)}
              </Typography>
            </Grid>
            <Grid item xs={12} mt={2} mb={2}>
              <Button variant='contained' color='primary' fullWidth onClick={() => goToPayOrder(order._id!)}>
                Ver detalles
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};
