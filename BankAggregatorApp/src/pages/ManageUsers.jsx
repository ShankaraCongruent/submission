// src/pages/ManageUsers.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "../api/Authapi"; // your axios instance with baseURL

const ManageUsers = () => {
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    roleId: 6, // default NormalUser
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("/Account/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data); // assuming API returns array of users
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const payload = {
        UserName: newUser.userName,
        Email: newUser.email,
        RoleId: parseInt(newUser.roleId),
      };
      const res = await axios.post("/Auth/register", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message || "User registered successfully");
      setNewUser({ userName: "", email: "", roleId: 6 });
      setShowForm(false);
      fetchUsers(); // refresh list after adding
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to register user");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">Manage Users</Typography>
          <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Register User"}
          </Button>
        </Grid>

        {showForm && (
          <Paper elevation={2} sx={{ p: 3, mb: 3, backgroundColor: "#f9f9f9" }}>
            <Typography variant="h6" gutterBottom>Register New User</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  name="userName"
                  fullWidth
                  value={newUser.userName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={newUser.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select name="roleId" value={newUser.roleId} onChange={handleChange} label="Role">
                    <MenuItem value={4}>Admin</MenuItem>
                    <MenuItem value={5}>BankUser</MenuItem>
                    <MenuItem value={6}>NormalUser</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}

        <Typography variant="h6" gutterBottom>All Users</Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Is Active</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>PAN</TableCell>
                  <TableCell>Aadhar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                    <TableRow key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.roleId}</TableCell> {/* or map to role name if you have */}
                    <TableCell>{user.isActive ? "Yes" : "No"}</TableCell>
                    <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "-"}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.pan}</TableCell>
                    <TableCell>{user.aadhar}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default ManageUsers;
