import { Box, Button, FormControl, MenuItem, Popover, Stack, TextField, Typography } from "@mui/material";
import { FC, MouseEvent, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CartContext } from "../../context";
import { FormData } from "../../interfaces";
import { countries, getAddressFromCookies } from "../../utils";

export const UpdateData: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { updateAddress, shippingAddress } = useContext(CartContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const onSubmitForm = async (data: FormData) => {
    updateAddress(data);
  };

  return (
    <>
      <Button aria-describedby={id} color='primary' variant='outlined' onClick={handleClick}>
        Actualizar información de envío
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <Stack p={2} spacing={2}>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Box width='100%' display='flex' gap={2} mb={2}>
              <TextField
                label='Nombre'
                type='text'
                {...register("firstName", {
                  required: "Nombre requerido",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                label='Apellido'
                type='text'
                {...register("lastName", {
                  required: "Apellido requerido",
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
              <TextField
                label='Calle y número'
                type='text'
                {...register("address", {
                  required: "Dirección requerida",
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
              <TextField
                label='Código postal'
                type='text'
                {...register("zip", {
                  required: "Código postal requerido",
                })}
                error={!!errors.zip}
                helperText={errors.zip?.message}
              />
            </Box>
            <Box display='flex' gap={2}>
              <TextField
                label='Teléfono'
                type='text'
                {...register("phone", {
                  required: "Número de contacto requerido",
                  pattern: { value: /[0-9]+/, message: "Número de contacto inválido" },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <TextField
                label='Ciudad'
                type='text'
                {...register("city", {
                  required: "Ciudad requerida",
                })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
              <FormControl fullWidth>
                <TextField
                  select
                  sx={{ backgroundColor: "rgba(0, 0, 0, 0.06)", border: "none" }}
                  label='País de residencia'
                  defaultValue={shippingAddress?.country}
                  {...register("country", {
                    required: "País requerido",
                  })}>
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Box>
            <Box sx={{ mt: 5 }} display='flex'>
              <Button type='submit' color='secondary' className='circular-btn' size='large'>
                Actualizar datos
              </Button>
            </Box>
          </form>
        </Stack>
      </Popover>
    </>
  );
};
