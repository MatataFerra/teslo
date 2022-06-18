import { NextPage } from "next";
import { useMemo } from "react";
import { RoomRounded } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { AdminLayout } from "../../components/layouts";
import { Button, Grid } from "@mui/material";
import { ModalPickups, SearchPickupPoints } from "../../components/pickup";

const PickupsPage: NextPage = () => {
  const MemoMap = useMemo(
    () =>
      dynamic(() => import("../../components/pickup/MapContainer") as any, {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <AdminLayout title={"Sucursales"} subtitle={"Mantenimiento de sucursales"} icon={<RoomRounded />} addpickup>
      <ModalPickups />
      <Grid container spacing={4} height='calc(100vh - 160px)'>
        <Grid item xs={12} lg={4}>
          <SearchPickupPoints />
        </Grid>
        <Grid item xs={12} lg={8} height={{ xs: "50vh", lg: "auto" }}>
          <MemoMap />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default PickupsPage;
