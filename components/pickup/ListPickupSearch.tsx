import { Box, List } from "@mui/material";
import { FC } from "react";
import { PickupSearchItem } from ".";
import { IPickupPoint } from "../../interfaces";

interface Props {
  pickupPoints: IPickupPoint[];
}

export const ListPickupSearch: FC<Props> = ({ pickupPoints }) => {
  return (
    <Box height='55vh' width='75%' sx={{ overflowY: "scroll", pl: 1, pr: 1 }}>
      <List className='fadeIn' sx={{ border: "1px solid #000" }} disablePadding>
        {pickupPoints.map((pickupPoint, index) => {
          return <PickupSearchItem key={index} {...pickupPoint} />;
        })}
      </List>
    </Box>
  );
};
