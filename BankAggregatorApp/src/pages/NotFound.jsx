import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      sx={{
        mt: 8,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
      }}
    >
      <Typography
        variant="h1"
        color="error"
        sx={{ fontSize: { xs: "6rem", sm: "8rem" }, fontWeight: "bold" }}
      >
        404
      </Typography>

      <Typography
        variant="h5"
        sx={{ mt: 2, mb: 4, color: "text.secondary" }}
      >
        Oops! The page you are looking for does not exist.
      </Typography>

      <Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
