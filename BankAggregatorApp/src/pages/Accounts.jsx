// // src/pages/Accounts.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Grid,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import axios from "../api/Authapi";
// const Accounts = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // Fetch accounts on page load
//   useEffect(() => {
//     fetchAccounts();
//   }, []);

//   const fetchAccounts = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const res = await axios.get("/Account/view", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       setAccounts(res.data);
//     } catch (err) {
//       setSnackbar({
//         open: true,
//         message: err.response?.data || "Failed to fetch accounts",
//         severity: "error",
//       });
//     }
//   };
  

//   const handleCloseSnackbar = () =>
//     setSnackbar({ ...snackbar, open: false });

//   const handleOpenAccount = (account) => {
//     setSelectedAccount(account);
//     setAmount("");
//   };

//   const handleClose = () => {
//     setSelectedAccount(null);
//   };

//   const handleDeposit = async () => {
//     if (!amount || parseFloat(amount) <= 0) {
//       alert("Enter a valid amount");
//       return;
//     }
  
//     try {
//       const token = localStorage.getItem("authToken");
//       const res = await axios.post(`/Account/deposit/${selectedAccount.accountId}`, parseFloat(amount), {
//         headers: { Authorization: `Bearer ${token}` }
//       });
  
//       setAccounts(prev => prev.map(acc =>
//         acc.accountId === selectedAccount.accountId
//           ? { ...acc, balance: res.data.balance }
//           : acc
//       ));
  
//       alert(res.data.message);
//       handleClose();
//     } catch (err) {
//       alert(err.response?.data || "Deposit failed");
//     }
//   };
  
//   const handleWithdraw = async () => {
//     if (!amount || parseFloat(amount) <= 0) {
//       alert("Enter a valid amount");
//       return;
//     }
  
//     try {
//       const token = localStorage.getItem("authToken");
//       const res = await axios.post(`/Account/withdraw/${selectedAccount.accountId}`, parseFloat(amount), {
//         headers: { Authorization: `Bearer ${token}` }
//       });
  
//       setAccounts(prev => prev.map(acc =>
//         acc.accountId === selectedAccount.accountId
//           ? { ...acc, balance: res.data.balance }
//           : acc
//       ));
  
//       alert(res.data.message);
//       handleClose();
//     } catch (err) {
//       alert(err.response?.data || "Withdrawal failed");
//     }
//   };
  
//   const handleCloseAccount = async (accountId) => {
//     if (window.confirm("Are you sure you want to close this account?")) {
//       try {
//         const token = localStorage.getItem("authToken");
//         await axios.delete(`/Account/delete/${accountId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setAccounts(accounts.filter(acc => acc.accountId !== accountId));
//         alert("Account closed successfully");
//       } catch (err) {
//         alert(err.response?.data || "Failed to close account");
//       }
//     }
//   };  

//   return (
//     <Container sx={{ mt: 5 }}>
//       <Typography variant="h5" gutterBottom>
//         Your Accounts
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Account ID</TableCell>

//               <TableCell>Balance</TableCell>
//               <TableCell>Limit Amount</TableCell>
//               <TableCell>Branch ID</TableCell>
//               <TableCell>Currency ID</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {accounts.map((acc) => (
//               <TableRow key={acc.accountId}>
//                 <TableCell>{acc.accountId}</TableCell>
//                 <TableCell>{acc.balance}</TableCell>
//                 <TableCell>{acc.limitAmount}</TableCell>
//                 <TableCell>{acc.branchId}</TableCell>
//                 <TableCell>{acc.currencyId}</TableCell>
//                 <TableCell align="center">
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     sx={{ mr: 1 }}
//                     onClick={() => handleOpenAccount(acc)}
//                   >
//                     Deposit / Withdraw
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     size="small"
//                     onClick={() => handleCloseAccount(acc.accountId)}
//                   >
//                     Close
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {accounts.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   No accounts available
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Deposit / Withdraw Modal */}
//       <Dialog open={!!selectedAccount} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>{selectedAccount?.accountId}</DialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Amount"
//                 type="number"
//                 fullWidth
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDeposit} color="success">
//             Deposit
//           </Button>
//           <Button onClick={handleWithdraw} color="warning">
//             Withdraw
//           </Button>
//           <Button onClick={handleClose}>Cancel</Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default Accounts;
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
  Box,
  TablePagination,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";
