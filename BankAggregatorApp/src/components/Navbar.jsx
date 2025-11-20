// import React, { useContext, useState } from "react";
// import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
// import Brightness4 from "@mui/icons-material/Brightness4";
// import Brightness7 from "@mui/icons-material/Brightness7";

// import { useTheme } from "./ThemeContext";
// import { UserContext } from "../context/UserContext";
// import DrawerMenu from "./DrawerMenu";

// const Navbar = () => {
//   const { currentUser, logout } = useContext(UserContext);
//   const { theme, toggleTheme } = useTheme();
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   return (
//     <>
//       <AppBar position="static" color="primary">
//         <Toolbar>
//           <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
//             <MenuIcon />
//           </IconButton>

//           <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
//             Banking Aggregator
//           </Typography>

//           <IconButton color="inherit" onClick={toggleTheme}>
//             {theme === "light" ? <Brightness4 /> : <Brightness7 />}
//           </IconButton>

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
// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";

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
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{
          background:
            theme === "light"
              ? "linear-gradient(90deg, #4c7bec, #182848)"
              : "linear-gradient(90deg, #00172d, #003f75)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
          padding: "6px 0",
          zIndex: 1200,
        }}
      >
        <Toolbar sx={{ minHeight: 60 }}>
          {/* Hamburger Menu */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              color: "#fff",
              mr: 2,
              p: 1.2,
              borderRadius: 2,
              "&:hover": {
                background: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Brand */}
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: 0.3,
              color: "#fff",
            }}
          >
            Banking Aggregator
          </Typography>

          {/* Right Side Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Theme Toggle */}
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: "#fff",
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(4px)",
                padding: 1,
                "&:hover": {
                  background: "rgba(255,255,255,0.2)",
                },
              }}
            >
              {theme === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>

            {/* Logout */}
            {currentUser && (
              <Button
                onClick={logout}
                sx={{
                  background: "rgba(255,255,255,0.25)",
                  color: "#fff",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2.5,
                  py: 0.8,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  "&:hover": {
                    background: "rgba(255,255,255,0.4)",
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
