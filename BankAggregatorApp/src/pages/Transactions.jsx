//src/pages/Transactions.jsx
import React, { useState, useEffect, useMemo } from "react";
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
  Alert,
  TextField,
  MenuItem,
  Box,
  Pagination,
} from "@mui/material";
import axios from "../api/Authapi";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  // NEW UI STATES
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("/Account/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data || "Failed to fetch transactions",
        severity: "error",
      });
    }
  };

  const handleView = (txn) => setSelectedTxn(txn);
  const handleClose = () => setSelectedTxn(null);
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  // -----------------------------
  // FILTER + SEARCH + SORT LOGIC
  // -----------------------------
  const processedTransactions = useMemo(() => {
    let list = [...transactions];

    // Search
    if (search.trim()) {
      list = list.filter(
        (t) =>
          t.transactionType.toLowerCase().includes(search.toLowerCase()) ||
          String(t.transactionId).includes(search)
      );
    }

    // Filter
    if (filterType) {
      list = list.filter((t) => t.transactionType === filterType);
    }

    // Sort
    if (sortBy === "newest") {
      list.sort(
        (a, b) =>
          new Date(b.transactionDate) - new Date(a.transactionDate)
      );
    } else if (sortBy === "oldest") {
      list.sort(
        (a, b) =>
          new Date(a.transactionDate) - new Date(b.transactionDate)
      );
    } else if (sortBy === "amountHigh") {
      list.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === "amountLow") {
      list.sort((a, b) => a.amount - b.amount);
    }

    return list;
  }, [transactions, search, filterType, sortBy]);

  // Pagination
  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return processedTransactions.slice(start, start + rowsPerPage);
  }, [processedTransactions, page]);

  const totalPages = Math.ceil(processedTransactions.length / rowsPerPage);

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 600,
          background: "linear-gradient(135deg, #3f51b5, #283593)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Transaction History
      </Typography>

      {/* FILTER BAR */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(8px)",
          borderRadius: 3,
        }}
      >
        <TextField
          label="Search (ID / Type)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220 }}
        />

        <TextField
          select
          label="Filter by Type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Deposit">Deposit</MenuItem>
          <MenuItem value="Withdraw">Withdraw</MenuItem>
          <MenuItem value="Transfer">Transfer</MenuItem>
        </TextField>

        <TextField
          select
          label="Sort By"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
          <MenuItem value="amountHigh">Amount High → Low</MenuItem>
          <MenuItem value="amountLow">Amount Low → High</MenuItem>
        </TextField>
      </Paper>

      {/* TABLE */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0px 6px 25px rgba(0,0,0,0.08)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  fontWeight: 600,
                  background: "#e8eaf6",
                },
              }}
            >
              <TableCell>Txn ID</TableCell>
              <TableCell>Account ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((txn) => (
              <TableRow key={txn.transactionId}>
                <TableCell>{txn.transactionId}</TableCell>
                <TableCell>{txn.accountId}</TableCell>
                <TableCell>{txn.transactionType}</TableCell>
                <TableCell>{txn.amount}</TableCell>
                <TableCell>
                  {new Date(txn.transactionDate).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleView(txn)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, val) => setPage(val)}
            shape="rounded"
            size="medium"
          />
        </Box>
      )}

      {/* MODAL */}
      <Dialog open={!!selectedTxn} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>Transaction Details</DialogTitle>
        <DialogContent dividers>
          {selectedTxn && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Transaction ID:</Typography>
                <Typography>{selectedTxn.transactionId}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2">Account ID:</Typography>
                <Typography>{selectedTxn.accountId}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2">Type:</Typography>
                <Typography>{selectedTxn.transactionType}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2">Amount:</Typography>
                <Typography>{selectedTxn.amount}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2">Date:</Typography>
                <Typography>
                  {new Date(selectedTxn.transactionDate).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* ERROR SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
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
