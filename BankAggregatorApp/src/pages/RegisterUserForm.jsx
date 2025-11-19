import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Paper, Typography } from "@mui/material";

// Dummy DB for new users
let usersDB = [];

export default function RegisterUserForm() {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    roleId: 5,
    id: ""
  });

  const handleSubmit = () => {
    if (!formData.email || !formData.userName) {
      alert("Email and Username are required");
      return;
    }
    usersDB.push(formData);
    alert(`User ${formData.userName} registered successfully!`);
    setFormData({ email: "", userName: "", roleId: 5, id: "" });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>
        Register New User
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          label="Username"
          value={formData.userName}
          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
        />
        <TextField
          select
          label="Role"
          value={formData.roleId}
          onChange={(e) => setFormData({ ...formData, roleId: Number(e.target.value) })}
        >
          <MenuItem value={4}>Admin</MenuItem>
          <MenuItem value={5}>Bank User</MenuItem>
          <MenuItem value={6}>Normal User</MenuItem>
        </TextField>
        <TextField
          label="ID"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Register
        </Button>
      </Box>
    </Paper>
  );
}
