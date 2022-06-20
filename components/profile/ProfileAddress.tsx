import { Box, Divider, Typography } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { CartContext } from "../../context";
import { countries } from "../../utils";

export const ProfileAddress: FC = () => {
  const { shippingAddress } = useContext(CartContext);
  const countryMemo = useMemo(() => {
    const country = countries.find((c) => c.code === shippingAddress?.country);
    return country;
  }, [shippingAddress?.country]);
  return (
    <>
      <Typography> Apellido: {shippingAddress?.lastName} </Typography>
      <Typography> Teléfono: {shippingAddress?.phone} </Typography>
      <Box mt={2}>
        <Typography>Dirección de envío</Typography>
        <Divider />
        <Typography> Domicilio: {shippingAddress?.address} </Typography>
        <Typography> Código Postal: {shippingAddress?.zip} </Typography>
        <Typography> Ciudad: {shippingAddress?.city} </Typography>
        <Typography> País: {countryMemo?.name} </Typography>
      </Box>
    </>
  );
};
