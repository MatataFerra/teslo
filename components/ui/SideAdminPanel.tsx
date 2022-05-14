import { FC, useContext } from "react";
import { useRouter } from "next/router";
import {
  ConfirmationNumberOutlined,
  AdminPanelSettings,
  DashboardOutlined,
  CategoryOutlined,
} from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { UiContext } from "../../context";

export const SideAdminPanel: FC = () => {
  const router = useRouter();
  const { toogleSideMenu } = useContext(UiContext);
  const navigateTo = (route: string) => {
    router.push(`${route}`);
    toogleSideMenu();
  };
  return (
    <List>
      <ListSubheader>Admin Panel</ListSubheader>

      <ListItem button onClick={() => navigateTo(`/admin`)}>
        <ListItemIcon>
          <DashboardOutlined />
        </ListItemIcon>
        <ListItemText primary={"Dashboard"} />
      </ListItem>

      <ListItem button onClick={() => navigateTo(`/admin/products`)}>
        <ListItemIcon>
          <CategoryOutlined />
        </ListItemIcon>
        <ListItemText primary={"Productos"} />
      </ListItem>

      <ListItem button onClick={() => navigateTo(`/admin/orders`)}>
        <ListItemIcon>
          <ConfirmationNumberOutlined />
        </ListItemIcon>
        <ListItemText primary={"Ordenes"} />
      </ListItem>

      <ListItem button onClick={() => navigateTo(`/admin/users`)}>
        <ListItemIcon>
          <AdminPanelSettings />
        </ListItemIcon>
        <ListItemText primary={"Usuarios"} />
      </ListItem>
    </List>
  );
};
