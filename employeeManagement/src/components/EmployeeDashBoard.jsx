import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import dashboardImage from '../assets/dashboard.png'; // Update path as needed

const EmployeeDashBoard = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f4f6f8",
      }}
    >
  
      {/* Main Content */}
      <Box sx={{ flex: 1, py: 5 }}>
        <Container maxWidth="md">
          <Paper elevation={4} sx={{ p: 3 }}>
            <img
              src={dashboardImage}
              alt="Admin Dashboard"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Paper>

          <Paper elevation={3} sx={{ mt: 4, p: 4, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Welcome, Employee!
            </Typography>
            <Typography variant="body1">
              Use the navigation bar above to manage departments, employees, and managers.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default EmployeeDashBoard;
