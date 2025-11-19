// src/pages/Accounts.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "../api/Authapi";
const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch accounts on page load
  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("/Account/view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setAccounts(res.data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data || "Failed to fetch accounts",
        severity: "error",
      });
    }
  };
  

  const handleCloseSnackbar = () =>
    setSnackbar({ ...snackbar, open: false });

  const handleOpenAccount = (account) => {
    setSelectedAccount(account);
    setAmount("");
  };

  const handleClose = () => {
    setSelectedAccount(null);
  };

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }
  
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`/Account/deposit/${selectedAccount.accountId}`, parseFloat(amount), {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      setAccounts(prev => prev.map(acc =>
        acc.accountId === selectedAccount.accountId
          ? { ...acc, balance: res.data.balance }
          : acc
      ));
  
      alert(res.data.message);
      handleClose();
    } catch (err) {
      alert(err.response?.data || "Deposit failed");
    }
  };
  
  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }
  
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(`/Account/withdraw/${selectedAccount.accountId}`, parseFloat(amount), {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      setAccounts(prev => prev.map(acc =>
        acc.accountId === selectedAccount.accountId
          ? { ...acc, balance: res.data.balance }
          : acc
      ));
  
      alert(res.data.message);
      handleClose();
    } catch (err) {
      alert(err.response?.data || "Withdrawal failed");
    }
  };
  
  const handleCloseAccount = async (accountId) => {
    if (window.confirm("Are you sure you want to close this account?")) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`/Account/delete/${accountId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAccounts(accounts.filter(acc => acc.accountId !== accountId));
        alert("Account closed successfully");
      } catch (err) {
        alert(err.response?.data || "Failed to close account");
      }
    }
  };  

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Your Accounts
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account ID</TableCell>
              
              <TableCell>Balance</TableCell>
              <TableCell>Limit Amount</TableCell>
              <TableCell>Branch ID</TableCell>
              <TableCell>Currency ID</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((acc) => (
              <TableRow key={acc.accountId}>
                <TableCell>{acc.accountId}</TableCell>
                <TableCell>{acc.balance}</TableCell>
                <TableCell>{acc.limitAmount}</TableCell>
                <TableCell>{acc.branchId}</TableCell>
                <TableCell>{acc.currencyId}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleOpenAccount(acc)}
                  >
                    Deposit / Withdraw
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleCloseAccount(acc.accountId)}
                  >
                    Close
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {accounts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No accounts available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Deposit / Withdraw Modal */}
      <Dialog open={!!selectedAccount} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedAccount?.accountId}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeposit} color="success">
            Deposit
          </Button>
          <Button onClick={handleWithdraw} color="warning">
            Withdraw
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

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
    </Container>
  );
};

export default Accounts;
 