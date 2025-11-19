import React, { useState, useEffect } from "react";
import { Box, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from "@mui/material";
import FeatureCard from "../components/Card";
import axios from "../api/Authapi"; // axios instance with baseURL

const features = [
  { title: "Savings Account", description: "Open and manage your savings account.", type: "account" },
  { title: "Current Account", description: "Business-friendly current account.", type: "account" },
  { title: "Loans", description: "Personal and home loans.", type: "loan" },
  { title: "Investments", description: "Mutual funds and fixed deposits.", type: "investment" },
];

const LandingPage = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [formData, setFormData] = useState({
    InitialDeposit: "",
    BranchId: "",
    CurrencyId: "",
    LimitAmount: "",
  });
  const [userId, setUserId] = useState(null); // store logged-in user's ID

  useEffect(() => {
    // Get userId from localStorage or login context
    const user = JSON.parse(localStorage.getItem("user")); // assuming you store user info
    if (user?.userId) setUserId(user.userId);
  }, []);

  const handleOpen = (feature) => {
    setSelectedFeature(feature);
    setFormData({
      InitialDeposit: "",
      BranchId: "",
      CurrencyId: "",
      LimitAmount: "",
    });
  };

  const handleClose = () => {
    setSelectedFeature(null);
    setFormData({
      InitialDeposit: "",
      BranchId: "",
      CurrencyId: "",
      LimitAmount: "",
    });
  };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const payload = {
        InitialDeposit: parseFloat(formData.InitialDeposit),
        UserId: userId, // use logged-in user's ID
        BranchId: parseInt(formData.BranchId),
        CurrencyId: parseInt(formData.CurrencyId),
        LimitAmount: 50000,
      };

      const res = await axios.post("/Account/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(res.data.message);
      handleClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to create account");
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mt: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <FeatureCard
              title={feature.title}
              description={feature.description}
              onClick={() => handleOpen(feature)}
            />
          </Grid>
        ))}
      </Grid>
      

      <Dialog open={!!selectedFeature} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedFeature?.title}</DialogTitle>
        <DialogContent dividers>
        {selectedFeature?.type === "account" && (
            <>
                <TextField
                fullWidth
                name="UserId"
                label="User ID"
                type="number"
                margin="normal"
                value={userId || ""}
                disabled
                />
                <TextField
                fullWidth
                name="InitialDeposit"
                label="Initial Deposit"
                type="number"
                margin="normal"
                value={formData.InitialDeposit}
                onChange={(e) => setFormData({ ...formData, InitialDeposit: e.target.value })}
                />
                <TextField
                fullWidth
                name="BranchId"
                label="Branch ID"
                type="number"
                margin="normal"
                value={formData.BranchId}
                onChange={(e) => setFormData({ ...formData, BranchId: e.target.value })}
                />
                <TextField
                fullWidth
                name="CurrencyId"
                label="Currency ID"
                type="number"
                margin="normal"
                value={formData.CurrencyId}
                onChange={(e) => setFormData({ ...formData, CurrencyId: e.target.value })}
                />
                <TextField
                fullWidth
                name="LimitAmount"
                label="Limit Amount"
                type="number"
                margin="normal"
                value={formData.LimitAmount || 50000} // hardcoded default
                disabled
                />
            </>
            )}
          {selectedFeature?.type === "loan" && (
            <Typography>Loan application form will appear here.</Typography>
          )}
          {selectedFeature?.type === "investment" && (
            <Typography>Investment options and forms will appear here.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LandingPage;
