import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user || user.type !== "admin") {
    return <Navigate to="/jobs" replace />;
  }
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default AdminRoute;