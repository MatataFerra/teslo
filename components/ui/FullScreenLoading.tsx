import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

export const FullScreenLoading: FC = () => {
  return (
    <Box display='grid' height='100vh' sx={{ placeContent: "center" }}>
      <CircularProgress thickness={2} />
    </Box>
  );
};
