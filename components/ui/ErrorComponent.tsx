import { ErrorOutlined } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";

export const ErrorComponent: FC = () => {
  return (
    <Box display='grid' height='100vh' sx={{ placeContent: "center" }}>
      <Box border='2px dashed #000' borderRadius={2} padding={2}>
        <Box display='flex' alignItems='center' gap={2}>
          <Typography variant='h1' sx={{ textAlign: "center" }}>
            Ha ocurrido un error
          </Typography>
          <ErrorOutlined color='error' />
        </Box>

        <Box display='flex' justifyContent='center' alignItems='center' mt={2}>
          <Typography variant='subtitle2' sx={{ textAlign: "center" }}>
            Comúniquese con el administrador
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