import axios from "../api/Authapi";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [amount, setAmount] = useState("");

  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch accounts
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
      setFilteredAccounts(res.data);
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

  // -----------------------
  //  SEARCH
  // -----------------------
  useEffect(() => {
    handleFilterAndSort();
  }, [search, branchFilter, sortField, sortOrder, accounts]);

  const handleFilterAndSort = () => {
    let data = [...accounts];

    // Search
    if (search) {
      data = data.filter(
        (acc) =>
          acc.accountId.toString().includes(search) ||
          acc.branchId.toString().includes(search)
      );
    }

    // Filter
    if (branchFilter) {
      data = data.filter((acc) => acc.branchId == branchFilter);
    }

    // Sorting
    if (sortField) {
      data.sort((a, b) => {
        if (sortOrder === "asc") return a[sortField] > b[sortField] ? 1 : -1;
        return a[sortField] < b[sortField] ? 1 : -1;
      });
    }

    setFilteredAccounts(data);
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // -----------------------
  //  Deposit / Withdraw / Close
  // -----------------------
  const handleOpenAccount = (account) => {
    setSelectedAccount(account);
    setAmount("");
  };

  const handleClose = () => setSelectedAccount(null);

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `/Account/deposit/${selectedAccount.accountId}`,
        parseFloat(amount),
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.accountId === selectedAccount.accountId
            ? { ...acc, balance: res.data.balance }
            : acc
        )
      );

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
      const res = await axios.post(
        `/Account/withdraw/${selectedAccount.accountId}`,
        parseFloat(amount),
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.accountId === selectedAccount.accountId
            ? { ...acc, balance: res.data.balance }
            : acc
        )
      );

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
          headers: { Authorization: `Bearer ${token}` },
        });

        setAccounts(accounts.filter((acc) => acc.accountId !== accountId));
        alert("Account closed successfully");
      } catch (err) {
        alert(err.response?.data || "Failed to close account");
      }
    }
  };

  // Pagination
  const paginatedData = filteredAccounts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 600,
          background: "linear-gradient(135deg, #4b6cb7, #182848)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Your Accounts
      </Typography>

      {/* Search + Filters */}
      <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by Account / Branch"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
          <TextField
                select
                label="Filter by Branch"
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                sx={{
                    width: "300px",     // wider by default
                    maxWidth: "100%",   // stays responsive
                }}
                >
              <MenuItem value="">All Branches</MenuItem>
              {[...new Set(accounts.map((a) => a.branchId))].map((bid) => (
                <MenuItem key={bid} value={bid}>
                  Branch {bid}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(135deg, #4b6cb7, #182848)",
              }}
            >
              {[
                { label: "Account ID", field: "accountId" },
                { label: "Balance", field: "balance" },
                { label: "Limit Amount", field: "limitAmount" },
                { label: "Branch ID", field: "branchId" },
                { label: "Currency ID", field: "currencyId" },
              ].map((col) => (
                <TableCell
                  key={col.field}
                  sx={{ color: "white", fontWeight: 600 }}
                >
                  <Box display="flex" alignItems="center">
                    {col.label}
                    <IconButton
                      size="small"
                      onClick={() => toggleSort(col.field)}
                      sx={{ color: "white" }}
                    >
                      <SortIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </TableCell>
              ))}
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: 600 }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((acc) => (
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

            {filteredAccounts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No accounts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        page={page}
        rowsPerPage={rowsPerPage}
        count={filteredAccounts.length}
        onPageChange={(e, newPage) => setPage(newPage)}
      />

      {/* Deposit / Withdraw Modal */}
      <Dialog open={!!selectedAccount} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>
          Account #{selectedAccount?.accountId}
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
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

      {/* Snackbar */}
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
