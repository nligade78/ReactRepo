// src/components/Admin/AdminRegisterForm.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';


const AdminRegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/admin/addAdmin', { email, password });
      alert('Admin registered successfully!');
      console.log(response.data);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto', marginTop: 10 }}>
      <Typography variant="h5" gutterBottom>
        Register Admin
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          required
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Register
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AdminRegisterForm;
