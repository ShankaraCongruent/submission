//src/pages/Transactions.jsx
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
  Grid,
  Snackbar,
  Alert
} from "@mui/material";
import axios from "../api/Authapi"; // Make sure this axios instance has baseURL

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("/Account/transactions", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(res.data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data || "Failed to fetch transactions",
        severity: "error"
      });
    }
  };

  const handleView = (txn) => setSelectedTxn(txn);
  const handleClose = () => setSelectedTxn(null);
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>Transaction History</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Account ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn.transactionId}>
                <TableCell>{txn.transactionId}</TableCell>
                <TableCell>{txn.accountId}</TableCell>
                <TableCell>{txn.transactionType}</TableCell>
                <TableCell>{txn.amount}</TableCell>
                <TableCell>{new Date(txn.transactionDate).toLocaleString()}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleView(txn)}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  
                </TableCell>
              </TableRow>
            ))}
            {transactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">No transactions available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Transaction Modal */}
      <Dialog open={!!selectedTxn} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent dividers>
          {selectedTxn && (
            <Grid container spacing={2}>
              <Grid item xs={6}><Typography variant="subtitle2">Transaction ID:</Typography><Typography>{selectedTxn.transactionId}</Typography></Grid>
              <Grid item xs={6}><Typography variant="subtitle2">Account ID:</Typography><Typography>{selectedTxn.accountId}</Typography></Grid>
              <Grid item xs={6}><Typography variant="subtitle2">Type:</Typography><Typography>{selectedTxn.transactionType}</Typography></Grid>
              <Grid item xs={6}><Typography variant="subtitle2">Amount:</Typography><Typography>{selectedTxn.amount}</Typography></Grid>
              <Grid item xs={6}><Typography variant="subtitle2">Date:</Typography><Typography>{new Date(selectedTxn.transactionDate).toLocaleString()}</Typography></Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
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

export default Transactions;
 