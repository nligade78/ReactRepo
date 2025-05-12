import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  MenuItem
} from '@mui/material';
import axios from 'axios';

const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    gender: '',
    age: '',
    contactNo: '',
    experience: '',
    street: '',
    pincode: '',
  });

  const [managerId, setManagerId] = useState(null);

useEffect(() => {
  const storedManagerId = localStorage.getItem('managerId');
  const token = localStorage.getItem('token');

  console.log("managerId:", storedManagerId);
  console.log("token:", token);

  if (storedManagerId && token) {
    setManagerId(parseInt(storedManagerId));
  } else {
    alert("Manager ID or token not found. Please log in again.");
  }
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!managerId) {
      alert("Manager ID not found. Please log in again.");
      return;
    }

    const requestBody = {
      ...formData,
      managerId: managerId
    };
    

    try {
      await axios.post(
        'http://localhost:8080/api/employees/add',
        requestBody,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Employee registered successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        emailId: '',
        password: '',
        gender: '',
        age: '',
        contactNo: '',
        experience: '',
        street: '',
        pincode: '',
      });
    } catch (error) {
      console.error('Error registering employee:', error.response?.data || error.message);
      alert('Failed to register employee');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          Register New Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
            <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <TextField label="Email ID" name="emailId" type="email" value={formData.emailId} onChange={handleChange} required />
            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
            {/* <TextField label="Gender" name="gender" value={formData.gender} onChange={handleChange} required /> */}
                  <TextField
        select
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
      </TextField>

            <TextField label="Age" name="age" type="number" value={formData.age} onChange={handleChange} required />
            <TextField label="Contact No" name="contactNo" value={formData.contactNo} onChange={handleChange} required />
            <TextField label="Experience" name="experience" value={formData.experience} onChange={handleChange} required />
            <TextField label="Street" name="street" value={formData.street} onChange={handleChange} />
            <TextField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
          </Box>

          <Box textAlign="center" mt={3}>
            <Button variant="contained" type="submit" color="primary">
              Register Employee
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterEmployee;