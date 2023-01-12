import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../slices/UserSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.jpg";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  const [password_err, setPasswordErr] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, error } = useSelector((state) => state.user);

  useEffect(() => {
    userInfo && navigate("/");
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={4}
          sx={{
            width: { xs: "70vw", md: "60vw", lg: "80vw", xl: "70vw" },
            height: { xs: "80vh", md: "70vh" },
            margin: { xs: 2, md: 5 },
            padding: { xs: 2, md: 4, lg: 8 },
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              height: { xs: "50%", md: "100%" },
              width: { xs: "100%", md: "50%" },
            }}
          >
            <img src={login} style={{ height: "100%" }} alt="" />
          </Box>
          <Box
            sx={{
              height: { xs: "50%", md: "100%" },
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Typography sx={{ textAlign: "center" }} variant="h5">
              Sign In
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type={"email"}
              variant="standard"
              fullWidth
            />
            <Box sx={{ display: "flex", position: "relative" }}>
              <TextField
                error={password_err}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="password"
                type={show ? "text" : "password"}
                variant="standard"
                helperText={password_err && password_err}
                fullWidth
              />
              {show ? (
                <VisibilityOffIcon
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "0%",
                    bottom: "40%",
                  }}
                  onClick={() => setShow(!show)}
                />
              ) : (
                <VisibilityIcon
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "0%",
                    bottom: "40%",
                  }}
                  onClick={() => setShow(!show)}
                />
              )}
            </Box>
            <Button type="submit" variant="contained" fullWidth>
              Sign In
            </Button>
            <Typography>
              Don't have account?{" "}
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/register")}
                underline="always"
              >
                register here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </form>
    </Stack>
  );
};

export default LoginScreen;
