import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import EngineerDashboard from '../pages/EngineerDashboard';
import ManagerDashboard from '../pages/ManagerDashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';


const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? (user.role === 'Manager' ? '/manager' : '/engineer') : '/login'} />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/engineer"
        element={
          <ProtectedRoute role="Engineer">
            <EngineerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager"
        element={
          <ProtectedRoute role="Manager">
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
