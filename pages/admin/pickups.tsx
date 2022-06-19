import { lazy, Suspense, useEffect, useState } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { RoomRounded } from "@mui/icons-material";
import { AdminLayout } from "../../components/layouts";
import { Grid } from "@mui/material";
import { MapLeafletContainer, ModalPickups, SearchPickupPoints } from "../../components/pickup";
import { FullScreenLoading } from "../../components/ui";

// const MapSearch = dynamic(import("../../components/pickup/MapContainer"), {
//   ssr: false,
//   loading: () => <div style={{ textAlign: "center", paddingTop: 20 }}>Cargando...</div>,
// });
const PickupsPage: NextPage = () => {
  const isSSR = typeof window === "undefined";

  return (
    <AdminLayout title={"Sucursales"} subtitle={"Mantenimiento de sucursales"} icon={<RoomRounded />} addpickup>
      {isSSR ? (
        <FullScreenLoading />
      ) : (
        <Suspense fallback={<FullScreenLoading />}>
          <Grid container spacing={4} height='calc(100vh - 160px)'>
            <ModalPickups />
            <Grid item xs={12} lg={4}>
              <SearchPickupPoints />
            </Grid>
            <Grid item xs={12} lg={8} height={{ xs: "50vh", lg: "auto" }}>
              <MapLeafletContainer />
            </Grid>
          </Grid>
        </Suspense>
      )}
    </AdminLayout>
  );
};

export default PickupsPage;
