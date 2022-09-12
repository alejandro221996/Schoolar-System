import React, { useContext, useState } from "react";
import { AuthLayout } from "../../components/layouts";
import { Box } from "@mui/system";
import { Grid, Typography, TextField, Button, Link, Chip } from "@mui/material";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { schoolApi } from "../../api";
import { AuthContext } from "../../context";
import axios from "axios";
import { ErrorOutline, CheckCircleOutlineOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import PeopleSharpIcon from "@mui/icons-material/PeopleSharp";

type FormData = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState(false);
  const { loginUser, isLoggedIn, user } = useContext(AuthContext);
  const onLoginUser = async ({ email, password }: FormData) => {
    setError(false);
    const isValidLogin = await loginUser(email, password);
    if (!isValidLogin) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }
    router.replace("/");
  };
  return (
    <AuthLayout
      title={"Ingresar al sistema"}
      pageDescription={"Pagina de login"}
    >
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                sx={{ textAlign: "center" }}
                variant="h1"
                component="h1"
              >
                Iniciar Sesión
              </Typography>
              <Box sx={{ textAlign: "center" }}>
                <PeopleSharpIcon sx={{ fontSize: 100, color: "green" }} />
              </Box>
              <Chip
                label="No encontramos ese usuario / contrasenia"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: error ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className="pagar-btn"
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/register" passHref>
                <Link underline="always">¿No tienes una cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
