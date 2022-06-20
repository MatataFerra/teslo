import { Box, Typography } from "@mui/material";
import { FC } from "react";

export const WishListEmpty: FC = () => {
  return (
    <>
      <Box display='grid' height='calc(100vh - 180px)' sx={{ placeContent: "center" }}>
        <Typography variant='h1'> Wishlist is Empty </Typography>
      </Box>
    </>
  );
};
