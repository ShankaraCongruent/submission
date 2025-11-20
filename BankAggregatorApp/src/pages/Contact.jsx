// import React, { useState } from "react";
// import { Container, TextField, Button, Typography, Box } from "@mui/material";
// import { useTheme } from "../components/ThemeContext";

// const Contact = () => {
//   const { theme } = useTheme();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Message Sent Successfully!");
//   };

//   return (
//     <Box
//       sx={{
//         flex: 1,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "flex-start",
//         bgcolor: theme === "dark" ? "#121212" : "#f5f5f5",
//         pt: 4,
//         pb: 4
//       }}
//     >
//       <Container maxWidth="xs">
//         <Typography
//           variant="h5"
//           gutterBottom
//           sx={{ textAlign: "center", mb: 2 }}
//         >
//           Contact Us
//         </Typography>

//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             bgcolor: "white",
//             p: 3,
//             borderRadius: 2,
//             boxShadow: 3,
//             width: "100%",       
//           }}
//         >
//           <TextField
//             fullWidth
//             label="Name"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             margin="dense"          
//           />

//           <TextField
//             fullWidth
//             label="Email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             margin="dense"
//           />

//           <TextField
//             fullWidth
//             label="Message"
//             name="message"
//             multiline
//             rows={3}                
//             value={form.message}
//             onChange={handleChange}
//             margin="dense"
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{ mt: 2, py: 1 }}
//           >
//             Send
//           </Button>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Contact;
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useTheme } from "../components/ThemeContext";

const Contact = () => {
  const { theme } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: theme === "dark" ? "#0d1117" : "#eef2f7",
        px: 2, // Removed py/pt/pb
      }}
    >
      <Container maxWidth="sm">
        {/* Header */}
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
          Contact Us
        </Typography>

        <Typography
          align="center"
          sx={{
            mb: 4,
            opacity: 0.75,
            fontSize: 16,
          }}
        >
          We'd love to hear from you! Send us your questions or feedback.
        </Typography>

        {/* Form Card */}
        <Paper
            elevation={4}
            sx={{
                p: 4,
                borderRadius: 4,
                backdropFilter: "blur(12px)",
                background:
                theme === "dark"
                    ? "linear-gradient(135deg, #637e8a, #d4dbde, #567e8f)"
                    : "rgba(255, 255, 255, 0.55)",
                boxShadow:
                theme === "dark"
                    ? "0px 10px 25px rgba(0,0,0,0.6)"
                    : "0px 10px 25px rgba(0,0,0,0.15)",
                transition: "0.3s",
                "&:hover": {
                transform: "translateY(-6px)",
                boxShadow:
                    theme === "dark"
                    ? "0px 15px 40px rgba(0,0,0,0.75)"
                    : "0px 15px 40px rgba(0,0,0,0.25)",
                },
            }}
            >
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
              required
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                fontSize: 16,
                background: "linear-gradient(135deg, #4b6cb7, #182848)",
                "&:hover": {
                  background: "linear-gradient(135deg, #425ea3, #152039)",
                },
              }}
            >
              Send Message
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
