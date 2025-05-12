import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import axios from 'axios';

const EmployeeViewSalary = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [employeeId, setEmployeeId] = useState(null);

  // Step 1: Load employeeId from localStorage
  useEffect(() => {
    const storedEmployeeId = localStorage.getItem('employeeId');
    const token = localStorage.getItem('token');

    console.log("Stored employeeId:", storedEmployeeId);
    console.log("Stored token:", token);

    if (storedEmployeeId && token) {
      const parsedId = parseInt(storedEmployeeId);
      setEmployeeId(parsedId);
    } else {
      alert("Employee ID or token not found. Please log in again.");
      setLoading(false); // prevent infinite loader if credentials are missing
    }
  }, []);

  // Step 2: Fetch salary data once employeeId is available
  useEffect(() => {
    if (!employeeId) return; // don't fetch until we have employeeId

    const fetchSalaryDetails = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(
          `http://localhost:8080/api/salary/employee/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSalaryData(response.data);
      } catch (err) {
        console.error("Error fetching salary:", err);
        setError("Failed to load salary details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryDetails();
  }, [employeeId]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Your Salary Details
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : salaryData.length === 0 ? (
        <Typography>No salary records found.</Typography>
      ) : (
        <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Month</strong></TableCell>
                <TableCell><strong>Year</strong></TableCell>
                <TableCell><strong>Basic Pay</strong></TableCell>
                <TableCell><strong>HRA</strong></TableCell>
                <TableCell><strong>Bonus</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaryData.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.salaryMonth}</TableCell>
                  <TableCell>{record.salaryYear}</TableCell>
                  <TableCell>₹{record.basicPay}</TableCell>
                  <TableCell>₹{record.hra}</TableCell>
                  <TableCell>₹{record.bonus}</TableCell>
                  <TableCell>
                    ₹{(record.basicPay + record.hra + record.bonus).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default EmployeeViewSalary;
