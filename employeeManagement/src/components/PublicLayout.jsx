import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import Footer from './Footer';
import React from 'react';

const PublicLayout = () => {
  return (
    <Box>
      <AppBar position="static">
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
           </AppBar>
      <Outlet />
      <Footer />
    </Box>
  );
};

export default PublicLayout;
