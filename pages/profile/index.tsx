import { Box, Grid, Stack } from "@mui/material";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { ShopLayout } from "../../components/layouts";
import { AsideMenu } from "../../components/profile";

const ProfilePage: NextPage = () => {
  const { data: session } = useSession();
  const name = session?.user?.name ?? "";
  return (
    <ShopLayout title={`Perfil de usuario de ${name}`} pageDescription={`Perfil de usuario`}>
      <Grid container height='calc(100vh - 160px)'>
        <Grid item xs={2} alignItems='center' height='100%'>
          <AsideMenu />
        </Grid>
        <Grid item xs={10} p={2}>
          <Stack>
            <h1>HOLA</h1>
          </Stack>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default ProfilePage;
