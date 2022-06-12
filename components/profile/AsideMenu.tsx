import { Avatar, Grid, List, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import { Item, ProfileItems } from "../../interfaces";
import { AsideItem } from "./AsideItem";

export interface ItemClicked {
  "Datos personales": Item;
  "Mis pedidos": Item;
}

export const AsideMenu: FC = () => {
  const [itemClicked, setItemClicked] = useState<ItemClicked>({
    "Datos personales": {
      isClicked: false,
      label: "Datos personales",
    },
    "Mis pedidos": {
      isClicked: false,
      label: "Mis pedidos",
    },
  });

  const handleItemClick = (item: ProfileItems) => {
    Object.keys(itemClicked).forEach((key, i) => {
      const keyParse = key as ProfileItems;
      if (keyParse !== item) {
        return setItemClicked((prevState) => ({
          ...prevState,
          [keyParse]: {
            ...prevState[keyParse],
            isClicked: false,
          },
        }));
      }

      return setItemClicked((prevState) => ({
        ...prevState,
        [keyParse]: {
          ...prevState[keyParse],
          isClicked: true,
        },
      }));
    });
  };

  return (
    <>
      <Stack direction='row' spacing={2} alignItems='center' p={2}>
        <Avatar
          sx={{ height: 100, width: 100, margin: "0 auto" }}
          alt='Remy Sharp'
          src='https://picsum.photos/150/150'
        />
        <Typography variant='h6' sx={{ fontWeight: "bold", marginTop: "1rem" }}>
          Nombre
        </Typography>
      </Stack>
      <Stack>
        <Box sx={{ width: "100%", height: "100%" }}>
          <List>
            {Object.keys(itemClicked).map((key, i) => {
              const keyParse = key as ProfileItems;
              return (
                <AsideItem
                  key={i}
                  label={keyParse}
                  isSelected={itemClicked[keyParse].isClicked}
                  onClick={() => handleItemClick(keyParse)}
                />
              );
            })}
          </List>
        </Box>
      </Stack>
    </>
  );
};
