// import React from "react";
// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { useUser } from "../context/UserContext";

// export default function Navbar() {
//   const { currentUser, setCurrentUser } = useUser();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setCurrentUser(null);
//     navigate("/login");
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           Banking Aggregator
//         </Typography>

//         {currentUser && (
//           <Box sx={{ display: "flex", gap: 2 }}>
//             <Button color="inherit" component={Link} to="/landing">Home</Button>
//             <Button color="inherit" component={Link} to="/about">About</Button>
//             <Button color="inherit" component={Link} to="/plans">Plans</Button>

//             {(currentUser.roleId === 5 || currentUser.roleId === 6) && (
//               <>
//                 <Button color="inherit" component={Link} to="/accounts">Accounts</Button>
//                 <Button color="inherit" component={Link} to="/transactions">Transactions</Button>
//               </>
//             )}

//             {currentUser.roleId === 4 && (
//               <>
//                 <Button color="inherit" component={Link} to="/manage-users">Manage Users</Button>
//                 <Button color="inherit" component={Link} to="/manage-banks">Manage Banks</Button>
//               </>
//             )}

//             <Button color="inherit" onClick={handleLogout}>Logout</Button>
//           </Box>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }
// // src/components/Navbar.jsx
// import React, { useContext, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Button
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import Brightness4 from "@mui/icons-material/Brightness4";
// import Brightness7 from "@mui/icons-material/Brightness7";

// import { ThemeModeContext } from "./ThemeContext";
// import { UserContext } from "../context/UserContext";
// import DrawerMenu from "./DrawerMenu";

// const Navbar = () => {
//   const { currentUser, logout } = useContext(UserContext);
//   const { mode, toggleTheme } = useContext(ThemeModeContext);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   return (
//     <>
//       <AppBar position="static" color="primary">
//         <Toolbar>
//           {/* Hamburger */}
//           <IconButton
//             color="inherit"
//             edge="start"
//             onClick={() => setDrawerOpen(true)}
//           >
//             <MenuIcon />
//           </IconButton>

//           <Typography
//             variant="h6"
//             sx={{ flexGrow: 1, ml: 2 }}
//           >
//             Banking Aggregator
//           </Typography>

//           {/* Dark/Light Mode Toggle */}
//           <IconButton color="inherit" onClick={toggleTheme}>
//             {mode === "light" ? <Brightness4 /> : <Brightness7 />}
//           </IconButton>

//           {/* Login/Logout Button */}
//           {currentUser ? (
//             <Button color="inherit" onClick={logout}>
//               Logout
//             </Button>
//           ) : (
//             <Button color="inherit" href="/login">
//               Login
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
//     </>
//   );
// };

// export default Navbar;
// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";

import { useTheme } from "./ThemeContext";
import { UserContext } from "../context/UserContext";
import DrawerMenu from "./DrawerMenu";

const Navbar = () => {
  const { currentUser, logout } = useContext(UserContext);
  const { theme, toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            Banking Aggregator
          </Typography>

          <IconButton color="inherit" onClick={toggleTheme}>
            {theme === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>

          {currentUser ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" href="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
