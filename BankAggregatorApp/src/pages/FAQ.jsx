import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  return (
    <Container sx={{ mt: 8, mb: 8 }}>
      {/* Page Title */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 700,
          mb: 1,
          background: "linear-gradient(135deg, #4b6cb7, #182848)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Frequently Asked Questions
      </Typography>

      <Typography
        align="center"
        sx={{
          mb: 5,
          opacity: 0.7,
          fontSize: 17,
          maxWidth: 750,
          mx: "auto",
        }}
      >
        Quick answers to the most common questions from our users.
      </Typography>

      {/* FAQ Container */}
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        {[
          {
            q: "How do I open a bank account?",
            a: "Log in and select your preferred account type from the dashboard.",
          },
          {
            q: "How do I reset my password?",
            a: "Just click on “Forgot Password” on the login screen and follow the steps.",
          },
          {
            q: "How do I contact support?",
            a: "Visit the Contact Us page to chat or send us a support ticket.",
          },
          {
            q: "Is my financial data secure?",
            a: "Yes. We use bank-grade encryption and multi-layer security protection.",
          },
          {
            q: "Can I upgrade my plan anytime?",
            a: "Absolutely! You can change plans instantly from your dashboard.",
          },
        ].map((item, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 2,
              borderRadius: 3,
              overflow: "hidden",
              background: "rgba(255,255,255,0.35)",
              backdropFilter: "blur(12px)",
              boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0px 15px 35px rgba(0,0,0,0.25)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                fontWeight: 600,
                fontSize: 17,
              }}
            >
              {item.q}
            </AccordionSummary>
            <AccordionDetails sx={{ opacity: 0.85, fontSize: 15 }}>
              {item.a}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQ;
