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
  Input,
  InputAdornment,
} from "@mui/material";
import NextLink from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { UiContext } from "../../context";

export const Navbar = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    router.push(`/search/${searchTerm}`);
  };
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
        <Box
          className="fadeIn"
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
        >
          <NextLink href="/category/men" passHref>
            <Link underline="none">
              <Button
                className={
                  "/category/men" === router.pathname ? "primary" : "info"
                }
              >
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link underline="none">
              <Button
                className={
                  "/category/women" === router.pathname ? "primary" : "info"
                }
              >
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" passHref>
            <Link underline="none">
              <Button
                className={
                  "/category/kid" === router.pathname ? "primary" : "info"
                }
              >
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>
        {/* TODO flex*/}
        <Box flex={1} />
        {/* Pantallas grandes*/}
        {isSearchVisible ? (
          <Input
            className="fadeIn"
            sx={{ display: { xs: "none", sm: "flex" } }}
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setIsSearchVisible(false)}
                  aria-label="toggle password visibility"
                >
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{ display: { xs: "none", sm: "flex" } }}
            className="fadeIn"
            onClick={() => setIsSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}
        {/* Pantallas pequeñas*/}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}
        >
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
