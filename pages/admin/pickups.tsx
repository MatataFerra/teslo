import { NextPage } from "next";
import { RoomRounded } from "@mui/icons-material";
import { AdminLayout } from "../../components/layouts";
import { Grid } from "@mui/material";
import { MapLeafletContainer, ModalPickups, SearchPickupPoints } from "../../components/pickup";

const PickupsPage: NextPage = () => {
  return (
    <AdminLayout title={"Sucursales"} subtitle={"Mantenimiento de sucursales"} icon={<RoomRounded />} addpickup>
      <Grid container spacing={4} height='calc(100vh - 160px)'>
        <ModalPickups />
        <Grid item xs={12} lg={4}>
          <SearchPickupPoints />
        </Grid>
        <Grid item xs={12} lg={8} height={{ xs: "50vh", lg: "auto" }}>
          <MapLeafletContainer />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default PickupsPage;
