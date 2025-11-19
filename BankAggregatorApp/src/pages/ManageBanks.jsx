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
  
} from "@mui/material";
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

  // Add new bank
  const handleAddBank = async () => {
    if (!newBankName.trim()) return;
    try {
      const token = localStorage.getItem("authToken");
      await axios.post("/Bank/create", { bankName: newBankName }, { headers: { Authorization: `Bearer ${token}` } });
      setNewBankName("");
      fetchBanksAndBranches();
    } catch (err) {
      console.error(err);
      alert("Failed to add bank");
    }
  };

  // Add new branch
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

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Manage Banks
      </Typography>

      {/* Add Bank Section */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Typography variant="h6">Add New Bank</Typography>
        <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
          <Grid item xs={8} sm={10}>
            <TextField
              fullWidth
              label="Bank Name"
              value={newBankName}
              onChange={(e) => setNewBankName(e.target.value)}
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <Button variant="contained" onClick={handleAddBank}>
              Add Bank
            </Button>
          </Grid>
        </Grid>
      </Card>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Banks Table */}
          <Typography variant="h6" gutterBottom>
            Banks
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Bank ID</TableCell>
                  <TableCell>Bank Name</TableCell>
                  <TableCell>Bank Manager ID</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Created On</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {banks.map((bank) => (
                  <TableRow key={bank.bankId}>
                    <TableCell>{bank.bankId}</TableCell>
                    <TableCell>{bank.bankName}</TableCell>
                    <TableCell>{bank.bankManagerId}</TableCell>
                    <TableCell>{bank.createdBy}</TableCell>
                    <TableCell>{new Date(bank.createdOn).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" onClick={() => setSelectedBank(bank)}>
                        Add Branch
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Branches Table */}
          <Typography variant="h6" gutterBottom>
            Branches
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Branch ID</TableCell>
                  <TableCell>Branch Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Bank ID</TableCell>
                  <TableCell>Manager ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {branches.map((branch) => (
                  <TableRow key={branch.branchId}>
                    <TableCell>{branch.branchId}</TableCell>
                    <TableCell>{branch.branchName}</TableCell>
                    <TableCell>{branch.address}</TableCell>
                    <TableCell>{branch.phoneNumber}</TableCell>
                    <TableCell>{branch.bankId}</TableCell>
                    <TableCell>{branch.managerId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Add Branch Dialog */}
      <Dialog open={!!selectedBank} onClose={() => setSelectedBank(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Branch for {selectedBank?.bankName}</DialogTitle>
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
          <Button onClick={handleAddBranch} variant="contained">
            Add Branch
          </Button>
          <Button onClick={() => setSelectedBank(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageBanks;
