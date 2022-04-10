import { Box, Grid, Typography, TextField, Button, Link } from "@mui/material";
import { NextPage } from "next";

import NextLink from "next/link";
import { AuthLayout } from "../../components/layouts";

const RegisterPage: NextPage = () => {
  return (
    <AuthLayout title="Login">
      <Box sx={{ width: 350, p: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h1" component="h1">
              Crear Cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Nombre completo" variant="filled" fullWidth />
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
              Crear
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <NextLink href="/auth/login" passHref>
              <Link underline="always">¿Ya tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
