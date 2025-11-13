import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const About = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        About This Portal
      </Typography>
      <Typography variant="body1" paragraph>
        This React-based job portal was built as part of Assignment 9 to
        demonstrate:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Login and session management with Axios" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Routing across multiple pages" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Dynamic job listings rendered from frontend data" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Company showcase with images from a Node.js backend" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Material UI components for a modern UI" />
        </ListItem>
      </List>
    </Box>
  );
};

export default About;