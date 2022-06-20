import { NextPage, GetServerSideProps } from "next";
import { Grid } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { ShopLayout } from "../../components/layouts";
import { AsideMenu, MyOrders, PersonalData } from "../../components/profile";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
import { useContext } from "react";
import { ProfileContext } from "../../context";

interface Props {
  orders: IOrder[];
}

const ProfilePage: NextPage<Props> = ({ orders }) => {
  const { data: session } = useSession();
  const { menu } = useContext(ProfileContext);

  const ProfileMenu = {
    "Datos personales": <PersonalData name={session?.user?.name ?? ""} email={session?.user?.email ?? ""} />,
    "Mis pedidos": <MyOrders orders={orders} />,
  };

  return (
    <ShopLayout title={`Perfil de usuario de ${session?.user?.name ?? ""}`} pageDescription={`Perfil de usuario`}>
      <Grid container columnGap={8}>
        <Grid item xs={12} md={2} alignItems='center' height='100%'>
          <AsideMenu />
        </Grid>
        <Grid item xs={12} md={9} p={2}>
          {ProfileMenu[menu]}
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/profile",
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getLastOrderByUserId(session?.user?._id);

  return {
    props: {
      orders,
    },
  };
};

export default ProfilePage;
