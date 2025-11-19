// // src/pages/AboutUs.jsx
// import React from "react";
// import { Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

// const teamMembers = [
//   {
//     name: "Varsha",
//     role: "Frontend Developer",
//     image: "/team1.jpg",
//   },
//   {
//     name: "Ravi",
//     role: "Backend Developer",
//     image: "/team2.jpg",
//   },
//   {
//     name: "Sneha",
//     role: "UI/UX Designer",
//     image: "/team3.jpg",
//   },
// ];

// const AboutUs = () => {
//   return (
//     <Container sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom>
//         About Our Bank
//       </Typography>
//       <Typography sx={{ mb: 3 }}>
//         Our banking aggregator app brings all your accounts into one place. We prioritize security,
//         usability, and convenience for all our users.
//       </Typography>

//       <Typography variant="h5" gutterBottom>
//         Meet the Team
//       </Typography>
//       <Grid container spacing={3}>
//         {teamMembers.map((member, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={member.image}
//                 alt={member.name}
//               />
//               <CardContent>
//                 <Typography variant="h6">{member.name}</Typography>
//                 <Typography>{member.role}</Typography>
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
import { Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

const AboutUs = () => {
  const team = [
    { name: "Priya Sharma", role: "Founder & CEO", img: "https://via.placeholder.com/300" },
    { name: "Rahul Verma", role: "CTO", img: "https://via.placeholder.com/300" },
    { name: "Asha Nair", role: "Product Manager", img: "https://via.placeholder.com/300" }
  ];

  
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>About Us</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        We are a next-generation banking platform helping users manage all accounts in one place.
      </Typography>

      <Typography variant="h5" gutterBottom>Our Team</Typography>

      <Grid container spacing={3}>
        {team.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="220"
                image={member.img}
                alt={member.name}
              />
              <CardContent>
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="body2" color="text.secondary">{member.role}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutUs;

