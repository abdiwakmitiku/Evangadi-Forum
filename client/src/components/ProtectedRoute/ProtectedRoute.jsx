import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { Context } from '../Context/Context';

function ProtectedRoute({ children }) {
  const [{ user }, dispatch] = useContext(Context);

  if (!user || user === null) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;