import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=men");


  return (
    <ShopLayout
      title={"My e-comerce - Men"}
      pageDescription={"Encuentra los mejores productos para hombres"}
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

export default MenPage;
