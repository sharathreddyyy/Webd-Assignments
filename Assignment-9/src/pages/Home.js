import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the React Job Portal
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Explore curated job opportunities, learn more about top companies, and
        connect with roles that match your skills.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/jobs")}>
        View Job Listings
      </Button>
    </Box>
  );
};

export default Home;