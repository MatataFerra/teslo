import { Grid } from "@mui/material";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { ShopLayout } from "../../components/layouts";
import { SearchPickupPoints, MapLeafletContainer } from "../../components/pickup";

const PickupPoints: NextPage = () => {
  return (
    <>
      <ShopLayout title='Sucursales sercanas' pageDescription='Encuentre sucursales cercanas a su domicilio'>
        <Grid container spacing={4} height='calc(100vh - 160px)'>
          <Grid item xs={12} lg={4}>
            <SearchPickupPoints />
          </Grid>
          <Grid item xs={12} lg={8} height={{ xs: "50vh", lg: "auto" }}>
            <MapLeafletContainer />
          </Grid>
        </Grid>
      </ShopLayout>
    </>
  );
};

export default PickupPoints;
