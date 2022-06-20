import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { FC } from "react";

interface Props {
  label: string;
  isSelected: boolean;
  onClick: (label: string) => void;
}

export const AsideItem: FC<Props> = ({ label, isSelected, onClick }) => {
  return (
    <ListItem
      onClick={() => onClick(label)}
      disableGutters
      disablePadding
      sx={{
        borderLeft: isSelected ? `2px solid #f83b87` : "2px solid transparent",
        transition: "0.3s ease all",
      }}>
      <ListItemButton>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};
