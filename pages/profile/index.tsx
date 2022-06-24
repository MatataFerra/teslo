import { NextPage, GetServerSideProps } from "next";
import { Grid } from "@mui/material";
import { getSession } from "next-auth/react";
import { ShopLayout } from "../../components/layouts";
import { AsideMenu, MyOrders, PersonalData } from "../../components/profile";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
import { useContext } from "react";
import { ProfileContext } from "../../context";

interface Props {
  orders: IOrder[];
  name: string;
  email: string;
}

const ProfilePage: NextPage<Props> = ({ orders, name, email }) => {
  const { menu } = useContext(ProfileContext);

  const ProfileMenu = {
    "Datos personales": <PersonalData name={name} email={email} />,
    "Mis pedidos": <MyOrders orders={orders} />,
  };

  return (
    <ShopLayout title={`Perfil de usuario de ${name}`} pageDescription={`Perfil de usuario`}>
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

  const orders = await dbOrders.getLastOrderByUserId(session?.user?._id);

  return {
    props: {
      orders,
      name: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
    },
  };
};

export default ProfilePage;
