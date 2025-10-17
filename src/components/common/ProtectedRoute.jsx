// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // Redirect to their dashboard if they try to access other role
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return children;
}
