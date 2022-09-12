import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { DefaultLayout } from "../components/layouts";

import { FullScreenLoading } from "../components/ui/FullScreenLoading";
import { AuthContext } from "../context";

const HomePage: NextPage = () => {
  const isLoading = false;

  return (
    <DefaultLayout
      title={"My Dashboard"}
      pageDescription={"Informacion escolar"}
    >
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <>
          <Typography
            display="inline"
            variant="h1"
            component="h1"
            sx={{ fontWeight: "medium" }}
          >
            Bienvenido al
          </Typography>
          <Typography
            display="inline"
            variant="h1"
            component="h1"
            sx={{ fontWeight: "bold", ml: 1 }}
          >
            Sistema Escolar de Informacion
          </Typography>
        </>
      )}
    </DefaultLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { jwt } from "../utils";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = "" } = req.cookies;
  let userId = "";
  let isValidToken = false;
  try {
    userId = await jwt.isValidToken(token);
    isValidToken = true;
  } catch (error) {
    isValidToken = false;
  }
  if (!isValidToken) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default HomePage;
