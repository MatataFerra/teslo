import { ShopLayout } from "../components/layouts";
import { Box, Typography } from "@mui/material";
import { NextPage } from "next";

const Custom404: NextPage = () => {
  return (
    <ShopLayout
      title="Page not fount"
      pageDescription="No hay nada para mostrar"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Typography variant="h1" component="h1" fontSize={70} fontWeight={200}>
          404 |
        </Typography>
        <Typography marginLeft={2}> No se encontró ninguna página </Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;
