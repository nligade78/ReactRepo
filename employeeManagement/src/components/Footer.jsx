import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        padding: 2,
        textAlign: 'center',
        marginTop: '25px',
      }}
    >
      <Typography variant="body1" color="white">
        © 2025 Employee Management System
      </Typography>
    </Box>
  );
};

export default Footer;
