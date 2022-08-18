
import { Box, Button } from '@mui/material';
import React, { FC, useState } from "react";
import { ISize } from "../../interfaces/products";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];

  //methods
  onSelectedSize: (size: ISize) => void;
}

export const SizeSelector: FC<Props> = ({
  selectedSize,
  sizes,
  onSelectedSize,
}) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          sx={
            selectedSize === size
              ? { backgroundColor: "gray" }
              : { backgroundColor: "white" }
          }
          onClick={() => onSelectedSize(size)}
        >
          {size}
        </Button>
      ))}
      {}
    </Box>
  );
};
