import React, { useState, useEffect } from "react";
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
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState({ id: "", dept: "", description: "" });

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
      setSuccess(true);
    } catch (err) {
      setError("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/api/departments/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(await response.text());

      setDepartments((prev) => prev.filter((d) => d.id !== id));
      setSuccess(true);
    } catch (err) {
      setError("Failed to delete department");
    }
  };

  const handleOpenEditDialog = (dept) => {
    setSelectedDept(dept);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/api/departments/update/${selectedDept.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dept: selectedDept.dept,
          description: selectedDept.description,
        }),
      });

      if (!response.ok) throw new Error(await response.text());

      // Update local state
      setDepartments((prev) =>
        prev.map((d) => (d.id === selectedDept.id ? selectedDept : d))
      );
      setEditDialogOpen(false);
      setSuccess(true);
    } catch (err) {
      setError("Failed to update department");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "dept", headerName: "Department Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
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
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, width: 900 }}>
        <Typography variant="h6" mb={2}>
          Department List
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={departments}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.id}
          />
        </div>
      </Paper>

      {/* Snackbar */}
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
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Department Name"
            value={selectedDept.dept}
            onChange={(e) =>
              setSelectedDept((prev) => ({ ...prev, dept: e.target.value }))
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={selectedDept.description}
            onChange={(e) =>
              setSelectedDept((prev) => ({ ...prev, description: e.target.value }))
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

export default DepartmentList;
