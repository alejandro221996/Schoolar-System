import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import { initialData } from '../../database/products'
import NextLink from 'next/link'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'



const productsInCar = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

const OrderPage = () => {
  let paid = true
  return (
    <ShopLayout title={'Resumen de la orden 12'} pageDescription={'Resumen de la orden'}>
      <Typography variant='h5' component='h5'>Orden: ABC1234</Typography>

      {/* <Chip
            sx={{my:2}}
            label="Pendiente de pago"
            variant='outlined'
            color='error'
            icon={<CreditCardOffOutlined/>}

        /> */}
      {
        paid
          ? <Chip sx={{ mt: 1 }} label="Pagada" variant='outlined' color='success' icon={<CreditScoreOutlined />} />
          : <Chip sx={{ mt: 1 }} label="Pendiente de pago" variant='outlined' color='error' icon={<CreditCardOffOutlined />} />
      }
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h5'>
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
              <Box sx={{ mt: 1 }} >
                {
                  paid
                    ? <Chip sx={{ mt: 1 }} label="Pagada" variant='outlined' color='success' icon={<CreditScoreOutlined />} />
                    : <Button sx={{ mt: 1 }} className='pagar-btn secondary' fullWidth>Pagar</Button>
                }

              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>

  )
}

export default OrderPage