import { useState, useEffect } from "react";
import { NextPage } from "next";
import NextLink from "next/link";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Link,
  Chip,
} from "@mui/material";
import { AuthLayout } from "../../components/layouts";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { tesloApi } from "../../api";
import { userApiResponse } from "../../interfaces";
import { ErrorOutline } from "@mui/icons-material";

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    try {
      const { data } = await tesloApi.post<{
        token: string;
        user: userApiResponse;
      }>("/user/login", {
        email,
        password,
      });

      const { token, user } = data;
    } catch (error) {
      console.log("Error en las credenciales");
      setShowError(true);
    }

    // TODO: navegar a la pantalla que el usuario estaba antes de hacer login
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
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, p: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h1" component="h1">
                Iniciar sesión
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
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
                label="Correo"
                variant="filled"
                fullWidth
                type="password"
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
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Chip
                label="Usuario o contraseña no válidos"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <NextLink href="/auth/register" passHref>
                <Link underline="always">¿No tienes una cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
