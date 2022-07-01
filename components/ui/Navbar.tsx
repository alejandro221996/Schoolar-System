import {
  SearchOffOutlined,
  SearchOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Box,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import NextLink from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { UiContext } from "../../context";

export const Navbar = () => {
  let ruta_activa = useRouter().pathname;
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center" underline="none">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 1 }}>Shop</Typography>
          </Link>
        </NextLink>
        {/* TODO flex*/}
        <Box flex={1}></Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink href="/category/men" passHref>
            <Link underline="none">
              <Button className={"/category/men" === ruta_activa
                ? 'primary'
                : 'info'
              }>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link underline="none">
              <Button className={"/category/women" === ruta_activa
                ? 'primary'
                : 'info'
              }>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" passHref>
            <Link underline="none">
              <Button className={"/category/kid" === ruta_activa
                ? 'primary'
                : 'info'
              }>Niños</Button>
            </Link>
          </NextLink>
        </Box>
        {/* TODO flex*/}
        <Box flex={1}></Box>
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
