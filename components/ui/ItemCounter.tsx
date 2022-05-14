import { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { ISize, ISizeStock } from "../../interfaces";

interface Props {
  quantity: number;
  sizeSelected?: ISize;
  sizeStock?: ISizeStock;
  onStock: (stock: number, productQuantity: number) => void;
}

export const ItemCounter: FC<Props> = ({ quantity, onStock, sizeSelected, sizeStock }) => {
  const handleAdd = () => {
    if (quantity >= (sizeStock?.stock ?? 0)) return;
    if (sizeStock) return onStock(sizeStock.sizeRestStock - 1, quantity + 1);
  };

  const handleRemove = (): void => {
    if (quantity === 1) return;
    if (sizeStock?.size) return onStock(sizeStock.sizeRestStock + 1, quantity - 1);
  };

  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={handleRemove}>
        <RemoveCircleOutline />
      </IconButton>

      <Typography variant='body2' sx={{ width: 40, textAlign: "center" }}>
        {quantity}
      </Typography>
      <IconButton onClick={handleAdd} data-testid='item-counter-add'>
        <AddCircleOutline />
      </IconButton>
      <Typography>
        {sizeSelected && quantity >= (sizeStock?.stock ?? 0) && <span>No puede llevar más de {sizeStock!.stock}</span>}
      </Typography>
    </Box>
  );
};
