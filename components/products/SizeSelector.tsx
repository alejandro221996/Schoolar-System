
import { Box, Button } from '@mui/material';
import React, { FC } from 'react'
import { ISize } from '../../interfaces/products';

interface Props {
    selectedSize?: ISize;
    sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
    return (
        <Box>
            {

                sizes.map(size => (
                    <Button
                        key={size}
                        size='small'
                        sx={selectedSize === size
                            ? { backgroundColor: 'gray' }
                            : { backgroundColor: 'white' }
                        }
                    >
                        {size}
                    </Button>
                ))
            }
            {

            }

        </Box>
    )
}
