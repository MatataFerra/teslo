import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { ISize, ISizeStock } from "../../interfaces";

interface Props {
  selectedSize?: ISizeStock;
  sizes: ISize[];
  setSizeSelected: (sizeInput: ISize) => void;
  sizeSoldOut: (ISizeStock | undefined)[];
  sizeMemorized: ISizeStock[];
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, setSizeSelected, sizeSoldOut, sizeMemorized }) => {
  const handleSizeSelected = (sizeInput: ISize): void => {
    setSizeSelected(sizeInput);
  };

  return (
    <Box>
      <Typography mb={2}> Talles disponibles </Typography>
      {sizes
        // .filter((size) => sizeSoldOut.find((s) => s?.size === size))
        .map((size) => {
          return (
            <Button
              key={size}
              disabled={sizeMemorized.find((s) => s?.size === size)?.stock === 0}
              size='small'
              color={selectedSize?.size === size ? "primary" : "info"}
              onClick={() => handleSizeSelected(size)}
              sx={{ mr: 1 }}>
              {size}
            </Button>
          );
        })}
    </Box>
  );
};
