// import React, { useContext } from 'react';
// import { Navigate } from 'react-router';
// import { Context } from '../Context/Context';

// function ProtectedRoute({ children }) {
//   const [{ user }, dispatch] = useContext(Context);

//   if (!user || user === null) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// }

// export default ProtectedRoute;

import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router"; // From react-router
import { DataContext } from "../DataProvider/DataProvider";

function ProtectedRoute({ children }) {
  const [{ user, loading }] = useContext(DataContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
