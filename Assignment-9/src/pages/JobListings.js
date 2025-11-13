import React from "react";
import { jobPosts } from "../data/jobPosts";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const JobListings = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Job Listings
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Browse open positions and click &quot;Apply&quot; to visit the
        application link.
      </Typography>
      <Grid container spacing={3}>
        {jobPosts.map((job) => (
          <Grid item xs={12} md={6} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {job.title}
                </Typography>
                <Typography variant="body2" paragraph>
                  {job.description}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Required Skills:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 1 }}>
                  {job.requiredSkills.map((skill) => (
                    <Chip key={skill} label={skill} sx={{ mb: 1 }} />
                  ))}
                </Stack>
                <Typography variant="subtitle2" gutterBottom>
                  Salary: <Typography component="span">{job.salary}</Typography>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {job.lastUpdated}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default JobListings;