import React, { useState } from "react";
import {
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "../api/Authapi";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatedUser, setValidatedUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [emailValidated, setEmailValidated] = useState(null);

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
    setEmail("");
    setPassword("");
    setValidatedUser(null);
    setFormData({});
    setEmailValidated(null);
  };

  const handleCloseSnackbar = () =>
    setSnackbar({ ...snackbar, open: false });

  const handleLogin = async () => {
    try {
      const res = await axios.post("/Auth/login", { email, password }, {
        headers: { "Content-Type": "application/json" }
      });
  
      const { token, refreshToken, user } = res.data;
  
      // Save token for future API calls
      localStorage.setItem("authToken", token);
      localStorage.setItem("refreshToken", refreshToken);
  
      // Call your login function with user details
      login(user);
  
      // Navigate based on role
      if (user.roleId === 4) {
        navigate("/manage-users");
      } else {
        navigate("/accounts");
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data || "Invalid credentials",
        severity: "error",
      });
    }
  };

  const handleEmailValidation = async () => {
    if (!email.trim()) {
      setSnackbar({
        open: true,
        message: "Email is required",
        severity: "error",
      });
      return;
    }

    try {
      const res = await axios.get("/Auth/validate-email", { params: { email } });
      const userExists = res.data.exists;

      setEmailValidated(userExists);

      if (userExists) {
        setValidatedUser({ email, userName: "" });
        setFormData({ email, userName: "" });
        setSnackbar({
          open: true,
          message: "Email validated successfully",
          severity: "success",
        });
      } else {
        setValidatedUser(null);
        setFormData({});
        setSnackbar({
          open: true,
          message: "Email not found. Please use a registered email.",
          severity: "error",
        });
      }
    } catch (err) {
      setValidatedUser(null);
      setFormData({});
      setEmailValidated(false);
      setSnackbar({
        open: true,
        message:
          err.response?.data?.title ||
          err.response?.data?.message ||
          "Email validation failed",
        severity: "error",
      });
    }
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: formData.email,
        userName: formData.userName,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth || null,
        address: formData.address || "",
        pan: formData.pan || "",
        aadhar: formData.aadhar || "",
        balance: formData.balance || 0,
        isMinor: formData.isMinor || false,
        isNRI: formData.isNRI || false,
        poA_Exists: formData.poA_Exists || false,
        poA_Details: formData.poA_Details || "",
      };

      const res = await axios.post("/Auth/register", payload);
      const user = res.data;

      login(user);
      setSnackbar({
        open: true,
        message: "User registration complete",
        severity: "success",
      });
      setTab(0);
      setFormData({});
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data || "User registration failed",
        severity: "error",
      });
    }
  };

  return (
    <Grid
      container
      sx={{
        // height: "100vh",
        marginTop: "8vh",
        backgroundImage: "url('/bank-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: "rgba(255,255,255,0.95)",
            maxHeight: "60vh", // restrict paper height
            alignItems: "center",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label="Existing User" />
            <Tab label="New User" />
          </Tabs>

          {/* Scrollable area */}
          <Box sx={{ mt: 2, overflowY: "auto", flexGrow: 1, pr: 1 }}>
            {/* Existing User */}
            {tab === 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Box>
            )}

            {/* New User */}
            {tab === 1 && (
              <>
                {emailValidated === true ? (
                  <Box
                    component="form"
                    onSubmit={handleCreateUserSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Typography variant="h6" mb={1}>
                      Welcome {validatedUser.userName || ""}! Complete your account
                    </Typography>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={formData.userName}
                      onChange={(e) =>
                        setFormData({ ...formData, userName: e.target.value })
                      }
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      value={formData.email}
                      disabled
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.dateOfBirth || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, dateOfBirth: e.target.value })
                      }
                    />
                    <TextField
                      fullWidth
                      label="Address"
                      value={formData.address || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                    <TextField
                      fullWidth
                      label="PAN"
                      value={formData.pan || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, pan: e.target.value })
                      }
                    />
                    <TextField
                      fullWidth
                      label="Aadhar"
                      value={formData.aadhar || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, aadhar: e.target.value })
                      }
                    />
                    <TextField
                      fullWidth
                      label="Initial Balance"
                      type="number"
                      value={formData.balance || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, balance: parseFloat(e.target.value) })
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.isMinor || false}
                          onChange={(e) =>
                            setFormData({ ...formData, isMinor: e.target.checked })
                          }
                        />
                      }
                      label="Is Minor"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.isNRI || false}
                          onChange={(e) =>
                            setFormData({ ...formData, isNRI: e.target.checked })
                          }
                        />
                      }
                      label="Is NRI"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.poA_Exists || false}
                          onChange={(e) =>
                            setFormData({ ...formData, poA_Exists: e.target.checked })
                          }
                        />
                      }
                      label="POA Exists"
                    />
                    <TextField
                      fullWidth
                      label="POA Details"
                      value={formData.poA_Details || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, poA_Details: e.target.value })
                      }
                    />
                    <Button fullWidth variant="contained" type="submit">
                      Submit
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h6" mb={1}>
                      Validate your email to proceed
                    </Typography>
                    <TextField
                      fullWidth
                      label="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleEmailValidation}
                    >
                      Validate Email
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Box>
          
        </Paper>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
