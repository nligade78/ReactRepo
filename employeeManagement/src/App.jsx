import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminRegisterForm from './components/AdminRegisterForm';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout'; // ⬅️ import
import AddDepartmentForm from './components/AddDepartmentForm';
import ViewDepartment from './components/ViewDepartment';
import ManagerDashBoard from './components/ManagerDashBoard';
import AddManager from './components/AddManager';
import ViewManager from './components/ViewManager';
import RegisterEmployee from './components/RegisterEmployee';
import ViewEmployee from './components/ViewEmployee';
import AddEmployeeSalary from './components/AddEmployeeSalary';
import EmployeeDashBoard from './components/EmployeeDashBoard';
import EmployeeViewSalary from './components/EmployeeViewSalary';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public routes with minimal navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin-register" element={<AdminRegisterForm />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Authenticated routes with full layout */}
        <Route element={<Layout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/manager/dashboard" element={<ManagerDashBoard />} />
          <Route path="/employee/dashboard" element={<EmployeeDashBoard />} />
          <Route path="/add-department" element={<AddDepartmentForm />} />
          <Route path="/view-department" element={<ViewDepartment />} />
          <Route path="/add-manager" element={<AddManager />} />
          <Route path="/view-manager" element={<ViewManager />} />
          <Route path="/add-employee" element={<RegisterEmployee />} />
          <Route path="/view-employee" element={<ViewEmployee />} />
          <Route path="/add-employeeSalary" element={<AddEmployeeSalary />} />
          <Route path="/view-employeeSalary" element={<EmployeeViewSalary />} />


          {/* Add more protected routes here */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
