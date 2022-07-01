import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=women");

  return (
    <ShopLayout
      title={"My e-comerce - Women"}
      pageDescription={"Encuentra los mejores productos para mujeres"}
    >
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <>
          <Typography variant="h1" component="h1">
            E-comerce
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }}>
            Products for kids
          </Typography>
          <ProductList products={products} />
        </>
      )}
    </ShopLayout>
  );
};

export default WomenPage;
