import { Grid } from "@mui/material";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ShopLayout } from "../../components/layouts";
import { SearchPickupPoints } from "../../components/pickup";

const PickupPoints: NextPage = () => {
  const MemoMap = useMemo(
    () =>
      dynamic(() => import("../../components/pickup/MapContainer") as any, {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <ShopLayout title='Sucursales sercanas' pageDescription='Encuentre sucursales cercanas a su domicilio'>
        <Grid container spacing={3} height='calc(100vh - 160px)'>
          <Grid item xs={4}>
            <SearchPickupPoints />
          </Grid>
          <Grid item xs={8}>
            <MemoMap />
          </Grid>
        </Grid>
      </ShopLayout>
    </>
  );
};

export default PickupPoints;
