import { Box, Typography } from "@mui/material";
import Head from "next/head";
import { FC, useContext } from "react";
import { AuthContext } from "../../context";
import { Navbar, SideMenu } from "../ui";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  subTitle: string;
  icon?: JSX.Element;
  children?: React.ReactNode | undefined;
}
export const DefaultLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
  icon,
  subTitle,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon}
            {title}
          </Typography>
          <Typography variant="h2" component="h2">
            {subTitle}
          </Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>
      <footer>{/*TODO Footer */}</footer>
    </>
  );
};
