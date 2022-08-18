import { Grid, Link, Typography, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import React, { FC } from 'react'
import { initialData } from '../../database/products';
import NextLink from 'next/link';
import { ItemCounter } from '../ui';
import { color } from '@mui/system';

const productsInCar = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {

    return (
      <>
        {productsInCar.map((product) => (
          <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <NextLink href="/product/slug" passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.images[0]}`}
                      component="img"
                      sx={{ borderRadius: "5px" }}
                    ></CardMedia>
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{product.title}</Typography>
                <Typography variant="body1">
                  Talla <strong>{product.sizes[0]}</strong>
                </Typography>
                {editable ? (
                  <></>
                ) : (
                  <Typography variant="h5">3 items</Typography>
                )}
              </Box>
            </Grid>

            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="subtitle1">{`$${product.price}`}</Typography>
              {editable && (
                <Button variant="text" className="remover_btn">
                  Remover
                </Button>
              )}
            </Grid>
          </Grid>
        ))}
      </>
    );
}
