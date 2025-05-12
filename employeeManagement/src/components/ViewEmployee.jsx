import React, { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [salaryDialogOpen, setSalaryDialogOpen] = useState(false);
  const [salaryData, setSalaryData] = useState([]);
  const [salaryLoading, setSalaryLoading] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
    gender: "",
    age: "",
    contactNo: "",
    experience: "",
    street: "",
    pincode: "",
    departmentName: "",
    managerName: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/api/employees/view", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      const flatData = data.map((emp) => ({
        ...emp,
        departmentName: emp.departmentName || "N/A",
        managerName: emp.managerName || "N/A",
      }));
      setEmployees(flatData);
      setSuccess(true);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load Employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/employees/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error(await response.text());

      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      setSuccess(true);
    } catch (err) {
      setError("Failed to delete Employee");
    }
  };

  const handleOpenEditDialog = (employee) => {
    setSelectedEmployee(employee);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    const token = localStorage.getItem("token");
    const updatedEmployee = {
      ...selectedEmployee,
      age: parseInt(selectedEmployee.age),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/employees/update/${selectedEmployee.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedEmployee),
        }
      );

      if (!response.ok) throw new Error(await response.text());

      await fetchEmployees();
      setEditDialogOpen(false);
      setSuccess(true);
    } catch (err) {
      console.error("Update error:", err);
      setError("Failed to update Employee");
    }
  };

  const handleViewSalary = async (employeeId) => {
    const token = localStorage.getItem("token");
    setSalaryLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/salary/employee/${employeeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch salary");

      const data = await response.json();
      setSalaryData(data);
      setSalaryDialogOpen(true);
    } catch (err) {
      console.error(err);
      setError("Unable to load salary details");
    } finally {
      setSalaryLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "emailId", headerName: "Email", width: 200 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "age", headerName: "Age", width: 80 },
    { field: "contactNo", headerName: "Contact No", width: 140 },
    { field: "experience", headerName: "Experience", width: 130 },
    { field: "street", headerName: "Street", width: 130 },
    { field: "pincode", headerName: "Pincode", width: 100 },
    { field: "departmentName", headerName: "Department", width: 150 },
    { field: "managerName", headerName: "Manager", width: 150 },
    {
      field: "salary",
      headerName: "Salary",
      width: 150,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => handleViewSalary(params.row.id)}
        >
          View Salary
        </Button>
      ),
    },
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
        View All Employees
      </Typography>
      <Paper elevation={3} sx={{ height: 520, width: "100%", p: 2 }}>
        <DataGrid
          rows={employees}
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

      {/* Salary Dialog */}
      <Dialog
        open={salaryDialogOpen}
        onClose={() => setSalaryDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Salary Details</DialogTitle>
        <DialogContent dividers>
          {salaryLoading ? (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          ) : salaryData.length > 0 ? (
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
          ) : (
            <Typography>No salary records found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSalaryDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          {[
            "firstName",
            "lastName",
            "emailId",
            "gender",
            "age",
            "contactNo",
            "experience",
            "street",
            "pincode",
          ].map((field) => (
            <TextField
              key={field}
              fullWidth
              margin="normal"
              label={field.replace(/([A-Z])/g, " $1")}
              value={selectedEmployee[field]}
              onChange={(e) =>
                setSelectedEmployee((prev) => ({
                  ...prev,
                  [field]: e.target.value,
                }))
              }
            />
          ))}
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

export default ViewEmployee;
