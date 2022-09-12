import Head from "next/head";
import { FC, useContext } from "react";
import { AuthContext } from "../../context";
import { Navbar, SideMenu } from "../ui";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children?: React.ReactNode | undefined;
}
export const DefaultLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
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
        {/*TODO navbar*/}
        <Navbar />
      </nav>
      {/*TODO sidebar */}
      <SideMenu />
      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        {children}
      </main>
      <footer>{/*TODO Footer */}</footer>
    </>
  );
};