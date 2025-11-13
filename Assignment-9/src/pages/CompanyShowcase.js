import React, { useEffect, useState } from "react";
import api from "../api";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/companies");
        // Expecting an array like: [{ id, name, imageUrl }]
        setCompanies(response.data || []);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to load company images. Please ensure your Node.js backend (Assignment 8) exposes a /api/companies endpoint."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Company Showcase
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        The images below are fetched from the Node.js backend. In Assignment 10
        this will be extended to fetch images per logged-in user.
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3}>
        {companies.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <Card>
              {company.imageUrl && (
                <CardMedia
                  component="img"
                  height="180"
                  image={company.imageUrl}
                  alt={company.name}
                />
              )}
              <CardContent>
                <Typography variant="h6">{company.name}</Typography>
                {company.description && (
                  <Typography variant="body2" color="text.secondary">
                    {company.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
        {companies.length === 0 && !error && (
          <Typography variant="body2">
            No companies found. Please seed some companies in your backend.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default CompanyShowcase;