import { RoomOutlined } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { FC, useContext } from "react";
import { PickupContext } from "../../context";

interface Props {
  name: string;
  latitude: string;
  longitude: string;
}

export const PickupSearchItem: FC<Props> = ({ name = "Nombre sucursal", latitude, longitude }) => {
  const { setPickup } = useContext(PickupContext);

  const onSelectedPickupPoint = () => {
    setPickup({
      latitude,
      longitude,
      name,
    });
  };

  return (
    <ListItemButton onClick={onSelectedPickupPoint}>
      <ListItemIcon>
        <RoomOutlined color='primary' />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItemButton>
  );
};
