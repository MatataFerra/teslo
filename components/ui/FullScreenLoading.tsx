import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

export const FullScreenLoading: FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      flexDirection="column"
    >
      <CircularProgress thickness={2} />
    </Box>
  );
};
