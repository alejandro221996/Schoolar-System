import React from 'react'
import { Grid, Typography } from '@mui/material';

export const OrderSummary = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>3 items</Typography>
            </Grid>
            <Grid item xs={6} >
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' >
                <Typography>{`$${350.36}`}</Typography>
            </Grid>
            <Grid item xs={6} >
                <Typography>Impuestos(16%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' >
                <Typography>{`$${35.36}`}</Typography>
            </Grid>
            <Grid item xs={6} mt={2}>
                <Typography variant='subtitle1'>Total:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' mt={2}>
                <Typography variant='subtitle1'>{`$${740.36}`}</Typography>
            </Grid>

        </Grid>
    )
}
