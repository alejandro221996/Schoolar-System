import { Typography, Box } from "@mui/material";
import type { NextPage, GetServerSideProps } from "next";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";
import { FullScreenLoading } from "../../components/ui/FullScreenLoading";
import { useRouter } from "next/router";
import { dbproducts } from "../../database";
import { IProduct } from "../../interfaces";

interface Props {
  products: IProduct[];
  query: string;
  foundProducts: Boolean;
}

const SearchPage: NextPage<Props> = ({ products, query, foundProducts }) => {
  return (
    <ShopLayout
      title={"My e-comerce - Search"}
      pageDescription={"Encuentra los mejores productos para la familia"}
    >
      <Typography variant="h1" component="h1">
        Buscar productos
      </Typography>

      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }}>
          Resultados de la busqueda: {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            No encontramos ningún producto
          </Typography>
          <Typography
            variant="h2"
            sx={{ ml: 1, color: "red" }}
            textTransform="capitalize"
          >
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let products = await dbproducts.getProductBySearchTerm(query);

  const foundProducts = products.length > 0;
  if (!foundProducts) {
    products = await dbproducts.getAllProducts();
  }

  return {
    props: {
      products,
      query,
      foundProducts,
    },
  };
};

export default SearchPage;
