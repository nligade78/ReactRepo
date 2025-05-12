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

const AddEmployeeSalary = () => {
  const [formData, setFormData] = useState({
    basicPay: '',
    hra: '',
    bonus: '',
    salaryMonth: '',
    salaryYear: '',
    employeeId: ''
  });

  console.log("Submitting form data:", formData);

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8080/api/employees/view', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  // Convert necessary fields to numbers
  const payload = {
    ...formData,
    basicPay: parseFloat(formData.basicPay),
    hra: parseFloat(formData.hra),
    bonus: parseFloat(formData.bonus),
    salaryYear: parseInt(formData.salaryYear, 10),
    employeeId: parseInt(formData.employeeId, 10)
  };

  try {
    const response = await axios.post(
      'http://localhost:8080/api/salary/add',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    alert('Salary added/updated successfully!');
    console.log('Response:', response.data);
    setFormData({
       basicPay: '',
    hra: '',
    bonus: '',
    salaryMonth: '',
    salaryYear: '',
    employeeId: ''
    })
  } catch (error) {
    console.error('Error submitting salary:', error);
    alert(error.response?.data?.message || 'Failed to add salary');
  }
};

  console.log("Submitting form data:", formData);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" gutterBottom>
          Add Employee Salary
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Basic Pay"
            name="basicPay"
            type="number"
            value={formData.basicPay}
            onChange={handleChange}
            required
          />
          <TextField
            label="HRA"
            name="hra"
            type="number"
            value={formData.hra}
            onChange={handleChange}
            required
          />
          <TextField
            label="Bonus"
            name="bonus"
            type="number"
            value={formData.bonus}
            onChange={handleChange}
            required
          />
         <TextField
  select
  label="Salary Month"
  name="salaryMonth"
  value={formData.salaryMonth}
  onChange={handleChange}
  required
>
  {[
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ].map((month) => (
    <MenuItem key={month} value={month}>
      {month}
    </MenuItem>
  ))}
</TextField>

          <TextField
  select
  label="Salary Year"
  name="salaryYear"
  value={formData.salaryYear}
  onChange={handleChange}
  required
>
  {Array.from({ length: 11 }, (_, i) => 2020 + i).map((year) => (
    <MenuItem key={year} value={year}>
      {year}
    </MenuItem>
  ))}
</TextField>

          <TextField
            select
            label="Select Employee"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
          >
            {employees.map((emp) => (
              <MenuItem key={emp.id} value={emp.id}>
                {emp.firstName} {emp.lastName} (ID: {emp.id})
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddEmployeeSalary;
