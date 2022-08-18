import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { FC, useState } from "react";
import { IProduct } from "../../interfaces/products";

interface Props {
  maxValue: number;
  currentValue: number;
  updatedValue: (value: number) => void;
}

export const ItemCounter: FC<Props> = ({
  currentValue,
  maxValue,
  updatedValue,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>
        {currentValue}
      </Typography>
      <IconButton>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
