
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!role) {
      alert('Please select a role');
      return;
    }

    let loginUrl = '';
    let payload = {};

    if (role === 'ADMIN') {
      loginUrl = 'http://localhost:8080/api/admin/login';
      payload = { email, password };
    } else if (role === 'MANAGER') {
      loginUrl = 'http://localhost:8080/api/managers/login';
      payload = { emailId: email, password };
    } else if (role === 'EMPLOYEE') {
      loginUrl = 'http://localhost:8080/api/employees/login';
     payload = { emailId: email, password };  // Updated to send 'email' instead of 'emailId'
    }

    try {
      const response = await axios.post(loginUrl, payload);
      console.log('Login Response:', response.data);

      if (response.data.token) {
        alert(`${role} login successful!`);
        localStorage.setItem('role', role);
        localStorage.setItem('token', response.data.token);

        // ✅ Store managerId if role is MANAGER
        if (role === 'MANAGER' && response.data.id) {
          localStorage.setItem('managerId', response.data.id);
        }

         if (role === 'EMPLOYEE' && response.data.employeeId) {
          localStorage.setItem('employeeId', response.data.employeeId); // ✅ STORE employeeId
          console.log('Employee ID:', response.data.employeeId); // Log employeeId for debugging
        }
        // Redirect based on role
        if (role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else if (role === 'MANAGER') {
          navigate('/manager/dashboard');
        } else if (role === 'EMPLOYEE') {
          navigate('/employee/dashboard');
        }
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error("Login error:", error);  // Log error in the console for debugging
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          User Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            select
            label="User Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            fullWidth
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="MANAGER">Manager</MenuItem>
            <MenuItem value="EMPLOYEE">Employee</MenuItem>
          </TextField>

          <TextField
            label="Email ID"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button variant="contained" type="submit" color="primary">
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;

