import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import EmployeeRoute from "./components/EmployeeRoute";
import Login from "./pages/Login";
import AdminEmployees from "./pages/AdminEmployees";
import AddJob from "./pages/AddJob";
import JobsPage from "./pages/JobsPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/employees"
            element={
              <AdminRoute>
                <AdminEmployees />
              </AdminRoute>
            }
          />
          <Route
            path="/add-job"
            element={
              <AdminRoute>
                <AddJob />
              </AdminRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <EmployeeRoute>
                <JobsPage />
              </EmployeeRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/jobs" replace />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;