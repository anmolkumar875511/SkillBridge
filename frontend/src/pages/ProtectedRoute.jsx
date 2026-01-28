import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);
    console.log('ProtectedRoute Loading:', loading);
    console.log('ProtectedRoute User:', user);
    if (loading) return <p>Checking Authentication....</p>;
    return user ? <Outlet /> : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;
