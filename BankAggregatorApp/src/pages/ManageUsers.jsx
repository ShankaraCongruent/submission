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
  TablePagination,
  IconButton,
  Stack,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";
import axios from "../api/Authapi";

const ManageUsers = () => {
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    roleId: 6,
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI state additions
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("/Account/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
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
      fetchUsers();
    } catch (err) {
      alert("Failed to register user");
    }
  };

  // Filtering, sorting & search
  const filteredUsers = users
    .filter(
      (u) =>
        (!roleFilter || u.roleId == roleFilter) &&
        (!search ||
          u.userName?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      return sortAsc
        ? a.userName.localeCompare(b.userName)
        : b.userName.localeCompare(a.userName);
    });

  return (
    <Container sx={{ mt: 5 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        {/* HEADER */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight="bold">
            Manage Users
          </Typography>

          <Button
            variant="contained"
            onClick={() => setShowForm(!showForm)}
            sx={{ borderRadius: 2 }}
          >
            {showForm ? "Cancel" : "Register User"}
          </Button>
        </Grid>

        {/* FORM SECTION */}
        {showForm && (
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mt: 3,
              borderRadius: 2,
              bgcolor: "background.default",
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Register New User
            </Typography>

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
                  <Select
                    name="roleId"
                    value={newUser.roleId}
                    label="Role"
                    onChange={handleChange}
                  >
                    <MenuItem value={4}>Admin</MenuItem>
                    <MenuItem value={5}>BankUser</MenuItem>
                    <MenuItem value={6}>NormalUser</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={handleSubmit}
                  sx={{ borderRadius: 2 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* FILTER + SEARCH */}
        <Box
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Users List
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="center"
            mb={2}
          >
            {/* Search */}
            <TextField
              fullWidth
              label="Search by Name or Email"
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Role Filter */}
            <FormControl fullWidth>
              <InputLabel>Filter by Role</InputLabel>
              <Select
                value={roleFilter}
                label="Filter by Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={4}>Admin</MenuItem>
                <MenuItem value={5}>BankUser</MenuItem>
                <MenuItem value={6}>NormalUser</MenuItem>
              </Select>
            </FormControl>

            {/* Sort Button */}
            <IconButton onClick={() => setSortAsc(!sortAsc)}>
              <SortIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* USERS TABLE */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper elevation={4} sx={{ borderRadius: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Last Login</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>PAN</TableCell>
                    <TableCell>Aadhar</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <TableRow key={user.userId} hover>
                        <TableCell>{user.userId}</TableCell>
                        <TableCell>{user.userName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.roleId}</TableCell>
                        <TableCell>{user.isActive ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          {user.lastLogin
                            ? new Date(user.lastLogin).toLocaleString()
                            : "-"}
                        </TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.pan}</TableCell>
                        <TableCell>{user.aadhar}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* PAGINATION */}
            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(e, p) => setPage(p)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default ManageUsers;
