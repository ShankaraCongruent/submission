
// // export default AboutUs;

// import React from "react";
// import { Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

// const AboutUs = () => {
//   const team = [
//     { name: "Priya Sharma", role: "Founder & CEO", img: "https://via.placeholder.com/300" },
//     { name: "Rahul Verma", role: "CTO", img: "https://via.placeholder.com/300" },
//     { name: "Asha Nair", role: "Product Manager", img: "https://via.placeholder.com/300" }
//   ];


//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>About Us</Typography>
//       <Typography variant="body1" sx={{ mb: 3 }}>
//         We are a next-generation banking platform helping users manage all accounts in one place.
//       </Typography>

//       <Typography variant="h5" gutterBottom>Our Team</Typography>

//       <Grid container spacing={3}>
//         {team.map((member, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card sx={{ borderRadius: 3 }}>
//               <CardMedia
//                 component="img"
//                 height="220"
//                 image={member.img}
//                 alt={member.name}
//               />
//               <CardContent>
//                 <Typography variant="h6">{member.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">{member.role}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default AboutUs;

import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";

const AboutUs = () => {
  const team = [
    {
      name: "Priya Sharma",
      role: "Founder & CEO",
      img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
      name: "Rahul Verma",
      role: "CTO",
      img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    {
      name: "Asha Nair",
      role: "Product Manager",
      img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      name: "Karan Patel",
      role: "Lead Backend Engineer",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      name: "Sneha Kapoor",
      role: "UI/UX Designer",
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      name: "Amit Singh",
      role: "Mobile App Developer",
      img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    },
    {
      name: "Neha Gupta",
      role: "Marketing Lead",
      img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    },
    {
      name: "Vikram Rao",
      role: "DevOps Engineer",
      img: "https://images.pexels.com/photos/1800454/pexels-photo-1800454.jpeg",
    },
  ];

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 700,
          mb: 2,
          background: "linear-gradient(135deg, #4b6cb7, #182848)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        About Us
      </Typography>

      <Typography
        align="center"
        sx={{
          mb: 6,
          fontSize: 18,
          opacity: 0.8,
          maxWidth: 700,
          mx: "auto",
        }}
      >
        We are a next-generation banking platform bringing all your financial
        accounts into one secure, smart and beautifully-designed dashboard.
      </Typography>

      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 600,
          mb: 4,
          background: "linear-gradient(to right, #f7971e, #ffd200)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Meet the Team
      </Typography>

      <Grid container spacing={4}>
        {team.map((member, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              sx={{
                borderRadius: 4,
                p: 2,
                textAlign: "center",
                background: "rgba(255,255,255,0.35)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 35px rgba(0,0,0,0.2)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 45px rgba(0,0,0,0.3)",
                },
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  overflow: "hidden",
                  mx: "auto",
                  mt: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={member.img}
                  alt={member.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ mt: 2, fontWeight: 600, letterSpacing: 0.5 }}
                >
                  {member.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
                  {member.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutUs;
