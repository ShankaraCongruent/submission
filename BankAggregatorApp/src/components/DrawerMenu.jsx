import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function DrawerMenu({ open, onClose }) {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const go = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 260,
          backgroundColor: "#19528a",
          color: "#fff",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: "1px solid rgba(255,255,255,0.3)" }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Banking Dashboard
        </Typography>
      </Box>

      <List>
        {/* Main Links */}
        <ListItemButton onClick={() => go("/home")} sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton onClick={() => go("/plans")} sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <PaymentsIcon />
          </ListItemIcon>
          <ListItemText primary="Plans" />
        </ListItemButton>

        <ListItemButton onClick={() => go("/about")} sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItemButton>

        <ListItemButton onClick={() => go("/faq")} sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <HelpOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="FAQ" />
        </ListItemButton>

        <ListItemButton onClick={() => go("/contact")} sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItemButton>

        <Divider sx={{ my: 1, backgroundColor: "rgba(255,255,255,0.3)" }} />

        {/* Role-based Links */}
        {currentUser?.roleId === 4 && (
          <>
            <ListItemButton onClick={() => go("/manage-users")} sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItemButton>

            <ListItemButton onClick={() => go("/manage-banks")} sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Banks" />
            </ListItemButton>
          </>
        )}

        {(currentUser?.roleId === 5 || currentUser?.roleId === 6) && (
          <>
            <ListItemButton onClick={() => go("/accounts")} sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <LocalAtmIcon />
              </ListItemIcon>
              <ListItemText primary="Accounts" />
            </ListItemButton>

            <ListItemButton onClick={() => go("/transactions")} sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Transactions" />
            </ListItemButton>
          </>
        )}
      </List>
    </Drawer>
  );
}
