import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const EmployeeRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user || user.type !== "employee") {
    return <Navigate to="/login" replace />;
  }
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default EmployeeRoute;