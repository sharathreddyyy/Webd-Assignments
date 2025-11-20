import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../store/jobsSlice";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const JobsPage = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Available Jobs
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {list.map((job) => (
          <Grid item xs={12} md={6} key={job._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.jobTitle}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {job.companyName}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {job.description}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
                  Salary: ${job.salary}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {list.length === 0 && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No jobs available yet.
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default JobsPage;