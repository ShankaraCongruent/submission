import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 5,
        py: 3,
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.secondary",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Banking Aggregator. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
