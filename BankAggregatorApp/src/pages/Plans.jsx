// // src/pages/Plans.jsx
// import React from "react";
// import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";

// const plansData = [
//   {
//     name: "Basic Savings",
//     interestRate: "3.5%",
//     minBalance: "₹1000",
//     features: ["No monthly fees", "Online banking access"],
//   },
//   {
//     name: "Premium Savings",
//     interestRate: "4.5%",
//     minBalance: "₹10000",
//     features: ["Higher interest rate", "Free debit card", "Priority support"],
//   },
//   {
//     name: "Salary Account",
//     interestRate: "3.0%",
//     minBalance: "₹0",
//     features: ["Direct salary credit", "No minimum balance", "ATM access"],
//   },
// ];

// const Plans = () => {
//   return (
//     <Container sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom>
//         Our Banking Plans
//       </Typography>
//       <Grid container spacing={3}>
//         {plansData.map((plan, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card elevation={4}>
//               <CardContent>
//                 <Typography variant="h6">{plan.name}</Typography>
//                 <Typography>Interest Rate: {plan.interestRate}</Typography>
//                 <Typography>Minimum Balance: {plan.minBalance}</Typography>
//                 <Typography variant="subtitle2" mt={1}>
//                   Features:
//                 </Typography>
//                 <ul>
//                   {plan.features.map((feature, idx) => (
//                     <li key={idx}>{feature}</li>
//                   ))}
//                 </ul>
//                 <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//                   Choose Plan
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Plans;
import React from "react";
import { Container, Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";

const Plans = () => {
  const plans = [
    { title: "Basic", price: "Free", features: ["View Accounts", "Basic Support"] },
    { title: "Premium", price: "₹299/month", features: ["Unlimited Accounts", "Priority Support", "Advanced Reports"] },
    { title: "Enterprise", price: "₹999/month", features: ["Team Access", "Admin Controls", "Dedicated Manager"] }
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Our Plans</Typography>

      <Grid container spacing={3}>
        {plans.map((plan, i) => (
          <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: "flex" }}>
            <Card sx={{ textAlign: "center", p: 2, borderRadius: 3, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 300 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">{plan.title}</Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>{plan.price}</Typography>

                <Box sx={{ mt: 2 }}>
                  {plan.features.map((f, idx) => (
                    <Typography key={idx} variant="body2">• {f}</Typography>
                  ))}
                </Box>
              </CardContent>

              <Box sx={{ mt: 2 }}>
                <Button variant="contained" fullWidth>Choose Plan</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Plans;
