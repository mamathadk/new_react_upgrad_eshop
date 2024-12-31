import { Button, TextField, CircularProgress, Box } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Footer from "../Footer/Footer";
import { signin } from "../../common/apiService";
import { toast } from "react-toastify";
import { emailRegex } from "../../common/regex";

import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error } = useSelector((state) => state.auth);
  // const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};

    if (!email || !emailRegex.test(email))
      newErrors.email = "Please enter a valid email address.";
    if (!password || password.length < 7)
      newErrors.password = "Password must be at least 7 characters long.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async () => {
    if (!validateInputs()) return;

    dispatch(loginUser({ username: email, password: password }))
      .unwrap() // Unwrap the thunk result for direct error handling
      .then((data) => {
        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/products"), 1000);
      })
      .catch((error) => {
        console.error("Error during login:", error);
        toast.error(
          error?.message || "The email or password entered is incorrect"
        );
      });
  };

  //   const handleLogin = async () => {
  //     dispatch(
  //       loginUser({
  //         username: email,
  //         password: password,
  //       })
  //     );
  //     if (!validateInputs()) return;

  //     const requestBody = {
  //       username: email,
  //       password: password,
  //     };

  //     //isLoading(true);

  //     try {
  //       const data = await signin(requestBody);
  //       const userRole = data?.roles || [];
  //       console.log(userRole, "userRole");

  //       //onLogin(data);

  //       toast.success("Login successful! Redirecting...");
  //       setTimeout(() => {
  //         navigate("/products");
  //       }, 1000);
  //     } catch (error) {
  //       console.error("Error during login:", error);
  //       toast.error(
  //         error?.message || "The email or password entered is incorrect"
  //       );
  //     } finally {
  //       //isLoading(false);
  //     }
  //   };

  return (
    <Box className="login-wrapper">
      <Box className="login-second-wrapper">
        <Box className="icon-wrapper">
          <LockOpenIcon style={{ fontSize: "23px", color: "white" }} />
        </Box>
        <h1>Sign in</h1>

        <TextField
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button
          onClick={handleLogin}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem", backgroundColor: "#3f51b5" }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "SIGN IN"
          )}
        </Button>

        <Box className="link-wrapper" style={{ marginTop: "10px" }}>
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
