import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link';

const columns: GridColDef[] = [
    {headerName: 'ID',field: 'id',width: 100},
    {headerName: 'Nombre Completo',field: 'fullname',width: 300},
    {
        field:'paid',
        headerName:'Pagado',
        description:'Si el pedido fue pagado o no',
        width:200,
        renderCell:(params:GridValueGetterParams)=>{
            return(
                params.row.paid
                ?<Chip color="success" label="Pagado" variant='outlined'/>
                :<Chip color="error" label="No pagado" variant='outlined'/>
            )
        }
    },
    {
        field:'orden',
        headerName:'Ver pedido',
        description:'Visualizar el pedido',
        width:200,
        sortable:false,
        renderCell:(params:GridValueGetterParams)=>{
           
            return(
                //params.row.paid
                /*?<Chip color="success" label="Pagado" variant='outlined'/>
                :<Chip color="error" label="No pagado" variant='outlined'/>*/
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    },
];
const rows=[
    {id:1,fullname:'Alejandro Juarez Rodriguez',paid:true},
    {id:2,fullname:'Armando Juarez Rodriguez',paid:false},
    {id:3,fullname:'Felipe Juarez Rodriguez',paid:true},
];
    

const HistoryPage = () => {
  return (
    <ShopLayout title={'Historial de pedidos'} pageDescription={'Descripción de los pedidos recientes'}>
        <Typography variant='h1' component='h1'>Historial de pedidos</Typography>
        <Grid container>
            <Grid item xs={12} sx={{height:650,width:'100%',marginTop:1}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default HistoryPage