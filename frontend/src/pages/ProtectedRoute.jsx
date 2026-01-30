import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  console.log('ProtectedRoute Loading:', loading);
  console.log('ProtectedRoute User:', user);

  // ⏳ Still checking auth
  if (loading) {
    return null; // or <AuthLoader />
  }

  // ❌ Not logged in → NO API CALLS
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in
  return children;
};

export default ProtectedRoute;

