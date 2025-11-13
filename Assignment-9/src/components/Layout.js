import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    marginRight: "1rem",
    fontWeight: 500,
    borderBottom: "2px solid transparent",
  };

  const activeLinkStyle = {
    ...linkStyle,
    borderBottom: "2px solid #fff",
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/jobs", label: "Job Listings" },
    { to: "/companies", label: "Companies" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            React Job Portal
          </Typography>
          {isLoggedIn && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={
                    location.pathname === link.to ? activeLinkStyle : linkStyle
                  }
                >
                  {link.label}
                </Link>
              ))}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 3 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;