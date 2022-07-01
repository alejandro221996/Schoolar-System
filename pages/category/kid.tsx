import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";
import { useProducts } from "../../hooks";

const KidPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=kid");

  return (
    <ShopLayout
      title={"My e-comerce - Kids"}
      pageDescription={"Encuentra los mejores productos para los niños"}
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

export default KidPage;
