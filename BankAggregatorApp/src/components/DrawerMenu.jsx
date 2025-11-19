// // src/components/DrawerMenu.jsx
// import React, { useContext } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Divider
// } from "@mui/material";
// import { UserContext } from "../context/UserContext";

// const DrawerMenu = ({ open, onClose }) => {
//   const { currentUser } = useContext(UserContext);

//   const userMenu = [
//     { label: "Accounts", link: "/accounts" },
//     { label: "Transactions", link: "/transactions" }
//   ];

//   const adminMenu = [
//     { label: "Manage Users", link: "/manage-users" },
//     { label: "Manage Banks", link: "/manage-banks" }
//   ];

//   const publicMenu = [
//     { label: "Home", link: "/landing" },
//     { label: "About", link: "/about" },
//     { label: "Plans", link: "/plans" },
//     { label: "FAQ", link: "/faq" },
//     { label: "Contact Us", link: "/contact" }
//   ];

//   const menuToShow = [
//     ...publicMenu,
//     ...(currentUser?.roleId === 4 ? adminMenu : []),
//     ...(currentUser?.roleId === 5 || currentUser?.roleId === 6 ? userMenu : [])
//   ];

//   return (
//     <Drawer anchor="left" open={open} onClose={onClose}>
//       <List sx={{ width: 260 }}>
//         {menuToShow.map((item, index) => (
//           <ListItem
//             button
//             key={index}
//             component="a"
//             href={item.link}
//             onClick={onClose}
//           >
//             <ListItemText primary={item.label} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//     </Drawer>
//   );
// };

// export default DrawerMenu;
import React from "react";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function DrawerMenu({ open, onClose }) {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const go = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        <ListItemButton onClick={() => go("/")}>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton onClick={() => go("/plans")}>
          <ListItemText primary="Plans" />
        </ListItemButton>

        <ListItemButton onClick={() => go("/about")}>
          <ListItemText primary="About Us" />
        </ListItemButton>

        <ListItemButton onClick={() => go("/faq")}>
          <ListItemText primary="FAQ" />
        </ListItemButton>

        <ListItemButton onClick={() => go("/contact")}>
          <ListItemText primary="Contact" />
        </ListItemButton>

        {/* Role-based menu */}
        {currentUser?.roleId === 4 && (
          <>
            <ListItemButton onClick={() => go("/manage-users")}>
              <ListItemText primary="Manage Users" />
            </ListItemButton>

            <ListItemButton onClick={() => go("/manage-banks")}>
              <ListItemText primary="Manage Banks" />
            </ListItemButton>
          </>
        )}

        {(currentUser?.roleId === 5 || currentUser?.roleId === 6) && (
          <>
            <ListItemButton onClick={() => go("/accounts")}>
              <ListItemText primary="Accounts" />
            </ListItemButton>

            <ListItemButton onClick={() => go("/transactions")}>
              <ListItemText primary="Transactions" />
            </ListItemButton>
          </>
        )}
      </List>
    </Drawer>
  );
}
