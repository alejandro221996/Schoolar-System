import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import { initialData } from '../../database/products'
import NextLink from 'next/link'



const productsInCar = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

const SummaryPage = () => {
  return (
    <ShopLayout title={'Resumen de compra'} pageDescription={'Resumen de la orden'}>
      <Typography variant='h1' component='h1'>Resumen de la orden</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Resumen (3 productos)
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link>
                    Editar
                  </Link>
                </NextLink>
              </Box>
              <Typography >Alejandro Juarez Rodriguez</Typography>
              <Typography >124 aguamarina</Typography>
              <Typography >Tulancingo, Hgo.</Typography>
              <Typography >México</Typography>
              <Typography >+1 7751496570</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link>
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <OrderSummary />
              <Box sx={{ my: 3 }} >
                <Button className='checkout_btn secondary' fullWidth>
                  Confirmar orden
                </Button>
              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>

  )
}

export default SummaryPage