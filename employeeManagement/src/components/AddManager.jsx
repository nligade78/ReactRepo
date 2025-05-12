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

const AddManagerForm = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
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
    departmentId: '' // Changed to a single departmentId field
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/api/departments/view", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      setDepartments(data);
    } catch (err) {
      console.error("Failed to load departments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dept') {
      const selectedDept = departments.find(d => d.dept === value);
      setFormData((prev) => ({
        ...prev,
        departmentId: selectedDept?.id // Save only the department ID
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Debugging: Check form data before submitting
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        'http://localhost:8080/api/managers/add',
        {
          ...formData, // Spread formData
          departmentId: formData.departmentId // Ensure departmentId is sent
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Manager added successfully!');
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
        departmentId: '' // Reset departmentId
      });
    } catch (error) {
      console.error('Error adding manager:', error.response?.data || error.message);
      alert('Failed to add manager');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          Add New Manager
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
            <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <TextField label="Email ID" name="emailId" type="email" value={formData.emailId} onChange={handleChange} required />
            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
            <TextField label="Age" name="age" type="number" value={formData.age} onChange={handleChange} required />
            <TextField label="Contact No" name="contactNo" value={formData.contactNo} onChange={handleChange} required />
            <TextField label="Experience" name="experience" value={formData.experience} onChange={handleChange} required />
            <TextField label="Street" name="street" value={formData.street} onChange={handleChange} />
            <TextField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />

            <TextField
              select
              label="Department"
              name="dept"
              value={departments.find(d => d.id === formData.departmentId)?.dept || ''}
              onChange={handleChange}
              required
              fullWidth
            >
              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.dept}>
                  {dept.dept}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box textAlign="center" mt={3}>
            <Button variant="contained" type="submit" color="primary">
              Add Manager
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddManagerForm;
