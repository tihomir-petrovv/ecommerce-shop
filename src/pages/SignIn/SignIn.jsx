import { useState } from "react";
import "./SignIn.css";
import {
  createUser,
  getUserHandle,
} from "../../services/UserServices/user-services";
import { registerUser } from "../../services/UserServices/auth-services";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";

export default function SignIn() {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const updateForm = (prop) => (event) => {
    setForm({
      ...form,
      [prop]: event.target.value,
    });
  };

  const register = async () => {
    try {
      const user = await getUserHandle(form.username);
      if (user.exists()) {
        return alert(
          `User with email ${form.email} already exists. Please choose another email.`
        );
      }
      const credentials = await registerUser(form.email, form.password);
      navigate("/home");
      await createUser(
        form.firstName,
        form.lastName,
        credentials.user.uid,
        form.email,
        form.phoneNumber
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: "80vh",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={updateForm("firstName")}
                  value={form.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={updateForm("lastName")}
                  value={form.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={updateForm("email")}
                  value={form.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={updateForm("password")}
                  value={form.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="phone"
                  id="phone"
                  autoComplete="new-phone"
                  onChange={updateForm("phoneNumber")}
                  value={form.phoneNumber}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={register}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/logIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
