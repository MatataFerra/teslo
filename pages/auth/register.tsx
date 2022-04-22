import { useEffect, useState, useContext } from "react";
import NextLink from "next/link";
import { NextPage } from "next";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Chip,
} from "@mui/material";

import { tesloApi } from "../../api";
import { AuthLayout } from "../../components/layouts";
import { userApiResponse } from "../../interfaces";
import { useShowError } from "../../hooks";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { useRouter } from "next/router";
import { AuthContext } from "../../context";

type FormData = { email: string; password: string; name: string };

type DataResponse = {
  token: string | Error;
  user: userApiResponse;
  message: string;
};

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onRegisterForm = async (formData: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(
      formData.name,
      formData.email,
      formData.password
    );

    if (hasError) {
      setShowError(true);
      setErrorMessage(message ?? "An error occured");
      return;
    }

    router.replace("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [showError]);

  return (
    <AuthLayout title='Registro'>
      <form onSubmit={handleSubmit(onRegisterForm)}>
        <Box sx={{ width: 350, p: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='h1' component='h1'>
                Crear Cuenta
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Nombre completo'
                variant='filled'
                fullWidth
                {...register("name", {
                  required: "El nombre es requerido",
                  minLength: {
                    value: 6,
                    message: "El nombre debe tener al menos 6 caracteres",
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Correo'
                variant='filled'
                fullWidth
                {...register("email", {
                  required: "El correo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Contraseña'
                variant='filled'
                fullWidth
                type='password'
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth>
                Crear
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Chip
                label={errorMessage}
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='center'>
              <NextLink href='/auth/login' passHref>
                <Link underline='always'>¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
