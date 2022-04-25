import { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

interface Props {
  quantity: number;
  inStock: number;
  restStock: number;
  onStock: (stock: number, productQuantity: number) => void;
}

export const ItemCounter: FC<Props> = ({ quantity, inStock, restStock, onStock }) => {
  const handleAdd = () => {
    if (quantity >= inStock) return;
    onStock(restStock - 1, quantity + 1);
  };

  const handleRemove = (): void => {
    if (quantity === 1) return;
    onStock(restStock + 1, quantity - 1);
  };

  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={handleRemove}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography variant='body2' sx={{ width: 40, textAlign: "center" }}>
        {quantity}
      </Typography>

      <IconButton onClick={handleAdd}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
