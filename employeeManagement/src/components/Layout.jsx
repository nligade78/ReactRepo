import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Link as MuiLink,
  Menu,
  MenuItem
} from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [role, setRole] = useState(localStorage.getItem("role"));
  const isDashboard = location.pathname.includes("/dashboard");

  // Watch for role changes
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole(null); // clear the state
    navigate("/login");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const renderNavButtons = () => {
    switch (role) {
      case "ADMIN":
        return (
          <>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              color="inherit"
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#fff" }}
            >
              Admin Options
            </Button>
            <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => {handleClose();navigate("/add-department");}} >Add Departments</MenuItem>
        <MenuItem onClick={() => {handleClose();navigate("/view-department");}}>View Departments</MenuItem>
        <MenuItem onClick={() => {handleClose();navigate("/view-employee");}}>View Employee</MenuItem>
        <MenuItem onClick={() => {handleClose();navigate("/view-manager");}}>View Manager</MenuItem>
        <MenuItem onClick={() => {handleClose();navigate("/add-manager");}}>Add Manager</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
          </>
        );

       case "MANAGER":
        return (
          <>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              color="inherit"
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#fff" }}
            >
              Manager Options
            </Button>
            <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => {handleClose();navigate("/add-employee");}}>Register Employee</MenuItem>
        <MenuItem onClick={() => {handleClose();navigate("/view-employee");}}>View Departments Employee</MenuItem>
        <MenuItem onClick={() => {handleClose();navigate("/add-employeeSalary");}}>Add Employee Salary</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
          </>
        );


    case "EMPLOYEE":
        return (
          <>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              color="inherit"
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#fff" }}
            >
              EMPLOYEE Options
            </Button>
            <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => {handleClose();navigate("");}}>View Profile</MenuItem>
        <MenuItem onClick={() => {handleClose();navigate("/view-employeeSalary");}}>View Salary</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
          </>
        );

      default:
        return (
          <Box>
            <MuiLink
              to="/admin-register"
              component={Link}
              style={{ textDecoration: "none", marginRight: "10px" }}
            >
              <Button
                variant="outlined"
                sx={{ color: "#fff", borderColor: "#fff" }}
              >
                Register Admin
              </Button>
            </MuiLink>
            <MuiLink
              to="/login"
              component={Link}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="outlined"
                sx={{ color: "#fff", borderColor: "#fff" }}
              >
                Login
              </Button>
            </MuiLink>
          </Box>
        );
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left Side: Logo + About + Contact */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              Employee Management System
            </Typography>
            <Button color="inherit">About Us</Button>
            <Button color="inherit">Contact Us</Button>
          </Box>

          {/* Right Side: Role-based buttons */}
          {renderNavButtons()}
        </Toolbar>
      </AppBar>

      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;
