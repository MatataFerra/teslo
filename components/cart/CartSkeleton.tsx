import { Skeleton, Grid } from "@mui/material";
import React from "react";

export const CartSkeleton = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ mb: 1 }}>
        <Grid item xs={3}>
          <Skeleton variant='rectangular' width={170} height={175} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant='text' width={150} />
          <Skeleton variant='text' width={75} />
          <Skeleton variant='rectangular' width={90} height={25} sx={{ mt: 2 }} />
        </Grid>
        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
          <Skeleton variant='text' width={40} />
        </Grid>
      </Grid>
    </>
  );
};
