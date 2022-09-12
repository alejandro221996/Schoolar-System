import React, { useState } from "react";
import { AuthLayout } from "../../components/layouts";
import { Box } from "@mui/system";
import { Grid, Typography, TextField, Button, Link, Chip } from "@mui/material";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { schoolApi } from "../../api";
import { validations } from "../../utils";
import { CheckCircleOutlineOutlined, ErrorOutline } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../../context";

type FormData = {
  email: string;
  password: string;
  name: string;
};
const RegisterPage = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const onRegisterUser = async ({ email, password, name }: FormData) => {
    setError(false);
    const { hasError, message } = await registerUser(name, email, password);
    if (hasError) {
      setError(true);
      setMessage(message!);
      setTimeout(() => setError(false), 3000);
      return;
    }
    router.replace("/");
  };
  return (
    <AuthLayout title={"Registrarse"} pageDescription={"Pagina de registro"}>
      <form onSubmit={handleSubmit(onRegisterUser)}>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>
              <Chip
                label="Hubo un problema al registrarse"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: error ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
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
                variant="contained"
                className="pagar-btn"
                fullWidth
                type="submit"
              >
                Registrarse
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/login" passHref>
                <Link underline="always">¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
