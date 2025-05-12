import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";

const AddDepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const departmentData = {
      dept: departmentName,
      description: description,
    };

    try {
      const response = await fetch("http://localhost:8080/api/departments/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(departmentData),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Error from server:", errorBody);
        throw new Error("Request failed");
      }

      setSuccess(true);
      setDepartmentName("");
      setDescription("");
    } catch (error) {
      console.error("Error while adding department:", error);
      alert("Failed to add department. Check backend server and network.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h6" mb={2}>
          Add Department
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Department Name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>
            Add Department
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
          Department added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddDepartmentForm;
