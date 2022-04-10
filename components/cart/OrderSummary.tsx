import { FC } from "react";
import { Grid, Typography, Divider } from "@mui/material";

export const OrderSummary: FC = () => {
  return (
    <Grid container mt={2}>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3 items</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography> $103.55 </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography> Impuestos (15%) </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography> $133.55 </Typography>
      </Grid>
      <Grid xs={12} my={2}>
        <Divider />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1"> $103.55 </Typography>
      </Grid>
    </Grid>
  );
};
