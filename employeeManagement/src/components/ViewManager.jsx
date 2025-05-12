import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ViewManager = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    gender: "",
    age: "",
    contactNo: "",
    experience: "",
    street: "",
    pincode: "",
    department: null, // This should hold the department object or null if no department
  });

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/api/managers/view", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();

      // Flatten the department field to dept
      const flatData = data.map((manager) => {
        const dept = manager.department && manager.department.dept ? manager.department.dept : 'N/A';
        return {
          ...manager,
          dept,
        };
      });

      setManagers(flatData);
      setSuccess(true);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load Managers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/api/managers/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(await response.text());

      setManagers((prev) => prev.filter((manager) => manager.id !== id));
      setSuccess(true);
    } catch (err) {
      setError("Failed to delete Manager");
    }
  };

  const handleOpenEditDialog = (manager) => {
    console.log("Selected Manager:", manager);
    setSelectedManager(manager);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
  const token = localStorage.getItem("token");

const updatedManager = {
  firstName: selectedManager.firstName,
  lastName: selectedManager.lastName,
  emailId: selectedManager.emailId,
  password: selectedManager.password,
  gender: selectedManager.gender,
  age: parseInt(selectedManager.age),
  contactNo: selectedManager.contactNo,
  experience: selectedManager.experience,
  street: selectedManager.street,
  pincode: selectedManager.pincode,
  departmentId: selectedManager.department?.id || selectedManager.departmentId || null,
};

 if (selectedManager.password && !selectedManager.password.startsWith('$2a$')) {
    updatedManager.password = selectedManager.password;
  }
  try {
    const response = await fetch(`http://localhost:8080/api/managers/update/${selectedManager.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedManager),
    });

    if (!response.ok) throw new Error(await response.text());

    console.log("Update successful:", updatedManager);
    // Refetch managers to get updated list from server
    await fetchManagers();
    setEditDialogOpen(false);
    setSuccess(true);
  } catch (err) {
    console.error("Update error:", err);
    setError("Failed to update Manager");
  }
};


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'emailId', headerName: 'Email', width: 200 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'age', headerName: 'Age', width: 80 },
    { field: 'contactNo', headerName: 'Contact No', width: 140 },
    { field: 'experience', headerName: 'Experience', width: 130 },
    { field: 'street', headerName: 'Street', width: 130 },
    { field: 'pincode', headerName: 'Pincode', width: 100 },
    { field: 'dept', headerName: 'Department', width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleOpenEditDialog(params.row)}
            sx={{ mr: 1 }}
          >
            Update
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        View All Managers
      </Typography>
      <Paper elevation={3} sx={{ height: 520, width: "100%", p: 2 }}>
        <DataGrid
          rows={managers}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7, 10, 20]}
          getRowId={(row) => row.id}
        />
      </Paper>

      <Snackbar
        open={!!(success || error)}
        autoHideDuration={3000}
        onClose={() => {
          setSuccess(false);
          setError("");
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={error ? "error" : "success"}
          onClose={() => {
            setSuccess(false);
            setError("");
          }}
        >
          {error || "Operation successful!"}
        </Alert>
      </Snackbar>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Manager</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            value={selectedManager.firstName}
            onChange={(e) =>
              setSelectedManager((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            value={selectedManager.lastName}
            onChange={(e) =>
              setSelectedManager((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={selectedManager.emailId}
            onChange={(e) =>
              setSelectedManager((prev) => ({
                ...prev,
                emailId: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type="password"
            value={selectedManager.password}
            onChange={(e) =>
              setSelectedManager((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Gender"
            value={selectedManager.gender}
            onChange={(e) =>
              setSelectedManager((prev) => ({
                ...prev,
                gender: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Age"
            type="number"
            value={selectedManager.age}
            onChange={(e) =>
              setSelectedManager((prev) => ({
                ...prev,
                age: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contact No"
            value={selectedManager.contactNo}
            onChange={(e) =>
              setSelectedManager((prev) => ({
                ...prev,
                contactNo: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Experience"
            value={selectedManager.experience}
            onChange={(e) =>
              setSelectedManager((prev) => ({
                ...prev,
                experience: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Street"
            value={selectedManager.street}
            onChange={(e) =>
              setSelectedManager((prev) => ({
                ...prev,
                street: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Pincode"
            value={selectedManager.pincode}
            onChange={(e) =>
              setSelectedManager((prev) => ({
                ...prev,
                pincode: e.target.value,
              }))
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Department"
            value={selectedManager.dept}
            onChange={(e) =>
              setSelectedManager((prev) => ({
                ...prev,
                dept: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewManager;
