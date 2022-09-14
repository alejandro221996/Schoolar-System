import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import { DefaultLayout } from "../components/layouts";
import { GetServerSideProps } from "next";
import { jwt } from "../utils";
import { FullScreenLoading } from "../components/ui/FullScreenLoading";
import {
  AutoStoriesSharp,
  CreditCardOffOutlined,
  DashboardOutlined,
  HistoryEduSharp,
  SchoolSharp,
} from "@mui/icons-material";
import { SummaryTile } from "../components/admin/SummaryTile";
import PeopleSharpIcon from "@mui/icons-material/PeopleSharp";
import useSWR from "swr";
import { Dashboard } from "../components/admin/Dashboard";

const HomePage: NextPage = () => {
  const isLoading = false;
  const { data, error } = useSWR("/api/admin/dashboard", {
    refreshInterval: 30 * 1000,
  });
  if (!error && !data) {
    return <></>;
  }
  if (error) {
    return <Typography>Something went wrong</Typography>;
  }

  const { users, students, teachers, courses } = data;
  return (
    <DefaultLayout
      title={"Dashboard"}
      pageDescription={"Informacion escolar"}
      subTitle={"Bienvenido al Sistema Escolar de Informacion"}
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2} mt={2}>
        <SummaryTile
          title={users}
          subtitle={"Usuarios registrados"}
          icon={<PeopleSharpIcon color="success" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={courses}
          subtitle={"Materias registradas"}
          icon={<AutoStoriesSharp color="success" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={students}
          subtitle={"Alumnos registrados"}
          icon={<SchoolSharp color="success" sx={{ fontSize: 40 }} />}
        />
        <SummaryTile
          title={teachers}
          subtitle={"Maestros registrados"}
          icon={<SchoolSharp color="success" sx={{ fontSize: 40 }} />}
        />
        <Dashboard />
      </Grid>
    </DefaultLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

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
