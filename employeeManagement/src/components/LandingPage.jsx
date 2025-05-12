import React from 'react';
import { Box, Button, Typography, Paper, Container, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import dashboardImage from '../assets/dashboard.png'; // Update path as needed

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // bgcolor: "#f4f6f8",
      }}
    >
      {/* Navigation Bar */}
      {/* <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              Employee Management System
            </Typography>
            <Button color="inherit">About Us</Button>
            <Button color="inherit">Contact Us</Button>
          </Box>

        
          <Box>
            <Link
              to="/admin-register"
              style={{ textDecoration: "none", marginRight: "10px" }}
            >
              <Button
                variant="outlined"
                sx={{ color: "#fff", borderColor: "#fff" }}
              >
                Register Admin
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                sx={{ color: "#fff", borderColor: "#fff" }}
              >
                Login
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar> */}

      {/* Main Content */}
      <Box sx={{ flex: 1, py: 5 }}>
        <Container maxWidth="md">
          <Paper elevation={4} sx={{ p: 3 }}>
            <img
              src={dashboardImage}
              alt="Employee Management System"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Paper>

          <Paper elevation={3} sx={{ mt: 4, p: 4, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Welcome to the Employee Management System
            </Typography>
            <Typography variant="body1">
              This is a simple system to manage employees, departments, and
              roles. Register as an admin or login to manage and view the
              system.
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      {/* <Box
        sx={{ bgcolor: "#1976d2", py: 2, textAlign: "center", color: "#fff" }}
      >
        © 2025 Employee Management System
      </Box> */}
    </Box>
  );
};

export default LandingPage;
