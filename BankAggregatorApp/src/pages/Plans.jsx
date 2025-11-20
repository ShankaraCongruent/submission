// // export default Plans;
// import React from "react";
// import { Container, Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";

// const Plans = () => {
//   const plans = [
//     { title: "Basic", price: "Free", features: ["View Accounts", "Basic Support"] },
//     { title: "Premium", price: "₹299/month", features: ["Unlimited Accounts", "Priority Support", "Advanced Reports"] },
//     { title: "Enterprise", price: "₹999/month", features: ["Team Access", "Admin Controls", "Dedicated Manager"] }
//   ];

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Our Plans</Typography>

//       <Grid container spacing={3}>
//         {plans.map((plan, i) => (
//           <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: "flex" }}>
//             <Card sx={{ textAlign: "center", p: 2, borderRadius: 3, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 300 }}>
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography variant="h5">{plan.title}</Typography>
//                 <Typography variant="h6" sx={{ mt: 1 }}>{plan.price}</Typography>

//                 <Box sx={{ mt: 2 }}>
//                   {plan.features.map((f, idx) => (
//                     <Typography key={idx} variant="body2">• {f}</Typography>
//                   ))}
//                 </Box>
//               </CardContent>

//               <Box sx={{ mt: 2 }}>
//                 <Button variant="contained" fullWidth>Choose Plan</Button>
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Plans;

import React from "react";
import {
  Container,
  Grid,
  Card,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import StarIcon from "@mui/icons-material/Star";
import DiamondIcon from "@mui/icons-material/Diamond";

const plans = [
  {
    title: "Basic",
    price: "Free",
    icon: <StarIcon sx={{ fontSize: 36, marginBottom: 1 }} />,   // ⬅ reduced size
    features: [
      "View Accounts",
      "Standard Analytics",
      "Basic Support",
      "Secure Cloud Data",
    ],
    gradient: "linear-gradient(135deg, #667db6, #0082c8, #0082c8, #667db6)",
  },
  {
    title: "Premium",
    price: "₹299 / month",
    icon: <WorkspacePremiumIcon sx={{ fontSize: 36, marginBottom: 1 }} />,  // ⬅ reduced size
    popular: true,
    features: [
      "Unlimited Accounts",
      "Priority Support",
      "Advanced Reports",
      "Budget Management Tools",
    ],
    gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
  },
  {
    title: "Enterprise",
    price: "₹999 / month",
    icon: <DiamondIcon sx={{ fontSize: 36, marginBottom: 1 }} />,   // ⬅ reduced size
    features: [
      "Team Access",
      "Admin Controls",
      "Dedicated Manager",
      "Custom Integrations",
    ],
    gradient: "linear-gradient(135deg, #4b6cb7, #182848)",
  },
];

const Plans = () => {
  return (
    <Container sx={{ mt: 6 }}>
      {/* Title */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 700,
          mb: 1,
          background: "linear-gradient(to right, #4b6cb7, #182848)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Choose Your Plan
      </Typography>

      <Typography
        variant="subtitle1"
        align="center"
        sx={{ mb: 4, opacity: 0.7 }}
      >
        Upgrade anytime and unlock powerful financial features
      </Typography>

      {/* Plans Grid */}
      <Grid container spacing={4}>
        {plans.map((plan, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                textAlign: "center",
                minHeight: 340,       // ⬅ Reduced card height
                background: plan.gradient,
                color: "white",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.22)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0px 16px 30px rgba(0,0,0,0.32)",
                },
                position: "relative",
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "rgba(255,255,255,0.25)",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    backdropFilter: "blur(4px)",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  MOST POPULAR
                </Box>
              )}

              {/* Icon */}
              <Box sx={{ mb: 1.5, opacity: 0.9 }}>
                {plan.icon}
              </Box>

              {/* Title */}
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {plan.title}
              </Typography>

              {/* Price */}
              <Typography
                variant="h6"
                sx={{ mt: 1, mb: 2, fontSize: 20, fontWeight: 500 }}
              >
                {plan.price}
              </Typography>

              <Divider
                sx={{
                  mb: 2,
                  borderColor: "rgba(255,255,255,0.4)",
                }}
              />

              {/* Features */}
              <Box sx={{ mb: 1 }}>
                {plan.features.map((f, idx) => (
                  <Typography
                    key={idx}
                    variant="body2"
                    sx={{
                      opacity: 0.85,
                      mt: 0.6,
                    }}
                  >
                    • {f}
                  </Typography>
                ))}
              </Box>

              {/* Button */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "rgba(255,255,255,0.32)",
                  backdropFilter: "blur(3px)",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 2,
                  py: 1,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.45)",
                  },
                }}
              >
                Choose Plan
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Plans;
