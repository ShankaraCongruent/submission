// // src/components/PrivateRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useUser } from "../context/UserContext";

// export default function PrivateRoute({ children, roles }) {
//   const { currentUser } = useUser();

//   if (!currentUser) return <Navigate to="/login" />;
//   if (roles && !roles.includes(currentUser.roleId)) return <Navigate to="/login" />;

//   return children;
// }

// src/components/PrivateRoute.jsx

import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRoute = ({ children, roles }) => {
  const { currentUser } = useUser();

  if (!currentUser) return <Navigate to="/login" />;

  if (roles && !roles.includes(currentUser.roleId)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
