import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { ShopLayout } from "../../components/layouts";
import { AsideMenu } from "../../components/profile";

const ProfilePage: NextPage = () => {
  const { data: session } = useSession();
  return (
    <ShopLayout title={`Perfil de usuario de ${session?.user?.name}`} pageDescription={`Perfil de usuario`}>
      <AsideMenu />
    </ShopLayout>
  );
};

export default ProfilePage;
