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
  Avatar,
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
        <Box sx={{ width: 300 }}>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center" underline="none">
              <Typography variant="h6">School System |</Typography>
              <Typography sx={{ ml: 1, fontWeight: "bold" }}>
                {user?.name}
              </Typography>
            </Link>
          </NextLink>
        </Box>
        {/* TODO flex*/}
        <Box flex={1} />
        <NextLink href="/usuarios" passHref>
          <Link underline="none">
            <Button>Usuarios</Button>
          </Link>
        </NextLink>
        <NextLink href="/materias" passHref>
          <Link underline="none">
            <Button>Materias</Button>
          </Link>
        </NextLink>
        <NextLink href="/alumnos" passHref>
          <Link underline="none">
            <Button>Alumnos</Button>
          </Link>
        </NextLink>
        <NextLink href="auth/login" passHref>
          <Link>
            <IconButton onClick={logout}>
              <LogoutIcon sx={{ color: "red" }} />
            </IconButton>
          </Link>
        </NextLink>
        <Chip
          avatar={<Avatar>{user?.name.substring(0, 1)}</Avatar>}
          label={user?.role}
        />
      </Toolbar>
    </AppBar>
  );
};
