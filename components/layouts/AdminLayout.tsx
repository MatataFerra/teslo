import { FC } from "react";

import { SideMenu } from "../ui";
import { Children } from "../../interfaces";
import { AdminNavbar } from "../admin";
import { Box, Typography } from "@mui/material";

interface Props extends Children {
  title: string;
  subtitle: string;
  icon?: JSX.Element;
}

export const AdminLayout: FC<Props> = ({ title, subtitle, icon, children }) => {
  return (
    <>
      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}>
        <Box display='flex' flexDirection='column'>
          <Typography variant='h1' component='h1'>
            {icon} {title}
          </Typography>

          <Typography variant='h2' mb={1}>
            {subtitle}
          </Typography>
        </Box>
        <Box className='fadeIn'>{children}</Box>
      </main>
    </>
  );
};
