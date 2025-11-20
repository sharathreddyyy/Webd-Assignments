import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../store/jobsSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";

const AddJob = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.jobs);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    const resultAction = await dispatch(
      addJob({ companyName, jobTitle, description, salary: Number(salary) })
    );
    if (addJob.fulfilled.match(resultAction)) {
      setSuccess("Job added successfully!");
      setCompanyName("");
      setJobTitle("");
      setDescription("");
      setSalary("");
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Job
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Company Name"
          fullWidth
          margin="normal"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <TextField
          label="Job Title"
          fullWidth
          margin="normal"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Salary"
          type="number"
          fullWidth
          margin="normal"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? "Saving..." : "Add Job"}
        </Button>
      </Box>
    </Paper>
  );
};

export default AddJob;