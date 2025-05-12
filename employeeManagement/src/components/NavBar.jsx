import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Employee Management System
          </Typography>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Contact Us</Button>
        </Box>
        <Box>
          <Link to="/admin-register" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', mr: 1 }}>
              Register Admin
            </Button>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ backgroundColor: 'white', color: 'primary.main' }}>
              Login
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
