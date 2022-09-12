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
  Chip,
} from "@mui/material";
import NextLink from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../context";
//import { UiContext } from "../../context";
import LogoutIcon from "@mui/icons-material/Logout";
export const Navbar = () => {
  const router = useRouter();
  const { logout, user } = useContext(AuthContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center" underline="none">
            <Typography variant="h6">School System |</Typography>
            <Typography sx={{ ml: 1, fontWeight: "bold" }}>
              {user?.name}
            </Typography>
          </Link>
        </NextLink>
        {/* TODO flex*/}
        <Box flex={1} />
        <NextLink href="auth/login" passHref>
          <Link>
            <IconButton onClick={logout}>
              <LogoutIcon sx={{ color: "red" }} />
            </IconButton>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
