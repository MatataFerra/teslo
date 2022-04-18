import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { ISize } from "../../interfaces";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
  setSizeSelected: (size: ISize) => void;
  sizeSoldOut: (ISize | undefined)[];
}

export const SizeSelector: FC<Props> = ({
  selectedSize,
  sizes,
  setSizeSelected,
  sizeSoldOut,
}) => {
  const handleSizeSelected = (size: ISize) => {
    setSizeSelected(size);
  };

  return (
    <Box>
      <Typography> Talles disponibles </Typography>
      {sizes
        .filter((size) => !sizeSoldOut?.includes(size))
        .map((size) => {
          return (
            <Button
              key={size}
              size="small"
              color={selectedSize === size ? "primary" : "info"}
              onClick={() => handleSizeSelected(size)}
            >
              {size}
            </Button>
          );
        })}
    </Box>
  );
};
