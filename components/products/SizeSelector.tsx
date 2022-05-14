import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { ISize, ISizeStock } from "../../interfaces";

interface Props {
  selectedSize?: ISizeStock;
  sizes: ISize[];
  setSizeSelected: (sizeInput: ISize) => void;
  sizeSoldOut: (ISizeStock | undefined)[];
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, setSizeSelected, sizeSoldOut }) => {
  const handleSizeSelected = (sizeInput: ISize): void => {
    setSizeSelected(sizeInput);
  };

  return (
    <Box>
      <Typography> Talles disponibles </Typography>
      {sizes
        // .filter((size) => sizeSoldOut.find((s) => s?.size === size))
        .map((size) => {
          return (
            <Button
              key={size}
              disabled={sizeSoldOut.find((s) => s?.size === size)?.sizeRestStock === 0}
              size='small'
              color={selectedSize?.size === size ? "primary" : "info"}
              onClick={() => handleSizeSelected(size)}>
              {size}
            </Button>
          );
        })}
    </Box>
  );
};
