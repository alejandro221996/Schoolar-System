import { Button, Chip, Grid, Typography } from '@mui/material';
import { Box } from "@mui/system";
import React, { useState } from "react";
import { ShopLayout } from "../../components/layouts";
import { ProductSlideShow } from "../../components/products/ProductSlideShow";
import { ItemCounter } from "../../components/ui";
import { SizeSelector } from "../../components/products";

import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ICartProduct, IProduct } from "../../interfaces";
import { dbproducts } from "../../database";
import { ISize } from "../../interfaces/products";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    slug: product.slug,
    title: product.title,
    quantity: 1,
    gender: product.gender,
    size: undefined,
  });

  const selectedSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

    const onUpdatedQuantity = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* SlideShow*/}
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle2" component="h2" fontWeight={700}>
              Cantidad
            </Typography>
            <ItemCounter currentValue={tempCartProduct.quantity}
            updatedValue={(value)=>}/>
            <SizeSelector
              selectedSize={tempCartProduct.size}
              sizes={product.sizes}
              onSelectedSize={selectedSize}
            />
          </Box>
          {product.inStock > 0 ? (
            <Button onClick={onAddProduct} className="circular-btn add-item">
              {tempCartProduct.size
                ? "Agregar al carrito"
                : "Selecciona un tamaño"}
            </Button>
          ) : (
            <Chip label="No hay disponibles" color="error" variant="outlined" />
          )}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" fontWeight={700}>
              Descripcion
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {product.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

//GetServerSideProps
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
/*
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
}*/

//GetStaticPaths
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbproducts.getAllProductSlugs(); // your fetch function here

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: "blocking",
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbproducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
