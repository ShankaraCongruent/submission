import React from "react";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>How do I open a bank account?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can open an account by logging in and selecting the account type on the home page.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>How do I reset my password?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Go to the login page and click “Forgot Password”.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>How do I contact support?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Visit the Contact Us page to reach our support team.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default FAQ;
