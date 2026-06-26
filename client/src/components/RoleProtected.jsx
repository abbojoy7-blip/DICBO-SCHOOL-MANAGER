import React from "react";
import { Navigate } from "react-router-dom";

export default function RoleProtected({ children, allowedRoles }) {
  const role = localStorage.getItem("role");
  if (!role) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/access-denied" />;
  }
  return children;
}
