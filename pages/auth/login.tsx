import { useState, useEffect, useContext } from "react";
import { NextPage, GetServerSideProps } from "next";
import NextLink from "next/link";
import { Box, Grid, TextField, Typography, Button, Link, Chip, Divider } from "@mui/material";
import { AuthLayout } from "../../components/layouts";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { ErrorOutline } from "@mui/icons-material";
import { useRouter } from "next/router";
import { signIn, getSession, getProviders } from "next-auth/react";

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [login, setLogin] = useState(false);
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((res) => {
      setProviders(res);
    });
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    setLogin(true);

    console.log("logeando");

    await signIn("credentials", { email, password });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(false);
      setLogin(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [showError]);

  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, p: "10px 20px", height: "100%" }}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant='h1' component='h1'>
                Iniciar sesión
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='email'
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
              <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth disabled={login}>
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Chip
                label='Usuario o contraseña no válidos'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='center'>
              <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : "/auth/register"} passHref>
                <Link underline='always'>¿No tienes una cuenta?</Link>
              </NextLink>
            </Grid>

            <Grid item xs={12} display='flex' flexDirection='column' justifyContent='center'>
              <Divider sx={{ mb: 2 }} />
              {Object.values(providers)
                .filter((provider: any) => provider.id !== "credentials")
                .map((provider: any) => {
                  return (
                    <Button
                      key={provider.id}
                      variant='outlined'
                      fullWidth
                      color='primary'
                      sx={{ mb: 1 }}
                      onClick={() => signIn(provider.id)}>
                      {provider.name}
                    </Button>
                  );
                })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });
  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
