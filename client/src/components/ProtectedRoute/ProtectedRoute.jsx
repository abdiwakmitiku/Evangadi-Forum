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













// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { DataContext } from "../DataProvider/DataProvider";

// function ProtectedRoute({ children }) {
//   const [{ user, loading }] = useContext(DataContext);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/auth/login" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;


















import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);

  return children;
}

export default ProtectedRoute;

