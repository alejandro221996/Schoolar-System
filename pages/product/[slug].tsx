import { Button, Chip, Grid, Typography } from '@mui/material';
import { Box, color } from '@mui/system';
import React from 'react'
import { ShopLayout } from '../../components/layouts';
import { ProductSlideShow } from '../../components/products/ProductSlideShow';
import { ItemCounter } from '../../components/ui';
import { SizeSelector } from '../../components/products';

import { NextPage, GetServerSideProps } from 'next';
import { IProduct } from '../../interfaces';
import { dbproducts } from '../../database';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* SlideShow*/}
          <ProductSlideShow
            images={product.images}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography >
            <Typography variant='subtitle1' component='h2'>
              {`$${product.price}`}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant='subtitle2' component='h2' fontWeight={700}>
              Cantidad
            </Typography>
            <ItemCounter />
            <SizeSelector
              //selectedSize={product.sizes[1]} 
              sizes={product.sizes}
            />
          </Box>
          {
            product.inStock >= 0
              ?
              <Button className='circular-btn add-item'>
                Agregar al carrito
              </Button>
              : <Chip label='No hay disponibles' color='error' variant='outlined' />
          }
          <Box sx={{ mt: 3 }}>
            <Typography variant='subtitle2' fontWeight={700}>Descripcion</Typography>
            <Typography variant='body2' fontWeight={500}>{product.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

//GetServerSideProps
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbproducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
}


export default ProductPage;
