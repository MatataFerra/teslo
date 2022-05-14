import { FC } from "react";
import { Grid, Typography, Divider } from "@mui/material";
import { currency } from "../../utils";

interface Props {
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

export const OrderSummary: FC<Props> = ({ numberOfItems, subTotal, tax, total }) => {
  return (
    <Grid container mt={2}>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? "productos" : "producto"}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography> {currency.format(subTotal)} </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography> {currency.format(tax)} </Typography>
      </Grid>
      <Grid item xs={12} my={2}>
        <Divider />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant='subtitle1'> {currency.format(total)} </Typography>
      </Grid>
    </Grid>
  );
};
