import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

export const FullScreenLoading: FC = () => {
  return (
    <Box
      display="grid"
      // justifyContent="center"
      // alignItems="center"
      // height="calc(100vh - 200px)"
      height="100vh"
      // flexDirection="column"
      sx={{ placeContent: "center" }}
    >
      <CircularProgress thickness={2} />
    </Box>
  );
};
