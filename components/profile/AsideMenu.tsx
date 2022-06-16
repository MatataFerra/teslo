import { Avatar, Grid, List, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useContext, useState } from "react";
import { ProfileContext } from "../../context";
import { Item, ProfileItems } from "../../interfaces";
import { AsideItem } from "./AsideItem";

export interface ItemClicked {
  "Datos personales": Item;
  "Mis pedidos": Item;
}

export const AsideMenu: FC = () => {
  const { menuItemSelected, menu } = useContext(ProfileContext);
  const [itemClicked, setItemClicked] = useState<ItemClicked>({
    "Datos personales": {
      isClicked: menu === "Datos personales" ? true : false,
      label: "Datos personales",
    },
    "Mis pedidos": {
      isClicked: menu === "Mis pedidos" ? true : false,
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
      menuItemSelected(item);

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
      <Stack direction='row' alignItems='center' gap={2} pt={4} pb={4}>
        <Avatar sx={{ height: 100, width: 100 }} alt='Remy Sharp' src='https://picsum.photos/150/150' />
        <Typography variant='h6' sx={{ fontWeight: "bold" }}>
          Hola!
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
