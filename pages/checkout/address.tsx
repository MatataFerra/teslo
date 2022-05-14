import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Box, Button } from "@mui/material";
import { countries } from "../../utils";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { CartContext } from "../../context";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  const cookies: FormData = {
    firstName: Cookies.get("firstName") ?? "",
    lastName: Cookies.get("lastName") ?? "",
    address: Cookies.get("address") ?? "",
    address2: Cookies.get("address2") ?? "",
    zip: Cookies.get("zip") ?? "",
    city: Cookies.get("city") ?? "",
    country: Cookies.get("country") ?? "",
    phone: Cookies.get("phone") ?? "",
  };

  return cookies;
};

const AddressPage: NextPage = () => {
  const router = useRouter();
  const { updateAddress } = useContext(CartContext);
  const [country, setCountry] = useState("");

  useEffect(() => {
    const cookies = Cookies.get("country") ?? "ARG";
    setCountry(cookies);
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  const onSubmitForm = async (data: FormData) => {
    updateAddress(data);
    router.push("/checkout/summary");
  };

  return (
    <ShopLayout title='Dirección' pageDescription='Confirmar dirección del destino'>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Typography variant='h1' component='h1'>
          Dirección
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Nombre'
              variant='filled'
              fullWidth
              {...register("firstName", {
                required: "Nombre requerido",
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Apellido'
              variant='filled'
              fullWidth
              {...register("lastName", {
                required: "Apellido requerido",
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Dirección'
              variant='filled'
              fullWidth
              {...register("address", {
                required: "Dirección requerida",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Dirección 2 (Opcional)' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Código Postal'
              variant='filled'
              fullWidth
              {...register("zip", {
                required: "Código postal requerido",
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Ciudad'
              variant='filled'
              fullWidth
              {...register("city", {
                required: "Ciudad requerida",
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Select
                variant='filled'
                // value={countries[2].code}
                defaultValue={country}
                {...register("country", {
                  required: "El país requerida",
                })}
                error={!!errors.country}
                placeholder='Selecciona un país'>
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Teléfono'
              variant='filled'
              fullWidth
              {...register("phone", {
                required: "Número de contacto requerido",
                pattern: { value: /[0-9]+/, message: "Número de contacto inválido" },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display='flex'>
          <Button type='submit' color='secondary' className='circular-btn' size='large'>
            Revisar Pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = "" } = req.cookies;

//   validations.isValidTokenForSSR(token, "checkout/address");

//   return {
//     props: {},
//   };
// };

export default AddressPage;
