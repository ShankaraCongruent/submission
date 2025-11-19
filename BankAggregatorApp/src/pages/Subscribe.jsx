import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed Successfully!");
    setEmail("");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Subscribe to Newsletter</Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Stay updated with our latest news, features, and offers.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mt: 3 }}>
        <TextField
          fullWidth
          label="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Subscribe
        </Button>
      </Box>
    </Container>
  );
};

export default Subscribe;
