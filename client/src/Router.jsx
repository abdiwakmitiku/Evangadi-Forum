import React, { useEffect, useContext, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from "./utils/axiosConfig";
import { DataContext } from "./components/DataProvider/DataProvider";
import { Type } from "./utils/action.type";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function Router() {
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await checkUser();
    })();
  }, []);

  async function checkUser() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      dispatch({ type: Type.SET_USER, user: null });
      navigate("/auth/login");
      return;
    }
    try {
      const res = await axios.get("/user/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: Type.SET_USER,
        user: res?.data?.user || null,
      });
      navigate("/");
    } catch (error) {
      console.error(error?.response?.data || error.message);
      dispatch({ type: Type.SET_USER, user: null });
      navigate("/auth/login");
    }
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Navigate to="/auth/login" />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default Router;

// import React, { useEffect, useContext, useState } from "react";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
// import Home from "./pages/Home/Home";
// import Auth from "./pages/Auth/Auth";
// import { Routes, Route, useNavigate } from "react-router"; // From react-router
// import axios from "./utils/axiosConfig";
// import { DataContext } from "./components/DataProvider/DataProvider";
// import { Type } from "./utils/action.type";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// function Router() {
//   const [{ user }, dispatch] = useContext(DataContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkUser = async () => {
//       const token = localStorage.getItem("token");
//       const username = localStorage.getItem("username");
//       const user_id = localStorage.getItem("user_id");

//       if (!token || !username || !user_id) {
//         dispatch({ type: Type.SET_USER, user: null });
//         navigate("/");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get("/user/check", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         dispatch({
//           type: Type.SET_USER,
//           user: res?.data?.user || null,
//         });
//       } catch (error) {
//         console.error(error?.response?.data || error.message);
//         dispatch({ type: Type.SET_USER, user: null });
//         navigate("/");
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUser();
//   }, [dispatch, navigate]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/auth" element={<Auth />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default Router;
