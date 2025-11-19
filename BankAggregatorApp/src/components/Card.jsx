// src/components/Card.jsx
import React from "react";
import { Card as MuiCard, CardContent, CardActions, Typography, Button } from "@mui/material";

const Card = ({ title, description, onClick }) => {
  return (
    <MuiCard elevation={4} sx={{ cursor: "pointer", "&:hover": { boxShadow: 8 } }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="textSecondary">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onClick}>
          Explore
        </Button>
      </CardActions>
    </MuiCard>
  );
};

export default Card;
