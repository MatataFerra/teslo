import { FC, useContext } from "react";

import { SideMenu } from "../ui";
import { Children } from "../../interfaces";
import { AdminNavbar } from "../admin";
import { Box, Button, Typography } from "@mui/material";
import { PickupContext } from "../../context/pickup/PickupContext";

interface Props extends Children {
  title: string;
  subtitle: string;
  icon?: JSX.Element;
  back?: boolean;
  addpickup?: boolean;
}

export const AdminLayout: FC<Props> = ({ title, subtitle, icon, children, back = false, addpickup = false }) => {
  const { onPickupModal } = useContext(PickupContext);

  return (
    <>
      <nav>
        <AdminNavbar back={back} />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}>
        <Box display='flex' flexDirection='column'>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='h1' component='h1'>
              {icon} {title}
            </Typography>
            {addpickup && (
              <Button color='primary' onClick={() => onPickupModal("[Pickup] - Open modal")}>
                Agregar Sucursal
              </Button>
            )}
          </Box>

          <Typography variant='h2' mb={1}>
            {subtitle}
          </Typography>
        </Box>
        <Box className='fadeIn'>{children}</Box>
      </main>
    </>
  );
};
