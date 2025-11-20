// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import PrivateRoute from "./components/PrivateRoute";

// import ThemeContextProvider, { useTheme } from "./components/ThemeContext";
// import { UserProvider } from "./context/UserContext";

// import LandingPage from "./pages/LandingPage";
// import Login from "./pages/Login";
// import Accounts from "./pages/Accounts";
// import Transactions from "./pages/Transactions";
// import ManageUsers from "./pages/ManageUsers";
// import ManageBanks from "./pages/ManageBanks";
// import AboutUs from "./pages/AboutUs";
// import Plans from "./pages/Plans";
// import FAQ from "./pages/FAQ";
// import Contact from "./pages/Contact";

// function AppWrapper() {
//   const { darkMode } = useTheme();
//   return (
//     <div
//       className="app-container"
//       style={{
//         background: darkMode ? "#121212" : "#f7f7f7",
//         color: darkMode ? "white" : "black",
//       }}
//     >
//       <Router>
//         <Navbar />

//         <div className="page-content">
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/login" element={<Login />} />

//             {/* Public Pages */}
//             <Route path="/about" element={<AboutUs />} />
//             <Route path="/plans" element={<Plans />} />
//             <Route path="/faq" element={<FAQ />} />
//             <Route path="/contact" element={<Contact />} />

//             {/* User Only */}
//             <Route
//               path="/accounts"
//               element={
//                 <PrivateRoute roles={[5, 6]}>
//                   <Accounts />
//                 </PrivateRoute>
//               }
//             />

//             <Route
//               path="/transactions"
//               element={
//                 <PrivateRoute roles={[5, 6]}>
//                   <Transactions />
//                 </PrivateRoute>
//               }
//             />

//             {/* Admin Only */}
//             <Route
//               path="/manage-users"
//               element={
//                 <PrivateRoute roles={[4]}>
//                   <ManageUsers />
//                 </PrivateRoute>
//               }
//             />

//             <Route
//               path="/manage-banks"
//               element={
//                 <PrivateRoute roles={[4]}>
//                   <ManageBanks />
//                 </PrivateRoute>
//               }
//             />

//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </div>

//         <Footer />
//       </Router>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <ThemeContextProvider>
//       <UserProvider>
//         <AppWrapper />
//       </UserProvider>
//     </ThemeContextProvider>
//   );
// }


// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import { ThemeProvider, useTheme } from "./components/ThemeContext";
import { UserProvider } from "./context/UserContext";
import "./App.css";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import ManageUsers from "./pages/ManageUsers";
import ManageBanks from "./pages/ManageBanks";
import AboutUs from "./pages/AboutUs";
import Plans from "./pages/Plans";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function AppWrapper() {
  const { theme } = useTheme();
  return (
    <div
      className="app-container"
      style={{
        background: theme === "dark" ? "#121212" : "#f7f7f7",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <Router>
        <Navbar />

        <div className="page-content">
          <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            <Route path="/about" element={<AboutUs />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/accounts"
              element={
                <PrivateRoute roles={[5, 6]}>
                  <Accounts />
                </PrivateRoute>
              }
            />

            <Route
              path="/transactions"
              element={
                <PrivateRoute roles={[5, 6]}>
                  <Transactions />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-users"
              element={
                <PrivateRoute roles={[4]}>
                  <ManageUsers />
                </PrivateRoute>
              }
            />

            <Route
              path="/manage-banks"
              element={
                <PrivateRoute roles={[4]}>
                  <ManageBanks />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppWrapper />
      </UserProvider>
    </ThemeProvider>
  );
}


