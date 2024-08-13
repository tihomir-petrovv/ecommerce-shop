import { useContext, useState } from "react";
import { loginUser } from "../../services/UserServices/auth-services";
import { getUserData } from "../../services/UserServices/user-services";
import { AppContext } from "../../components/context/UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import { LockOpenOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function LogIn() {
  const { user, userData, setUserContext } = useContext(AppContext);
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const login = async () => {
    try {
      const credentials = await loginUser(form.email, form.password);

      if (credentials.user) {
        await getUserData(credentials.user.uid).then((snapshot) => {
          setUserContext({
            user: credentials.user,
            userData: snapshot.val()[Object.keys(snapshot.val())[0]],
          });
        });
      }
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth={"xs"}>
        <CssBaseline />
        <Link to="/" variant="body2" style={{
          color: defaultTheme.palette.primary.main,
        }}>
          eShop.bg
        </Link>
        <Box sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOpenOutlined />
          </Avatar>
          <Typography component="h1" variant="h4">
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={form.email}
              onChange={updateForm("email")}
              onKeyDown={handleKeyPress}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={form.password}
              onChange={updateForm("password")}
              onKeyDown={handleKeyPress}
              //error={error}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={login}
              >
                Log In
              </Button>
            </Box>
              <Link to="/signIn" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
