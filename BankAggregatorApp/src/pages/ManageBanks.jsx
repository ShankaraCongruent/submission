// src/pages/ManageBanks.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  Grid,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Collapse,
  TablePagination,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "../api/Authapi";

const ManageBanks = () => {
  const [banks, setBanks] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);

  const [newBankName, setNewBankName] = useState("");
  const [newBranchName, setNewBranchName] = useState("");
  const [newBranchAddress, setNewBranchAddress] = useState("");
  const [newBranchPhone, setNewBranchPhone] = useState("");

  // UI states
  const [showAddBankForm, setShowAddBankForm] = useState(false);
  const [searchBank, setSearchBank] = useState("");
  const [expandedBank, setExpandedBank] = useState(null);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch all banks and branches
  const fetchBanksAndBranches = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const [banksRes, branchesRes] = await Promise.all([
        axios.get("/Bank/all", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("/Branch/all", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setBanks(banksRes.data);
      setBranches(branchesRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch banks or branches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanksAndBranches();
  }, []);

  const handleAddBank = async () => {
    if (!newBankName.trim()) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "/Bank/create",
        { bankName: newBankName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewBankName("");
      setShowAddBankForm(false); // hide form after adding
      fetchBanksAndBranches();
    } catch (err) {
      console.error(err);
      alert("Failed to add bank");
    }
  };

  const handleAddBranch = async () => {
    if (!selectedBank || !newBranchName.trim()) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "/Branch/create",
        {
          branchName: newBranchName,
          address: newBranchAddress,
          phoneNumber: newBranchPhone,
          bankId: selectedBank.bankId,
          banksBankId: selectedBank.bankId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewBranchName("");
      setNewBranchAddress("");
      setNewBranchPhone("");
      setSelectedBank(null);
      fetchBanksAndBranches();
    } catch (err) {
      console.error(err);
      alert("Failed to add branch");
    }
  };

  // Filtered banks
  const filteredBanks = banks.filter((bank) =>
    bank.bankName.toLowerCase().includes(searchBank.toLowerCase())
  );

  const handleExpand = (bankId) => {
    setExpandedBank(expandedBank === bankId ? null : bankId);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Manage Banks
      </Typography>

      {/* Toggle Add Bank Form */}
      <Box sx={{ mb: 2, display: "flex", flexDirection: "row-reverse"  }}>
        <Button variant="contained" onClick={() => setShowAddBankForm((prev) => !prev)}>
          {showAddBankForm ? "Close Add Bank Form" : "Add Bank"}
        </Button>
      </Box>

      {/* Add Bank Form */}
      {showAddBankForm && (
        <Card sx={{ mb: 3, p: 3, borderRadius: 3 }}>
          <Typography variant="h6">Add New Bank</Typography>
          <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                label="Bank Name"
                value={newBankName}
                onChange={(e) => setNewBankName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button fullWidth variant="contained" onClick={handleAddBank}>
                Add Bank
              </Button>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* Loading */}
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Search Banks */}
          <TextField
            fullWidth
            placeholder="Search Banks..."
            value={searchBank}
            onChange={(e) => setSearchBank(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* Banks Table */}
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Bank ID</TableCell>
                  <TableCell>Bank Name</TableCell>
                  <TableCell>Created On</TableCell>
                  <TableCell>Expand</TableCell>
                  <TableCell>Add Branch</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBanks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((bank) => (
                    <React.Fragment key={bank.bankId}>
                      <TableRow hover>
                        <TableCell>{bank.bankId}</TableCell>
                        <TableCell>{bank.bankName}</TableCell>
                        <TableCell>{new Date(bank.createdOn).toLocaleString()}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleExpand(bank.bankId)}>
                            <ExpandMoreIcon
                              sx={{
                                transform:
                                  expandedBank === bank.bankId
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "0.3s",
                              }}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => setSelectedBank(bank)}
                          >
                            Add Branch
                          </Button>
                        </TableCell>
                      </TableRow>

                      {/* Expandable branches */}
                      <TableRow>
                        <TableCell colSpan={6} sx={{ p: 0 }}>
                          <Collapse in={expandedBank === bank.bankId}>
                            <Box sx={{ p: 2, bgcolor: "#fafafa" }}>
                              <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{ mb: 1 }}
                              >
                                Branches for {bank.bankName}
                              </Typography>

                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Branch ID</TableCell>
                                    <TableCell>Branch Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Phone</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {branches
                                    .filter((b) => b.bankId === bank.bankId)
                                    .map((branch) => (
                                      <TableRow key={branch.branchId}>
                                        <TableCell>{branch.branchId}</TableCell>
                                        <TableCell>{branch.branchName}</TableCell>
                                        <TableCell>{branch.address}</TableCell>
                                        <TableCell>{branch.phoneNumber}</TableCell>
                                      </TableRow>
                                    ))}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredBanks.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
              setPage(0);
            }}
          />
        </>
      )}

      {/* Add Branch Dialog */}
      <Dialog
        open={!!selectedBank}
        onClose={() => setSelectedBank(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Branch – {selectedBank?.bankName}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Branch Name"
            margin="normal"
            value={newBranchName}
            onChange={(e) => setNewBranchName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Address"
            margin="normal"
            value={newBranchAddress}
            onChange={(e) => setNewBranchAddress(e.target.value)}
          />
          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            value={newBranchPhone}
            onChange={(e) => setNewBranchPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAddBranch}>
            Add Branch
          </Button>
          <Button onClick={() => setSelectedBank(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageBanks;
