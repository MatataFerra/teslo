import { NextPage } from "next";
import NextLink from "next/link";
import { Box, Grid, TextField, Typography, Button, Link } from "@mui/material";
import { AuthLayout } from "../../components/layouts";

const LoginPage: NextPage = () => {
  return (
    <AuthLayout title="Login">
      <Box sx={{ width: 350, p: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h1" component="h1">
              Iniciar sesión
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Correo" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Correo"
              variant="filled"
              fullWidth
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Ingresar
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <NextLink href="/auth/register" passHref>
              <Link underline="always">¿No tienes una cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
