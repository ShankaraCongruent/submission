// import React, { useState } from "react";
// import { Container, TextField, Button, Typography, Box } from "@mui/material";

// const Contact = () => {
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
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Contact Us</Typography>

//       <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500 }}>
//         <TextField
//           fullWidth
//           label="Name"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           margin="normal"
//         />

//         <TextField
//           fullWidth
//           label="Email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           margin="normal"
//         />

//         <TextField
//           fullWidth
//           label="Message"
//           name="message"
//           multiline
//           rows={4}
//           value={form.message}
//           onChange={handleChange}
//           margin="normal"
//         />

//         <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//           Send
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Contact;

import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useTheme } from "../components/ThemeContext";

const Contact = () => {
  const { theme } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
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
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        bgcolor: theme === "dark" ? "#121212" : "#f5f5f5",
        pt: 4,
        pb: 4
      }}
    >
      <Container maxWidth="xs">
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: "center", mb: 2 }}
        >
          Contact Us
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            width: "100%",       
          }}
        >
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="dense"          
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="dense"
          />

          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={3}                
            value={form.message}
            onChange={handleChange}
            margin="dense"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1 }}
          >
            Send
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
