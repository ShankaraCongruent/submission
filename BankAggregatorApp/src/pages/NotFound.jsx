import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h2" color="error">404</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Page Not Found
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        component={Link}
        to="/"
      >
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
