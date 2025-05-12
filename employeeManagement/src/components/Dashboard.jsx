import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container, Grid, Paper } from '@mui/material';
import Footer from './Footer'; // Adjusted path based on your folder structure

const Dashboard = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {/* Additional navigation items can go here (e.g. Logout, Profile) */}
        </Toolbar>
      </AppBar>

      {/* Dashboard Content */}
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
          {/* Image Section */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
              <img
                src="https://via.placeholder.com/1200x400"  // Replace with your image URL
                alt="Dashboard"
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Paper>
          </Grid>

          {/* Text Section */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h5" gutterBottom>
                Welcome to the Dashboard
              </Typography>
              <Typography variant="body1" paragraph>
                This is a simple dashboard layout where you can display information, manage settings,
                and interact with different features. The design is highly customizable. You can 
                add more sections here like user details, statistics, and more. This section contains 
                a text paragraph where you can explain the purpose of the dashboard or give instructions.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Dashboard;
