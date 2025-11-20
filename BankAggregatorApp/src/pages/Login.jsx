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
//   Grid,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "../api/Authapi";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setValidatedUser] = useState(null);
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

  // ================== LOGIN ==================
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "/Auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, refreshToken, user } = res.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("refreshToken", refreshToken);

      login(user);

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

  // ================== EMAIL VALIDATION ==================
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
      const res = await axios.get("/Auth/validate-email", {
        params: { email },
      });

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

  // ================== REGISTER SUBMIT ==================
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
    <>
      {/* ===================== LANDING PAGE ===================== */}
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(to bottom right, #004e92, #000428)`,
          color: "#fff",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Typography variant="h2" fontWeight={700}>
            Welcome to Digital Banking
          </Typography>

          <Typography mt={2} sx={{ opacity: 0.9, maxWidth: 500 }}>
            Manage your accounts, transfers, savings, and financial profile all
            in one secure place.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{ mt: 4, borderRadius: 2 }}
            onClick={() => setOpen(true)}
          >
            Login / Register
          </Button>
        </Container>
      </Box>

      {/* ===================== LOGIN / REGISTER MODAL ===================== */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper
          elevation={6}
          sx={{
            width: 450,
            maxHeight: "80vh",
            p: 3,
            borderRadius: 3,
            position: "absolute",
            top: "50%",
            left: "50%",
            bgcolor: "rgba(255,255,255,0.97)",
            transform: "translate(-50%, -50%)",
            overflowY: "auto",
            animation: "fadeIn 0.3s",
          }}
        >
          <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label="Existing User" />
            <Tab label="New User" />
          </Tabs>

          {/* ===================== EXISTING USER ===================== */}
          {tab === 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ borderRadius: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
          )}

          {/* ===================== NEW USER ===================== */}
          {tab === 1 && (
            <Box sx={{ mt: 3 }}>
              {emailValidated !== true ? (
                <>
                  <TextField
                    fullWidth
                    label="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, borderRadius: 2 }}
                    onClick={handleEmailValidation}
                  >
                    Validate Email
                  </Button>
                </>
              ) : (
                <Box
                  component="form"
                  onSubmit={handleCreateUserSubmit}
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <Typography variant="h6">
                    Complete Registration
                  </Typography>

                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.userName}
                    onChange={(e) =>
                      setFormData({ ...formData, userName: e.target.value })
                    }
                  />

                  <TextField fullWidth label="Email" disabled value={formData.email} />

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
                      setFormData({
                        ...formData,
                        balance: parseFloat(e.target.value),
                      })
                    }
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isMinor || false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isMinor: e.target.checked,
                          })
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
                          setFormData({
                            ...formData,
                            isNRI: e.target.checked,
                          })
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
                          setFormData({
                            ...formData,
                            poA_Exists: e.target.checked,
                          })
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
                      setFormData({
                        ...formData,
                        poA_Details: e.target.value,
                      })
                    }
                  />

                  <Button fullWidth variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Paper>
      </Modal>

      {/* ===================== SNACKBAR ===================== */}
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
    </>
  );
}
