import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks";
import { FullScreenLoading } from "../components/ui/FullScreenLoading";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products");
  return (
    <ShopLayout
      title={"My e-comerce"}
      pageDescription={"Encuentra los mejores productos para la familia"}
    >
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <>
          <Typography variant="h1" component="h1">
            E-comerce
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }}>
            Todos los productos
          </Typography>
          <ProductList products={products} />
        </>
      )}
    </ShopLayout>
  );
};

export default HomePage;
